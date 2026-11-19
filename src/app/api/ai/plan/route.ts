import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SitePlanSchema } from "@/lib/schemas/site-plan";

const PlanRequestSchema = z.object({
  prompt: z.string().min(1, "Website description or prompt is required"),
  industry: z.string().optional(),
  targetAudience: z.string().optional(),
  brandTone: z.string().optional(),
});

/**
 * AI Planning API Route Stub.
 * Ready for Vercel AI SDK integration (e.g. generateObject with SitePlanSchema).
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = PlanRequestSchema.parse(json);

    // Placeholder response until AI provider logic is connected
    const placeholderPlan: z.infer<typeof SitePlanSchema> = {
      siteName: "Modern Horizon",
      tagline: "Next-generation digital experience",
      description: validated.prompt,
      targetAudience: validated.targetAudience ?? "General audience",
      brandTone: validated.brandTone ?? "Minimal, bold, futuristic",
      colorPalette: ["#000000", "#1F1F1F", "#FFFFFF", "#6366F1"],
      pages: [
        {
          title: "Home",
          slug: "/",
          purpose: "Primary landing and conversion page",
          sections: [
            {
              type: "HeroBlock",
              title: "Hero Section",
              props: {
                headline: "Modern Horizon",
                subheadline: validated.prompt,
                ctaPrimary: "Explore Platform",
              },
            },
          ],
        },
      ],
    };

    return NextResponse.json({
      status: "success",
      message: "AI planning stub ready. Connect your AI SDK provider key to activate live reasoning.",
      plan: placeholderPlan,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", error: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: "error", error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
