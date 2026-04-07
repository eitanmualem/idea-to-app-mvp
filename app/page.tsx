"use client";

import { useState } from "react";
import type { GeneratedApp } from "../types/app";

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
        <section className="mt-8 w-full max-w-md border rounded p-4">
          <h2 className="text-xl font-bold mb-2">
            {generatedApp.name}
          </h2>

          <p className="mb-2">
            <strong>Problem:</strong> {generatedApp.problem}
          </p>

          <p className="mb-2">
            <strong>Target User:</strong> {generatedApp.targetUser}
          </p>

          <div className="mb-2">
            <strong>Features:</strong>
            <ul className="list-disc pl-5">
              {generatedApp.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          {/* NEW CODE STARTS HERE */}

          <div className="mb-4">
            <strong>Screens:</strong>
            <ul className="list-disc pl-5">
              {generatedApp.screens.map((screen) => (
                <li key={screen.id}>
                  <span className="font-medium">{screen.title}</span>:{" "}
                  {screen.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <strong>User Flow:</strong>
            <ol className="list-decimal pl-5">
              {generatedApp.userFlow.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <button
            type="button"
            className="bg-black text-white border border-white px-4 py-2 rounded hover:opacity-80"
            onClick={() => {
              setGeneratedApp(null);
              setIdea("");
              setError("");
            }}
          >
            Generate Another Idea
          </button>

        </section>
      )}

    </main>
  );
}
