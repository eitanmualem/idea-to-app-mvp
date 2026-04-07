export type AppIdeaInput = {
  idea: string
}

export type AppConcept = {
  appName: string
  problem: string
  targetUser: string
  features: string[]
  screens: string[]
  userFlow: string[]
}

export type Critique = {
  score: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
}

export type ImprovedConcept = AppConcept