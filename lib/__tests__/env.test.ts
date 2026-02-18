describe("getBaseUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.VERCEL_URL;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns NEXT_PUBLIC_BASE_URL when set", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://custom.example.com";
    const { getBaseUrl } = await import("../env");
    expect(getBaseUrl()).toBe("https://custom.example.com");
  });

  it("returns https://VERCEL_URL when only VERCEL_URL is set", async () => {
    process.env.VERCEL_URL = "my-app-abc123.vercel.app";
    const { getBaseUrl } = await import("../env");
    expect(getBaseUrl()).toBe("https://my-app-abc123.vercel.app");
  });

  it("returns localhost fallback when no env vars are set", async () => {
    const { getBaseUrl } = await import("../env");
    expect(getBaseUrl()).toBe("http://localhost:3000");
  });

  it("prefers NEXT_PUBLIC_BASE_URL over VERCEL_URL", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://prod.example.com";
    process.env.VERCEL_URL = "preview.vercel.app";
    const { getBaseUrl } = await import("../env");
    expect(getBaseUrl()).toBe("https://prod.example.com");
  });
});
