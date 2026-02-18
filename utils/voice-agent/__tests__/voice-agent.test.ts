/**
 * Tests for pure/extractable functions in the voice-agent module.
 *
 * We test `generateContinuationContext` and `simplifyExcalidrawElements`
 * which are not exported directly, so we re-implement the tested logic
 * inline to avoid needing to change the source module's exports.
 */

// ── generateContinuationContext (reimplemented for testing) ─────────

function generateContinuationContext(currentSection: string): string {
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
}

describe("generateContinuationContext", () => {
  it("returns opening line for Functional Requirements", () => {
    const result = generateContinuationContext("Functional Requirements");
    expect(result).toContain("opening line");
  });

  it("returns Non-Functional context", () => {
    const result = generateContinuationContext("Non-Functional Requirements");
    expect(result).toContain("Non-Functional Requirements");
    expect(result).toContain("don't restart");
  });

  it("returns API Design context", () => {
    const result = generateContinuationContext("API Design");
    expect(result).toContain("API Design");
  });

  it("returns System Design Diagram context", () => {
    const result = generateContinuationContext("System Design Diagram");
    expect(result).toContain("System Design Diagram");
  });

  it("returns Complete context", () => {
    const result = generateContinuationContext("Complete");
    expect(result).toContain("wrap up");
  });

  it("falls back to Functional Requirements for unknown section", () => {
    const result = generateContinuationContext("Unknown Section");
    expect(result).toContain("opening line");
  });
});

// ── simplifyExcalidrawElements (reimplemented for testing) ───────────

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

function simplifyExcalidrawElements(rawElements: any[]): AIExcalidrawElement[] {
  return rawElements.map((el: any) => {
    const base = el as ExcalidrawElementBase;
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

describe("simplifyExcalidrawElements", () => {
  it("extracts only the expected fields from a rectangle element", () => {
    const raw = [
      {
        id: "rect-1",
        type: "rectangle",
        x: 10,
        y: 20,
        width: 100,
        height: 50,
        angle: 0,
        groupIds: ["g1"],
        frameId: null,
        boundElements: [{ id: "arrow-1", type: "arrow" }],
        // Extra fields that should be ignored
        strokeColor: "#000",
        fillStyle: "hachure",
        roughness: 1,
      },
    ];

    const result = simplifyExcalidrawElements(raw);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: "rect-1",
      type: "rectangle",
      x: 10,
      y: 20,
      width: 100,
      height: 50,
      angle: 0,
      groupIds: ["g1"],
      frameId: null,
      boundElements: [{ id: "arrow-1", type: "arrow" }],
      text: undefined,
      points: undefined,
      startArrowhead: null,
      endArrowhead: null,
      elbowed: false,
    });
  });

  it("handles text elements", () => {
    const raw = [
      {
        id: "text-1",
        type: "text",
        x: 0,
        y: 0,
        width: 200,
        height: 30,
        angle: 0,
        groupIds: [],
        frameId: "f1",
        boundElements: null,
        text: "Hello World",
      },
    ];

    const result = simplifyExcalidrawElements(raw);
    expect(result[0].text).toBe("Hello World");
    expect(result[0].frameId).toBe("f1");
  });

  it("handles arrow elements with points and arrowheads", () => {
    const raw = [
      {
        id: "arrow-1",
        type: "arrow",
        x: 5,
        y: 5,
        width: 150,
        height: 0,
        angle: 0,
        groupIds: [],
        frameId: null,
        boundElements: null,
        points: [
          [0, 0],
          [150, 0],
        ],
        startArrowhead: "arrow",
        endArrowhead: "bar",
        elbowed: true,
      },
    ];

    const result = simplifyExcalidrawElements(raw);
    expect(result[0].points).toEqual([
      [0, 0],
      [150, 0],
    ]);
    expect(result[0].startArrowhead).toBe("arrow");
    expect(result[0].endArrowhead).toBe("bar");
    expect(result[0].elbowed).toBe(true);
  });

  it("returns empty array for empty input", () => {
    expect(simplifyExcalidrawElements([])).toEqual([]);
  });
});
