# Loadout 🎙️

> AI-powered system design interview practice platform

Loadout is an open-source platform that simulates FAANG-level system design interviews. Practice with **Flint**, an AI interviewer that guides you through real interview scenarios while you draw architecture diagrams in real-time.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🎤 Voice-based AI Interviewer**: Natural conversation powered by OpenAI's Realtime API
- **🎨 Real-time Diagramming**: Draw system architecture with Excalidraw integration
- **📋 Structured Interview Flow**: 4 stages covering the complete system design process
  1. Functional Requirements
  2. Non-Functional Requirements
  3. API Design
  4. System Architecture
- **⏱️ Timed Sessions**: 30-minute sessions that simulate real interview pressure

> **Note:** Loadout currently only supports one interview question: **"Design Instagram"**. More questions coming soon!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- [OpenAI API key](https://platform.openai.com/api-keys) (with Realtime API access)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/VC444/loadout.git
   cd loadout
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys (see [Environment Variables](#-environment-variables))

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

| Variable                     | Description                         |
| ---------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_OPENAI_API_KEY` | OpenAI API key with Realtime access |

See `.env.example` for a complete template with instructions.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Interview UI   │  │   Excalidraw    │  │   Zustand   │  │
│  │   (Next.js)      │◄─┤   (Diagrams)    │◄─┤   (State)   │  │
│  └────────┬─────────┘  └─────────────────┘  └─────────────┘  │
└───────────┼─────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Voice Agent                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              OpenAI Realtime API                        │ │
│  │   • Voice input/output                                  │ │
│  │   • get_excalidraw tool (inspects diagrams)             │ │
│  │   • Interview flow control                              │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│                       Backend                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Routes (Next.js)                     │   │
│  │   • /api/realtime - OpenAI session setup             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Key Files

| File                               | Purpose                                     |
| ---------------------------------- | ------------------------------------------- |
| `utils/voice-agent/prompt.ts`      | AI interviewer personality and instructions |
| `utils/voice-agent/voice-agent.ts` | OpenAI Realtime API session management      |
| `app/interview/page.tsx`           | Main interview interface                    |
| `utils/zustand/store.ts`           | Global state for diagrams and session       |

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   └── realtime/        # OpenAI session setup
│   ├── interview/           # Interview pages
│   └── ...
├── components/              # React components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utilities
└── utils/
    ├── voice-agent/        # AI interviewer logic
    └── zustand/            # State management
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **AI**: [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime)
- **Diagrams**: [Excalidraw](https://excalidraw.com)
- **State**: [Zustand](https://zustand-demo.pmnd.rs)

## 🧪 Development

```bash
# Start dev server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for the Realtime API
- [Excalidraw](https://excalidraw.com) for the amazing diagramming tool
- [Vercel](https://vercel.com) for Next.js and hosting
- All contributors who help improve this project

---

<p align="center">
  Made with ❤️ for system design interview preparation
</p>
