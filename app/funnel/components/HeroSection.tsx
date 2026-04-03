import { Button } from "@/components/ui/button";
import type { FunnelCopy } from "../content";

const teacherHero = "/lovable-funnel/teacher-hero.jpg";

type HeroSectionProps = {
  onPrimaryAction: () => void;
  primaryCtaLabel: string;
  copy: FunnelCopy["hero"];
};

const HeroSection = ({
  onPrimaryAction,
  primaryCtaLabel,
  copy,
}: HeroSectionProps) => {
  const heroImageSrc = copy.imageSrc ?? teacherHero;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-16 lg:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-pink-300/30 to-fuchsia-300/10 blur-3xl" />
        <div className="absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-violet-300/20 to-pink-200/20 blur-3xl" />
        <div className="absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full border border-white/30 bg-white/20 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {copy.showLogo !== false ? (
            <div className="mb-8 flex justify-center lg:justify-start">
              <img
                src="/lovable-uploads/8554ae0a-a321-424b-8396-2e8334d8db0d.png"
                alt="Zaza Draft Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
          ) : null}

          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.32em] text-[#c026d3] lg:text-left">
            {copy.preheadline}
          </p>

          <h1 className="animate-fade-in text-center text-4xl font-bold leading-tight text-calm-800 md:text-5xl lg:text-left lg:text-6xl">
            {copy.headingLines[0]}
            <br />
            <span className="text-gradient-warm blinking-cursor">
              {copy.headingLines[1]}
            </span>
            <br />
            {copy.headingLines[2]}
          </h1>

          <div
            className="animate-fade-in mb-8 mt-8 text-center text-2xl font-semibold lg:text-left md:text-3xl"
            style={{ animationDelay: "0.18s" }}
          >
            <span className="text-gradient-warm">{copy.subheadingTop}</span>
            <br />
            <span className="text-calm-600">{copy.subheadingBottom}</span>
          </div>

          <div
            className="animate-fade-in mb-8 flex flex-col gap-4"
            style={{ animationDelay: "0.32s" }}
          >
            <Button
              type="button"
              onClick={onPrimaryAction}
              className="btn-primary h-auto w-full rounded-2xl px-10 py-6 text-lg font-semibold lg:w-auto"
            >
              {primaryCtaLabel}
            </Button>
            <p className="text-center text-sm text-calm-500 lg:text-left">
              {copy.reassurance}
            </p>
          </div>

          <div
            className="animate-fade-in text-center lg:text-left"
            style={{ animationDelay: "0.48s" }}
          >
            <p className="text-lg font-medium text-calm-700">{copy.footer}</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/40 shadow-[0_32px_90px_rgba(128,90,213,0.18)]">
            <img
              src={heroImageSrc}
              alt={copy.imageAlt}
              className="w-full object-cover"
            />

            <div className="testimonial-bubble">
              <p className="text-sm font-medium text-calm-700">{copy.bubble}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
