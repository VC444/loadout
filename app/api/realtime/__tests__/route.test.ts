/**
 * @jest-environment node
 */

import { POST } from "../route";

// Mock the global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

function createRequest(body?: object): Request {
  return new Request("http://localhost:3000/api/realtime", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe("POST /api/realtime", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns 400 when no API key is provided", async () => {
    delete process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const response = await POST(createRequest({}));
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("API key");
  });

  it("uses client-provided apiKey when present", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: "client-secret-123" }),
    });

    const response = await POST(createRequest({ apiKey: "sk-client-key" }));
    expect(response.status).toBe(200);

    // Verify fetch was called with the client key
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/realtime/client_secrets",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer sk-client-key",
        }),
      }),
    );
  });

  it("falls back to NEXT_PUBLIC_OPENAI_API_KEY env var", async () => {
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = "sk-env-key";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: "env-secret-456" }),
    });

    const response = await POST(createRequest({}));
    expect(response.status).toBe(200);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/realtime/client_secrets",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer sk-env-key",
        }),
      }),
    );
  });

  it("returns 500 when OpenAI API returns an error", async () => {
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = "sk-env-key";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    const response = await POST(createRequest({}));
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain("Failed to fetch client secret");
  });

  it("returns 500 on unexpected exception", async () => {
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = "sk-env-key";
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const response = await POST(createRequest({}));
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain("Internal server error");
  });

  it("proxies the OpenAI response data on success", async () => {
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = "sk-env-key";
    const mockData = {
      value: "ephemeral-secret",
      expires_at: 1234567890,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const response = await POST(createRequest({}));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockData);
  });
});
