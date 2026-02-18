import { useDiagramStore } from "../store";

describe("useDiagramStore", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useDiagramStore.setState({
      elements: [],
      session: null,
      currentSection: "Functional Requirements",
      allTranscripts: [],
      clientApiKey: null,
    });
  });

  it("has correct initial state", () => {
    const state = useDiagramStore.getState();
    expect(state.elements).toEqual([]);
    expect(state.session).toBeNull();
    expect(state.currentSection).toBe("Functional Requirements");
    expect(state.allTranscripts).toEqual([]);
    expect(state.clientApiKey).toBeNull();
  });

  it("setElements updates elements", () => {
    const mockElements = [{ id: "1", type: "rectangle" }] as any;
    useDiagramStore.getState().setElements(mockElements);
    expect(useDiagramStore.getState().elements).toEqual(mockElements);
  });

  it("setSession updates session", () => {
    const mockSession = { id: "session-1" } as any;
    useDiagramStore.getState().setSession(mockSession);
    expect(useDiagramStore.getState().session).toEqual(mockSession);
  });

  it("setCurrentSection updates the section", () => {
    useDiagramStore.getState().setCurrentSection("API Design");
    expect(useDiagramStore.getState().currentSection).toBe("API Design");
  });

  it("setAllTranscripts replaces all transcripts", () => {
    const transcripts = [{ role: "user", text: "hello" }];
    useDiagramStore.getState().setAllTranscripts(transcripts);
    expect(useDiagramStore.getState().allTranscripts).toEqual(transcripts);
  });

  it("addTranscripts appends to existing transcripts", () => {
    useDiagramStore
      .getState()
      .setAllTranscripts([{ role: "user", text: "first" }]);
    useDiagramStore
      .getState()
      .addTranscripts([{ role: "assistant", text: "second" }]);
    expect(useDiagramStore.getState().allTranscripts).toEqual([
      { role: "user", text: "first" },
      { role: "assistant", text: "second" },
    ]);
  });

  it("resetTranscripts clears all transcripts", () => {
    useDiagramStore
      .getState()
      .setAllTranscripts([{ role: "user", text: "hello" }]);
    useDiagramStore.getState().resetTranscripts();
    expect(useDiagramStore.getState().allTranscripts).toEqual([]);
  });

  it("setClientApiKey sets and clears the key", () => {
    useDiagramStore.getState().setClientApiKey("sk-test-key");
    expect(useDiagramStore.getState().clientApiKey).toBe("sk-test-key");

    useDiagramStore.getState().setClientApiKey(null);
    expect(useDiagramStore.getState().clientApiKey).toBeNull();
  });
});
