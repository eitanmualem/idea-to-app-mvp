export type GeneratedApp = {
  name: string;
  problem: string;
  targetUser: string;
  features: string[];
  screens: {
    id: string;
    title: string;
    description: string;
  }[];
  userFlow: string[];
};