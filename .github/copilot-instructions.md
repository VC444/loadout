# Loadout - AI System Design Interview Platform

## Project Overview

This is a Next.js 15 (App Router) application that conducts AI-powered FAANG-level system design mock interviews. Users interact with "Flint," a voice-based AI interviewer, while drawing system diagrams in Excalidraw. The interview flows through 4 stages: Functional Requirements → Non-Functional Requirements → API Design → System Architecture.

## Architecture & Data Flow

### Core Components

- **Voice Agent** (`utils/voice-agent/voice-agent.ts`): Initializes OpenAI Realtime API sessions with a 30-minute auto-timeout
- **Zustand Store** (`utils/zustand/store.ts`): Global state for Excalidraw elements and RealtimeSession
- **Interview Flow**: `/interview` page initializes agent, syncs diagram changes to store. If no API key is configured, prompts user to enter one.

### Key Integrations

- **OpenAI Realtime API**: Session setup via `/api/realtime` (fetches ephemeral client secret). Agent uses `get_excalidraw` tool to inspect diagram state before every response
- **Excalidraw**: Dynamically imported (`next/dynamic`, SSR disabled). Elements simplified via `simplifyExcalidrawElements()` before passing to AI

## Development Workflows

### Running Locally

```bash
npm run dev  # Uses Turbopack for faster dev builds
```

### Environment Variables Required

- `NEXT_PUBLIC_OPENAI_API_KEY`: For Realtime API access

### Testing Interview Sessions

1. Navigate to `/interview` to start an interview
2. If no `NEXT_PUBLIC_OPENAI_API_KEY` is set, a modal will prompt for the key
3. Session auto-ends after 30 minutes OR manual "End Interview" button
4. Transcript logged to console (no persistence by default)

## Project-Specific Conventions

### Agent Instructions Pattern

The AI prompt (`utils/voice-agent/prompt.ts`) is a ~150-line structured document defining:

- Personality (fast, 1-2 sentences, 5-20 words per turn)
- Tool usage protocol (must call `get_excalidraw` before every response with a natural preamble)
- Strict interview flow enforcement (no skipping stages)
- Alignment verification (diagram must match speech, APIs must map to features)

### Excalidraw Integration

- Elements passed to AI are **simplified** (removes rendering metadata, keeps structural data like `boundElements`, `text`, `points`)
- Agent uses diagram state to guide conversation: "Could you add that to the diagram?" if misalignment detected
- Store updates on every `onChange` via `useDiagramStore.setState()`

### API Route Patterns

- **OpenAI Secret Fetching** (`/api/realtime`): Proxies OpenAI client secret generation (never exposes API key to client)

## Critical Gotchas

1. **Dynamic Import Required**: Excalidraw crashes with SSR - always use `dynamic(() => import(), { ssr: false })`
2. **30-Minute Hard Timeout**: `setTimeout` in `initVoiceAgent` redirects to `/session-end` regardless of completion
3. **Tool Call Protocol**: AI **must** call `get_excalidraw` before responding per instructions, failure breaks conversational flow

## UI Components

- Built with **shadcn/ui** (Radix primitives + Tailwind CSS)
- Uses **Tailwind CSS v4** with PostCSS (see `postcss.config.mjs`)
- Dark mode support via `next-themes`
- Toast notifications via `sonner`

## State Management

- **Zustand** for diagram elements and session state (no React Context)
- Global store accessed via hooks (`useDiagramStore`) or `getState()` in non-React code (e.g., agent tools)

## When Making Changes

- **Agent Behavior**: Edit `utils/voice-agent/prompt.ts` (instructions are loaded into RealtimeAgent on init)
- **Adding Tools**: Define with `tool()` from `@openai/agents-realtime`, add to `tools` array in `initVoiceAgent`
- **Diagram Simplification**: Modify `simplifyExcalidrawElements()` if AI needs more/less element metadata
- **Session Lifecycle**: Auto-save logic lives in `initVoiceAgent`'s `setTimeout` callback
