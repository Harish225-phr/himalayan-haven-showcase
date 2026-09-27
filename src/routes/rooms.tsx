import { createFileRoute } from "@tanstack/react-router";
import { RoomsPage } from "@/components/site";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: 'Rooms & Stays | Ecstasy Farms Dalhousie' },
      { name: "description", content: 'Explore Standard, Deluxe AC with Terrace and Superior Deluxe with Balcony rooms at Ecstasy Farms Dalhousie. Enquire about rates and availability.' },
      { property: "og:title", content: 'Rooms & Stays | Ecstasy Farms Dalhousie' },
      { property: "og:description", content: 'Explore Standard, Deluxe AC with Terrace and Superior Deluxe with Balcony rooms at Ecstasy Farms Dalhousie. Enquire about rates and availability.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/rooms" }],
  }),
  component: RoomsPage,
});
