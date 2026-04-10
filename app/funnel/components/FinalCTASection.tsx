import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FunnelCopy } from "../content";

type FinalCTASectionProps = {
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  primaryCtaLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
  copy: FunnelCopy["finalCta"];
};

const FinalCTASection = ({
  onPrimaryAction,
  onSecondaryAction,
  primaryCtaLabel,
  primaryHref,
  secondaryHref,
  copy,
}: FinalCTASectionProps) => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50/90 to-violet-50/80 px-4 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-200/20 to-pink-300/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-violet-200/25 to-fuchsia-200/15 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-calm-800 md:text-5xl">
            {copy.headingLines[0]}
            <br />
            <span className="text-gradient-warm">{copy.headingLines[1]}</span>
          </h2>

          <p className="mx-auto mb-8 max-w-2xl whitespace-pre-line text-xl text-calm-600">
            {copy.subheading}
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4">
            <Button
              asChild={Boolean(primaryHref)}
              type={primaryHref ? undefined : "button"}
              onClick={primaryHref ? undefined : onPrimaryAction}
              className="btn-primary h-auto rounded-2xl px-10 py-5 text-lg font-semibold shadow-xl hover:shadow-2xl"
            >
              {primaryHref ? (
                <Link href={primaryHref} onClick={onPrimaryAction}>
                  {primaryCtaLabel}
                </Link>
              ) : (
                primaryCtaLabel
              )}
            </Button>
            {copy.secondaryCtaLabel && secondaryHref ? (
              <Link
                href={secondaryHref}
                onClick={onSecondaryAction}
                className="text-sm font-medium text-calm-600 underline-offset-4 hover:text-calm-800 hover:underline"
              >
                {copy.secondaryCtaLabel}
              </Link>
            ) : null}
            {copy.bridgeLine ? (
              <p className="max-w-2xl text-sm font-medium text-calm-700">
                {copy.bridgeLine}
              </p>
            ) : null}
            <p className="text-sm text-calm-500">{copy.reassurance}</p>
          </div>

          <div className="glass-strong mx-auto max-w-3xl rounded-[1.75rem] p-8">
            <p className="text-lg font-medium text-calm-700 md:text-xl">
              {copy.quote}
            </p>
          </div>

          <div className="mt-16 pt-8">
            <div className="funnel-section-divider mx-auto mb-8 max-w-2xl" />
            <div className="flex flex-col items-center justify-center gap-4 text-sm text-calm-500 sm:flex-row sm:gap-6">
              {copy.footerItems.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="funnel-mobile-cta fixed bottom-0 left-0 right-0 z-50 border-t p-4 shadow-lg lg:hidden">
        <Button
          asChild={Boolean(primaryHref)}
          type={primaryHref ? undefined : "button"}
          onClick={primaryHref ? undefined : onPrimaryAction}
          className="btn-primary h-auto w-full rounded-2xl px-6 py-4 text-base font-semibold"
        >
          {primaryHref ? (
            <Link href={primaryHref} onClick={onPrimaryAction}>
              {primaryCtaLabel}
            </Link>
          ) : (
            primaryCtaLabel
          )}
        </Button>
      </div>
    </>
  );
};

export default FinalCTASection;
