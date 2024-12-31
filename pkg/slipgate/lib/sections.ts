export interface Section {
  name: string; // Display name for navigation/UI
  slug: string; // URL segment for routing
  appUrl: string; // URL to be loaded in iframe
}

export const sections: Section[] = [
  {
    name: "Dummy",
    slug: "dummy",
    appUrl: "/dummy",
  },
];

// Helper function to find a section by slug
export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((section) => section.slug === slug);
}
