import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: 'Photo Gallery | Ecstasy Farms Dalhousie' },
      { name: "description", content: 'Explore real photos of the rooms, gardens, outdoor spaces, terrace and mountain surroundings at Ecstasy Farms Dalhousie.' },
      { property: "og:title", content: 'Photo Gallery | Ecstasy Farms Dalhousie' },
      { property: "og:description", content: 'Explore real photos of the rooms, gardens, outdoor spaces, terrace and mountain surroundings at Ecstasy Farms Dalhousie.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/gallery" }],
  }),
  component: GalleryPage,
});
