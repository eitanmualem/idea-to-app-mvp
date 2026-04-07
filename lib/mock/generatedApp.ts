import { GeneratedApp } from "../../types/app";

export const mockGeneratedApp: GeneratedApp = {
  name: "FitSnap",
  problem:
    "People have workout ideas and goals, but struggle to turn them into a simple, usable fitness plan they can follow consistently.",
  targetUser:
    "Busy people who want a fast and simple way to create a workout plan from a rough idea.",
  features: [
    "Describe your fitness goal in plain language",
    "Generate a simple weekly workout structure",
    "Preview the plan in a mobile-friendly layout",
  ],
  screens: [
    {
      id: "input",
      title: "Idea Input",
      description: "User enters their workout goal and preferences.",
    },
    {
      id: "plan",
      title: "Generated Plan",
      description: "User sees the structured workout concept.",
    },
    {
      id: "preview",
      title: "Mobile Preview",
      description: "User views the plan as a simple app preview.",
    },
  ],
  userFlow: [
    "User enters an app idea",
    "System generates a structured concept",
    "User reviews the concept on the results page",
  ],
};