import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: 'Contact & Booking Enquiry | Ecstasy Farms Dalhousie' },
      { name: "description", content: 'Enquire about availability at Ecstasy Farms Dalhousie by WhatsApp or call +91 82199 67293. Find directions and send a booking enquiry.' },
      { property: "og:title", content: 'Contact & Booking Enquiry | Ecstasy Farms Dalhousie' },
      { property: "og:description", content: 'Enquire about availability at Ecstasy Farms Dalhousie by WhatsApp or call +91 82199 67293. Find directions and send a booking enquiry.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://id-preview--931288b8-7d62-4486-8189-0e70c1ec6f73.lovable.app/contact" }],
  }),
  component: ContactPage,
});
