/**
 * Get the base URL for the application
 * Works in all environments: local dev, Vercel preview, and production
 */
export function getBaseUrl(): string {
  // Check for explicit base URL override
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Vercel deployment (preview or production)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development fallback
  return "http://localhost:3000";
}
