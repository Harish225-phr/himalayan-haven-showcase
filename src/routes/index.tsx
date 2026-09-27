import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: 'Ecstasy Farms Dalhousie | Peaceful Himalayan Homestay Near Banikhet' },
      { name: "description", content: 'Escape to Ecstasy Farms Dalhousie, a peaceful pet-friendly Himalayan homestay in Village Manola with mountain views, home-cooked meals and rooms from ₹1,206/night.' },
      { property: "og:title", content: 'Ecstasy Farms Dalhousie | Peaceful Himalayan Homestay Near Banikhet' },
      { property: "og:description", content: 'Escape to Ecstasy Farms Dalhousie, a peaceful pet-friendly Himalayan homestay in Village Manola with mountain views, home-cooked meals and rooms from ₹1,206/night.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/" }],
  }),
  component: HomePage,
});
