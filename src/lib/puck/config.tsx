import React from "react";
import type { Config } from "@measured/puck";

export type RootProps = Record<string, unknown>;

export type ComponentProps = {
  HeroBlock: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary?: string;
  };
};

/**
 * Minimal Puck editor configuration defining sample HeroBlock component.
 */
export const config: Config<ComponentProps, RootProps> = {
  components: {
    HeroBlock: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        ctaPrimary: { type: "text" },
        ctaSecondary: { type: "text" },
      },
      defaultProps: {
        headline: "Experience the Future of Visual Creation",
        subheadline:
          "Generate, inspect, and fine-tune your website layouts with visual drag-and-drop clarity.",
        ctaPrimary: "Start Building",
        ctaSecondary: "Explore Showcase",
      },
      render: ({ headline, subheadline, ctaPrimary, ctaSecondary }) => {
        return (
          <section className="py-24 px-6 text-center bg-black text-white border-b border-[#1F1F1F]">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                {headline}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                {subheadline}
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                {ctaPrimary && (
                  <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition">
                    {ctaPrimary}
                  </button>
                )}
                {ctaSecondary && (
                  <button className="px-6 py-3 rounded-lg border border-[#1F1F1F] text-neutral-300 font-semibold text-sm hover:bg-neutral-900 transition">
                    {ctaSecondary}
                  </button>
                )}
              </div>
            </div>
          </section>
        );
      },
    },
  },
};

export default config;
