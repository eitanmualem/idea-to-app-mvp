import IdeaForm from "@/components/idea-form"

export default function Home() {
  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Idea → App
        </h1>

        <IdeaForm />
      </div>
    </main>
  )
}