import { createFileRoute } from "@tanstack/react-router";
import { ExperiencesPage } from "@/components/site";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: 'Experiences | Ecstasy Farms Dalhousie' },
      { name: "description", content: 'Slow down with mountain views, nature walks, family time and pet-friendly stays. Bonfire and BBQ evenings are available on request.' },
      { property: "og:title", content: 'Experiences | Ecstasy Farms Dalhousie' },
      { property: "og:description", content: 'Slow down with mountain views, nature walks, family time and pet-friendly stays. Bonfire and BBQ evenings are available on request.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/experiences" }],
  }),
  component: ExperiencesPage,
});
