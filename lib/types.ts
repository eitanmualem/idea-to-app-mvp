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

export type CritiqueCategory = {
  label: string
  score: number
  summary: string
}

export type Critique = {
  score: number
  summary: string
  categories: CritiqueCategory[]
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
}

export type ImprovedConcept = AppConcept