export interface StoryChapterConfig {
  id: string;
  start: number; // 0 to 1, start threshold for chapter activation
  end: number; // 0 to 1, end threshold for chapter activation
  title: string;
  description: string;
}

export const storyChapters: StoryChapterConfig[] = [
  {
    id: "01",
    start: 0,
    end: 0.15,
    title: "THE VISION",
    description: "A project begins with a clear architectural direction. From concept and planning to a buildable project.",
  },
  {
    id: "02",
    start: 0.15,
    end: 0.32,
    title: "THE STRUCTURE",
    description: "Engineering gives the architecture its strength. Architectural and structural thinking must work together.",
  },
  {
    id: "03",
    start: 0.32,
    end: 0.50,
    title: "THE ENGINEERING",
    description: "Structure, MEP, HVAC and safety systems come together. Every discipline has to work as one coordinated system.",
  },
  {
    id: "04",
    start: 0.50,
    end: 0.67,
    title: "THE APPROVALS",
    description: "Design must align with the applicable authority pathway. Documentation, coordination and submission support.",
  },
  {
    id: "05",
    start: 0.67,
    end: 0.84,
    title: "THE TRANSFORMATION",
    description: "Technical planning becomes a physical environment. From drawings and coordination to project delivery.",
  },
  {
    id: "06",
    start: 0.84,
    end: 1.0,
    title: "THE RESULT",
    description: "A coordinated project, engineered for delivery.",
  },
];
