import { z } from "zod";

// What the server accepts when an editor saves. Anything else is rejected,
// so the admin panel (or a hand-made request) can never break the page.
const text = (max = 200) => z.string().trim().max(max);
const id = z.string().trim().min(1).max(60);
const image = z
  .string()
  .trim()
  .max(300)
  .refine(
    (v) => v === "" || /^\/api\/media\/[a-f0-9]{24}$/.test(v) || /^https:\/\/\S+$/.test(v),
    "Image must be an uploaded file or an https:// link."
  );
const gridLine = z.string().regex(/^\d{1,2} \/ \d{1,2}$/, "Invalid grid position");
const color = z.string().regex(/^#[0-9a-fA-F]{3,8}$/, "Invalid colour");
const safeHref = z.string().trim().max(200).regex(/^(#|\/|https?:\/\/)/, "Link must start with #, / or http(s)://");

export const contentSchema = z.object({
  hero: z.object({
    headline: z.object({ line1: text(40), line2: text(20), line3: text(40) }),
    strategyTag: z.object({ top: text(40), circled: text(40) }),
    comfortTag: z.object({ top: text(40), underlined: text(40) }),
    pillars: z.array(text(40)).max(5),
    stat: z.object({ value: text(20), caption: text(160) }),
    brands: z.array(z.object({ id, name: text(60), logo: image })).max(12),
  }),
  services: z
    .array(
      z.object({
        id,
        eyebrow: text(80),
        title: text(80),
        intro: text(400),
        items: z.array(text(120)).max(8),
        ctaLabel: text(30),
        ctaHref: safeHref,
        collage: z
          .array(z.object({ id, alt: text(160), src: image, col: gridLine, row: gridLine, tint: color }))
          .max(12),
      })
    )
    .max(8),
  testimonials: z.object({
    heading: text(80),
    items: z
      .array(z.object({ id, quote: text(600), name: text(80), role: text(120), avatar: image }))
      .max(12),
  }),
  faqs: z.object({
    heading: text(80),
    items: z.array(z.object({ id, question: text(200), answer: text(1500) })).max(30),
  }),
  footer: z.object({ heading: text(60), intro: text(300) }),
});
