import { createFileRoute } from "@tanstack/react-router";
import { AmenitiesPage } from "@/components/site";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: 'Amenities | Ecstasy Farms Dalhousie' },
      { name: "description", content: 'Free Wi-Fi, parking, power backup, home-cooked food, pet-friendly stays, mountain views, bonfire and BBQ on request at Ecstasy Farms.' },
      { property: "og:title", content: 'Amenities | Ecstasy Farms Dalhousie' },
      { property: "og:description", content: 'Free Wi-Fi, parking, power backup, home-cooked food, pet-friendly stays, mountain views, bonfire and BBQ on request at Ecstasy Farms.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/amenities" }],
  }),
  component: AmenitiesPage,
});
