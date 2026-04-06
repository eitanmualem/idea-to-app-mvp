"use client"

import { useState } from "react"

export default function IdeaForm() {
  const [idea, setIdea] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!idea.trim()) {
      setError("Please enter an idea")
      return
    }

    setError(null)
    setIsLoading(true)

    // simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        placeholder="Describe your app idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="border rounded p-3 min-h-[120px]"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white rounded p-3 disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  )
}