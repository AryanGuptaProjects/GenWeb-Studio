import { z } from "zod";

/**
 * Starter Zod schema for an individual page layout and section breakdown.
 */
export const PageLayoutSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Page title is required"),
  slug: z.string().default("/"),
  purpose: z.string().optional(),
  sections: z
    .array(
      z.object({
        type: z.string(),
        title: z.string().optional(),
        props: z.record(z.string(), z.any()).default({}),
      })
    )
    .default([]),
});

export type PageLayout = z.infer<typeof PageLayoutSchema>;

/**
 * Starter Zod schema for the high-level website plan generated during discovery.
 */
export const SitePlanSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  tagline: z.string().optional(),
  description: z.string().optional(),
  targetAudience: z.string().optional(),
  brandTone: z.string().optional(),
  colorPalette: z.array(z.string()).optional(),
  pages: z.array(PageLayoutSchema).default([]),
});

export type SitePlan = z.infer<typeof SitePlanSchema>;
