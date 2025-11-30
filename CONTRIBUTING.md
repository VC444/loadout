# Contributing to Loadout

Thank you for your interest in contributing to Loadout! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/loadout.git
   cd loadout
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables** (see [README.md](README.md#environment-variables))
5. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Locally

```bash
npm run dev
```

This starts the development server with Turbopack at `http://localhost:3000`.

### Code Style

- We use ESLint for linting. Run `npm run lint` before submitting.
- Use TypeScript for all new code.
- Follow the existing code patterns and conventions.

### Testing Your Changes

1. Test the interview flow end-to-end
2. Verify Excalidraw integration works correctly
3. Check that voice interactions function properly (requires OpenAI API key)

## Submitting Changes

### Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Run linting**: `npm run lint`
3. **Test your changes** thoroughly
4. **Write a clear PR description** explaining:
   - What changes you made
   - Why you made them
   - How to test them

## Project Structure

```
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints
│   ├── interview/         # Interview session pages
│   └── ...
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility libraries
└── utils/
    ├── voice-agent/      # OpenAI Realtime API integration
    └── zustand/          # State management
```

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- DM me (the creator of Loadout) on [X (@the_vignesh_ch)](https://x.com/the_vignesh_ch)

## Code of Conduct

Please be respectful and inclusive. We want this to be a welcoming community for everyone.

Thank you for contributing! 🎉
