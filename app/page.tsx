"use client";

import { useState } from "react";
import type { GeneratedApp } from "../types/app";
import { PhoneFrame } from "../components/preview/PhoneFrame";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [generatedApp, setGeneratedApp] = useState<GeneratedApp | null>(null);
  const [idea, setIdea] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!idea.trim()) {
      setError("Please enter an app idea.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
      });

      const data = await res.json();
      setGeneratedApp(data);
      console.log("Generated app:", data);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">

      {/* NEW CODE STARTS HERE */}
      {!generatedApp && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center">
            Idea to App MVP
          </h1>

          <textarea
            placeholder="Describe your app idea..."
            className="border p-2 rounded"
            rows={4}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="bg-black text-white border border-white px-4 py-2 rounded hover:opacity-80"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate App"}
          </button>
        </form>
      )}


      {generatedApp && (
        <section className="mt-6 w-full max-w-5xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

            {/* LEFT SIDE: KEEP / RESTORE M3 RESULT CONTENT */}
            <div className="min-w-0 flex-1">
              <div className="rounded border p-4">
                <h2 className="mb-2 text-lg font-semibold">{generatedApp.name}</h2>

                <p className="mb-2 text-sm">{generatedApp.problem}</p>

                <p className="mb-2 text-sm">
                  <strong>Target user:</strong> {generatedApp.targetUser}
                </p>

                {generatedApp.features && generatedApp.features.length > 0 && (
                  <div className="mb-3 text-sm">
                    <strong>Features:</strong>
                    <ul className="list-disc pl-5">
                      {generatedApp.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {generatedApp.screens && generatedApp.screens.length > 0 && (
                  <div className="mb-3 text-sm">
                    <strong>Screens:</strong>
                    <ul className="list-disc pl-5">
                      {generatedApp.screens.map((screen) => (
                        <li key={screen.id}>{screen.title}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {generatedApp.userFlow && generatedApp.userFlow.length > 0 && (
                  <div className="mb-3 text-sm">
                    <strong>User flow:</strong>
                    <ol className="list-decimal pl-5">
                      {generatedApp.userFlow.map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setGeneratedApp(null);
                      setIdea("");
                      setError("");
                    }}
                    className="rounded border border-white bg-black px-4 py-2 text-sm text-white hover:opacity-80"
                  >
                    Generate another
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: PHONE PREVIEW */}
            <div className="w-full shrink-0 md:w-[340px]">
              <PhoneFrame>
                <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                  Preview coming soon
                </div>
              </PhoneFrame>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
