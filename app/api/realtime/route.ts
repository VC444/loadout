import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const apiKey = body.apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: "gpt-realtime",
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch client secret" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
