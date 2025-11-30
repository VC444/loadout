import { Card } from "@/components/ui/card";

export default function SessionEndPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-2xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">
          Interview Session Complete
        </h1>
        <p className="text-gray-600">
          Great work! You&apos;ve completed the interview.
        </p>
      </Card>
    </div>
  );
}
