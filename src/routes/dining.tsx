import { createFileRoute } from "@tanstack/react-router";
import { DiningPage } from "@/components/site";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: 'Dining & Home-Cooked Food | Ecstasy Farms Dalhousie' },
      { name: "description", content: 'Enjoy fresh, hygienic home-cooked meals, customizable menus and family-style Himalayan hospitality at Ecstasy Farms Dalhousie.' },
      { property: "og:title", content: 'Dining & Home-Cooked Food | Ecstasy Farms Dalhousie' },
      { property: "og:description", content: 'Enjoy fresh, hygienic home-cooked meals, customizable menus and family-style Himalayan hospitality at Ecstasy Farms Dalhousie.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/dining" }],
  }),
  component: DiningPage,
});
