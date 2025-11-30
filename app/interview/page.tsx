"use client";

import React from "react";
import { initVoiceAgent } from "@/utils/voice-agent/voice-agent";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDiagramStore } from "@/utils/zustand/store";
import { redirect } from "next/navigation";
import Stopwatch from "@/components/stopwatch";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ExcalidrawWrapper = dynamic(
  async () => (await import("./ExcalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function InterviewPage() {
  const updateElements = useDiagramStore((state) => state.setElements);
  const session = useDiagramStore((state) => state.session);
  const setClientApiKey = useDiagramStore((state) => state.setClientApiKey);
  const [showEndDialog, setShowEndDialog] = React.useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = React.useState(false);
  const [apiKeyInput, setApiKeyInput] = React.useState("");
  const [isValidating, setIsValidating] = React.useState(false);
  const [sessionStarted, setSessionStarted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const isInitializing = React.useRef(false);

  const handleChange = (elements: readonly OrderedExcalidrawElement[]) => {
    updateElements(elements);
  };

  const startSession = async (clientKey?: string) => {
    // Prevent double initialization (React Strict Mode)
    if (isInitializing.current) return;
    isInitializing.current = true;

    try {
      if (clientKey) {
        setClientApiKey(clientKey);
      }
      await initVoiceAgent("session", false);
      setSessionStarted(true);
      setShowApiKeyModal(false);
    } catch {
      toast.error(
        "Failed to initialize interview session. Please check your API key."
      );
      if (clientKey) {
        setClientApiKey(null);
      }
      isInitializing.current = false;
    }
  };

  // Check if client has API key configured via env
  React.useEffect(() => {
    async function init() {
      const envKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

      if (envKey) {
        // Env key exists, start session directly
        setClientApiKey(envKey);
        await startSession(envKey);
      } else {
        // No env key, show modal
        setShowApiKeyModal(true);
      }
      setIsLoading(false);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApiKeySubmit = async () => {
    if (!apiKeyInput.trim()) {
      toast.error("Please enter an API key");
      return;
    }

    setIsValidating(true);

    try {
      // Test the API key by making a request
      const response = await fetch("/api/realtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: apiKeyInput.trim() }),
      });

      if (!response.ok) {
        toast.error("Invalid API key. Please check and try again.");
        setIsValidating(false);
        return;
      }

      // Key is valid, start session
      await startSession(apiKeyInput.trim());
    } catch {
      toast.error("Failed to validate API key");
    } finally {
      setIsValidating(false);
    }
  };

  const handleEndInterview = () => {
    if (session) {
      session.close();
      redirect("/session-end");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {sessionStarted && (
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <Stopwatch />
          <Button
            onClick={() => setShowEndDialog(true)}
            className="bg-red-900 hover:bg-red-800 text-white"
          >
            End Interview
          </Button>
        </div>
      )}
      <ExcalidrawWrapper theme="dark" zenModeEnabled onChange={handleChange} />

      {/* API Key Modal */}
      <AlertDialog open={showApiKeyModal} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter OpenAI API Key</AlertDialogTitle>
            <AlertDialogDescription>
              No API key is configured on the server. Please enter your OpenAI
              API key to start the interview. Your key is only used for this
              session and is not stored.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isValidating) {
                  handleApiKeySubmit();
                }
              }}
              disabled={isValidating}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Get your API key from{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                platform.openai.com
              </a>
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleApiKeySubmit}
              disabled={isValidating || !apiKeyInput.trim()}
            >
              {isValidating ? "Validating..." : "Start Interview"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* End Interview Dialog */}
      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this interview? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEndInterview}
              className="bg-red-900 hover:bg-red-800"
            >
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
