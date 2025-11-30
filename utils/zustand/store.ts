import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { RealtimeSession } from "@openai/agents-realtime";
import { create } from "zustand";

type InterviewSection =
  | "Functional Requirements"
  | "Non-Functional Requirements"
  | "API Design"
  | "System Design Diagram"
  | "Complete";

interface DiagramState {
  elements: readonly OrderedExcalidrawElement[];
  session: RealtimeSession | null;
  currentSection: InterviewSection;
  allTranscripts: unknown[];
  clientApiKey: string | null;
  setElements: (elements: readonly OrderedExcalidrawElement[]) => void;
  setSession: (session: RealtimeSession | null) => void;
  setCurrentSection: (section: InterviewSection) => void;
  setAllTranscripts: (transcripts: unknown[]) => void;
  addTranscripts: (transcripts: unknown[]) => void;
  resetTranscripts: () => void;
  setClientApiKey: (key: string | null) => void;
}

export const useDiagramStore = create<DiagramState>((set) => ({
  elements: [],
  session: null,
  currentSection: "Functional Requirements",
  allTranscripts: [],
  clientApiKey: null,
  setElements: (elements) => set({ elements }),
  setSession: (session) => set({ session }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setAllTranscripts: (transcripts) => set({ allTranscripts: transcripts }),
  addTranscripts: (transcripts) =>
    set((state) => ({
      allTranscripts: [...state.allTranscripts, ...transcripts],
    })),
  resetTranscripts: () => set({ allTranscripts: [] }),
  setClientApiKey: (key) => set({ clientApiKey: key }),
}));
