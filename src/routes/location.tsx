import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/site";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: 'Location & Directions | Ecstasy Farms Dalhousie' },
      { name: "description", content: 'Find Ecstasy Farms in Village Manola on Dalhousie–Chamba Road, about 7 km from Banikhet and 15 km from Dalhousie town.' },
      { property: "og:title", content: 'Location & Directions | Ecstasy Farms Dalhousie' },
      { property: "og:description", content: 'Find Ecstasy Farms in Village Manola on Dalhousie–Chamba Road, about 7 km from Banikhet and 15 km from Dalhousie town.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/location" }],
  }),
  component: LocationPage,
});
