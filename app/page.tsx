/* eslint-disable react/no-unescaped-entities */
import { Mic, PenTool, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-space-grotesk">
              Loadout
            </span>
          </div>
          <a
            href="https://github.com/VC444/loadout"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            Practice System Design Interviews with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Go through a system design mock interview with an AI that's
            calibrated to mimic a FAANG engineer.
          </p>
          <Link href="/interview">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Practice Interview
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Excalidraw AI Analysis Demo Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/PlSF6RDb6go?si=UT-AFJx2_c1ED8ha"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
              "Why Would I Use This?"
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Because practicing system design alone sucks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* First feature */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 mb-4">
                <Mic className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-space-grotesk mb-3">
                Talk Out Loud
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                The AI listens and responds like a real interviewer. It'll ask
                "what happens when this fails?" just like a human would.
              </p>
            </div>

            {/* Second feature */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 mb-4">
                <PenTool className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-space-grotesk mb-3">
                Draw While You Talk
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                Built-in whiteboard that the AI sees in realtime. It will
                analyze your drawings, along with your speech, to understand
                your system design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6">
            Ready to Start Crushing Interviews?
          </h2>
          <Link href="/interview">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Interview
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-space-grotesk">
                Loadout
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Open source · MIT License ·{" "}
              <a
                href="https://github.com/VC444/loadout"
                className="hover:text-foreground"
              >
                Contribute on GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
