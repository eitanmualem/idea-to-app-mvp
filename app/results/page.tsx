"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { GeneratedApp } from "../../types/app";
import type { Critique } from "../../lib/types";
import CritiquePanel from "../../components/preview/CritiquePanel";
import { PhoneFrame } from "../../components/preview/PhoneFrame";
import { ScreenPreview } from "../../components/preview/ScreenPreview";

export default function ResultsPage() {
  const router = useRouter();

  const [generatedApp, setGeneratedApp] = useState<GeneratedApp | null>(null);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [critique, setCritique] = useState<Critique | null>(null);
  const [critiqueLoading, setCritiqueLoading] = useState(true);
  const [critiqueError, setCritiqueError] = useState("");

  useEffect(() => {
    async function loadResults() {
      const stored = sessionStorage.getItem("generatedApp");

      if (!stored) {
        router.replace("/");
        return;
      }

      try {
        const parsed = JSON.parse(stored) as GeneratedApp;
        setGeneratedApp(parsed);

        setCritiqueLoading(true);
        setCritiqueError("");

        const critiqueRes = await fetch("/api/critique", {
          method: "POST",
        });

        if (!critiqueRes.ok) {
          throw new Error("Failed to fetch critique");
        }

        const critiqueData: Critique = await critiqueRes.json();
        setCritique(critiqueData);
      } catch (error) {
        console.error("Failed to load results:", error);
        setCritiqueError("Failed to load critique.");
      } finally {
        setCritiqueLoading(false);
      }
    }

    loadResults();
  }, [router]);

  if (!generatedApp) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-sm text-neutral-500">Loading results...</p>
      </main>
    );
  }

  return (
    <main className="h-screen overflow-hidden p-4">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <h1 className="text-xl font-bold md:text-2xl">Generated App Concept</h1>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded border border-white bg-black px-4 py-2 text-sm text-white hover:opacity-80"
          >
            Generate another
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_280px_minmax(0,1fr)]">
          {/* LEFT COLUMN: APP TEXT */}
          <div className="min-h-0 min-w-0 overflow-y-auto rounded border p-3 md:p-4">
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
              <div className="mb-2 text-sm">
                <strong>User flow:</strong>
                <ol className="list-decimal pl-5">
                  {generatedApp.userFlow.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* MIDDLE COLUMN: IPHONE PREVIEW */}
          <div className="flex min-h-0 flex-col items-center">
            <div className="shrink-0">
              <PhoneFrame>
                {generatedApp.screens.length > 0 ? (
                  <ScreenPreview
                    title={generatedApp.screens[activeScreenIndex].title}
                    description={generatedApp.screens[activeScreenIndex].description}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                    No preview available
                  </div>
                )}
              </PhoneFrame>
            </div>

            {generatedApp.screens.length > 0 && (
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {generatedApp.screens.map((screen, index) => (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setActiveScreenIndex(index)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${activeScreenIndex === index
                      ? "border-black bg-white text-black"
                      : "border-white bg-black text-white"
                      }`}
                  >
                    {screen.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CRITIQUE */}
          <div className="min-h-0 min-w-0">
            {critiqueLoading && (
              <div className="h-full rounded-xl border border-white p-4">
                <p className="text-sm text-neutral-400">Loading critique...</p>
              </div>
            )}

            {!critiqueLoading && critiqueError && (
              <div className="h-full rounded-xl border border-red-500 p-4">
                <p className="text-sm text-red-400">{critiqueError}</p>
              </div>
            )}

            {!critiqueLoading && !critiqueError && critique && (
              <CritiquePanel critique={critique} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}