"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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

      sessionStorage.setItem("generatedApp", JSON.stringify(data));
      sessionStorage.setItem("lastIdea", idea);

      router.push("/results");
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <h1 className="text-center text-2xl font-bold">Idea to App MVP</h1>

        <textarea
          placeholder="Describe your app idea..."
          className="rounded border p-2"
          rows={4}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="rounded border border-white bg-black px-4 py-2 text-white hover:opacity-80"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate App"}
        </button>
      </form>
    </main>
  );
}