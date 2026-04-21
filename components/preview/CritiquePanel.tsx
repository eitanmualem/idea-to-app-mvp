"use client";

import type { Critique } from "@/lib/types";

type Props = {
    critique: Critique;
};

export default function CritiquePanel({ critique }: Props) {
    return (
        <section className="h-full min-h-0 w-full overflow-y-auto rounded-xl border border-white bg-black p-4 text-white">
            <h2 className="text-xl font-bold mb-2">Idea Critique</h2>

            <div className="text-4xl font-bold mb-1">{critique.score}/10</div>
            <p className="text-sm text-gray-300 mb-4">{critique.summary}</p>

            <div className="space-y-2 mb-4">
                {critique.categories.map((item) => (
                    <div key={item.label} className="border border-gray-700 rounded p-2">
                        <div className="flex justify-between font-semibold">
                            <span>{item.label}</span>
                            <span>{item.score}/10</span>
                        </div>
                        <p className="text-sm text-gray-400">{item.summary}</p>
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <h3 className="font-semibold mb-1">Strengths</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                    {critique.strengths.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-3">
                <h3 className="font-semibold mb-1">Weaknesses</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                    {critique.weaknesses.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Suggestions</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                    {critique.suggestions.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}