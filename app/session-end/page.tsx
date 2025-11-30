"use client";

import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import CheckoutButton from "@/components/checkout-button";
import { Suspense } from "react";

function SessionEndContent() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("isPreview") === "true";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-2xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">
          {isPreview
            ? "Your Free Trial Has Ended"
            : "Interview Session Complete"}
        </h1>

        {!isPreview && (
          <p className="text-gray-600">
            Great work! You&apos;ve completed a full 30-minute interview. Your
            detailed performance analysis and feedback report will be emailed to
            you shortly.
          </p>
        )}

        {isPreview && (
          <>
            <p className="text-gray-600">
              Great work! You&apos;ve completed your 10-minute free trial.
            </p>
            <p className="mt-2 text-gray-600">
              To unlock a <strong>full 30-minute interview</strong> and receive
              a<strong> detailed feedback report</strong>, purchase a full
              session below.
            </p>

            <CheckoutButton />
          </>
        )}
      </Card>
    </div>
  );
}

export default function SessionEndPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="max-w-2xl p-6">
            <h1 className="mb-4 text-2xl font-semibold">
              Interview Session Ended
            </h1>
          </Card>
        </div>
      }
    >
      <SessionEndContent />
    </Suspense>
  );
}
