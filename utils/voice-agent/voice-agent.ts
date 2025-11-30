import { RealtimeAgent, RealtimeSession, tool } from "@openai/agents-realtime";
import z from "zod";
import { useDiagramStore } from "../zustand/store";
import { VOICE_AGENT_INSTRUCTIONS } from "./prompt";
import { redirect } from "next/navigation";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";

// const SECTIONS = [
//   "Functional Requirements",
//   "Non-Functional Requirements",
//   "API Design",
//   "System Design Diagram",
// ] as const;

// type Section = (typeof SECTIONS)[number];

// const getRelevantHistory = (history: RealtimeItem[], section: Section) => {
//   const sectionIndex = SECTIONS.indexOf(section);
//   const relevantHistory = history.slice(sectionIndex);

//   return relevantHistory;
// };

// Generate context prompt based on current interview progress
const generateContinuationContext = (currentSection: string): string => {
  const sectionMap: Record<string, string> = {
    "Functional Requirements":
      "The interview just started. Begin with your opening line.",
    "Non-Functional Requirements":
      "You are currently in the Non-Functional Requirements section. The candidate has already completed the Functional Requirements. Continue from where you left off - don't restart the interview.",
    "API Design":
      "You are currently in the API Design section. The candidate has completed Functional and Non-Functional Requirements. Continue from where you left off - don't restart the interview.",
    "System Design Diagram":
      "You are currently in the System Design Diagram section. The candidate has completed Functional Requirements, Non-Functional Requirements, and API Design. Continue from where you left off - don't restart the interview.",
    Complete:
      "The interview is complete. You should wrap up if not already done.",
  };

  return sectionMap[currentSection] || sectionMap["Functional Requirements"];
};

// Helper function to create a new session with optional context
const createFreshSession = async (contextOverride?: string) => {
  // Check if there's a client-provided API key
  const clientApiKey = useDiagramStore.getState().clientApiKey;

  const response = await fetch("/api/realtime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientApiKey ? { apiKey: clientApiKey } : {}),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch client secret");
  }

  const { value: apiKey } = await response.json();

  // Get current section for context
  const currentSection = useDiagramStore.getState().currentSection;
  const sectionContext =
    contextOverride || generateContinuationContext(currentSection);

  const instructions =
    currentSection === "Functional Requirements"
      ? VOICE_AGENT_INSTRUCTIONS
      : `${VOICE_AGENT_INSTRUCTIONS}\n\n# Current Context\n${sectionContext}`;

  const agent = new RealtimeAgent({
    name: "Assistant",
    instructions,
    voice: "cedar",
    tools: [getExcalidraw, updateSection],
  });

  const session = new RealtimeSession(agent, {
    model: "gpt-realtime",
  });

  await session.connect({ apiKey });
  return session;
};

export const initVoiceAgent = async (
  interviewId: string,
  isPreview: boolean = false
) => {
  // Reset transcripts for new interview
  useDiagramStore.getState().resetTranscripts();

  let rotationCount = 0;
  const MAX_ROTATIONS = isPreview ? 1 : 3;
  const ROTATION_INTERVAL = 8 * 60 * 1000;
  const TOTAL_DURATION = isPreview ? 10 * 60 * 1000 : 30 * 60 * 1000;

  const rotateSession = async (oldSession: RealtimeSession) => {
    // console.log(`Rotating session (rotation ${rotationCount + 1})`);

    // Save old session history`
    useDiagramStore.getState().addTranscripts(oldSession.history);

    // Close old session gracefully
    oldSession.close();

    // Create new session
    const newSession = await createFreshSession();
    useDiagramStore.getState().setSession(newSession);

    rotationCount++;

    // Schedule next rotation if not at max
    if (rotationCount < MAX_ROTATIONS) {
      setTimeout(() => rotateSession(newSession), ROTATION_INTERVAL);
    }

    return newSession;
  };

  // Create initial session
  const initialSession = await createFreshSession();
  useDiagramStore.getState().setSession(initialSession);

  // Schedule first rotation after 10 minutes
  setTimeout(() => rotateSession(initialSession), ROTATION_INTERVAL);

  // Final cleanup after total duration (10 minutes for preview, 30 minutes for full)
  setTimeout(async () => {
    const currentSession = useDiagramStore.getState().session;

    if (currentSession) {
      // Add final session history
      useDiagramStore.getState().addTranscripts(currentSession.history);
      currentSession.close();
    }

    // Save all accumulated transcripts
    try {
      const allTranscripts = useDiagramStore.getState().allTranscripts;
      const response = await fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interviewId,
          transcript: allTranscripts,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save transcript");
      }
    } catch (error) {
      console.error("Error saving transcript:", error);
    }

    useDiagramStore.getState().setSession(null);
    redirect(`/session-end?isPreview=${isPreview}`);
  }, TOTAL_DURATION);

  return initialSession;
};

const getExcalidraw = tool({
  name: "get_excalidraw",
  description: "Return the current Excalidraw elements array",
  parameters: z.object({}),
  async execute() {
    const elements = useDiagramStore.getState().elements;
    const filteredElements = simplifyExcalidrawElements(elements);
    return filteredElements;
  },
});

const updateSection = tool({
  name: "update_section",
  description:
    "Call this when transitioning to a new section of the interview. This helps track progress.",
  parameters: z.object({
    section: z.enum([
      "Functional Requirements",
      "Non-Functional Requirements",
      "API Design",
      "System Design Diagram",
      "Complete",
    ]),
  }),
  async execute({ section }) {
    // console.log(`Transitioning to section: ${section}`);
    useDiagramStore.getState().setCurrentSection(section);
    return { success: true, currentSection: section };
  },
});

type ExcalidrawElementBase = {
  text?: string;
  points?: number[][];
  startArrowhead?: string | null;
  endArrowhead?: string | null;
  elbowed?: boolean;
};

type AIExcalidrawElement = {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  groupIds: string[];
  frameId: string | null;
  boundElements: { id: string; type: string }[] | null;
} & ExcalidrawElementBase;

function simplifyExcalidrawElements(
  rawElements: readonly OrderedExcalidrawElement[]
): AIExcalidrawElement[] {
  return rawElements.map((el) => {
    const base = el as unknown as ExcalidrawElementBase;
    return {
      id: el.id,
      type: el.type,
      x: el.x,
      y: el.y,
      width: el.width,
      height: el.height,
      angle: el.angle,
      groupIds: [...(el.groupIds || [])],
      frameId: el.frameId || null,
      boundElements: el.boundElements ? [...el.boundElements] : null,
      text: base.text,
      points: base.points ? [...base.points] : undefined,
      startArrowhead: base.startArrowhead || null,
      endArrowhead: base.endArrowhead || null,
      elbowed: base.elbowed || false,
    };
  });
}
