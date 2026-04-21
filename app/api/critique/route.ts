import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({
        score: 8,
        summary: "Strong concept with clear target user and good MVP scope.",
        categories: [
            { label: "Clarity", score: 8, summary: "Easy to understand." },
            { label: "Target User", score: 9, summary: "Well defined audience." },
            { label: "Features", score: 7, summary: "Useful but could be tighter." },
            { label: "Prototype Potential", score: 8, summary: "Good for demoing." }
        ],
        strengths: [
            "Clear pain point",
            "Easy to explain",
            "Good MVP candidate"
        ],
        weaknesses: [
            "May face competition",
            "Needs stronger retention loop"
        ],
        suggestions: [
            "Add habit-forming mechanic",
            "Clarify monetization",
            "Reduce first version scope"
        ]
    });
}