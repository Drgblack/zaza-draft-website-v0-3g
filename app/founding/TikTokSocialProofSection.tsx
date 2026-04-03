import { Card, CardContent } from "@/components/ui/card";
import type { FoundingFunnelCopy } from "./content";

type TikTokSocialProofSectionProps = {
  copy: FoundingFunnelCopy["socialProof"];
};

const TikTokSocialProofSection = ({ copy }: TikTokSocialProofSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-white/80 to-pink-50/35 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-5 text-3xl font-bold text-calm-800 md:text-4xl">
            {copy.heading}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-calm-600">
            {copy.subheading}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {copy.cards.map((card) => (
            <Card
              key={card.title}
              className="glass rounded-[1.75rem] border border-white/65 p-7"
            >
              <CardContent className="pt-0">
                <div className="mb-4 inline-flex rounded-full border border-zaza-200/50 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zaza-700">
                  TikTok signal
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-snug text-calm-800">
                  {card.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-zaza-700">
                  {card.stats}
                </p>
                <p className="text-sm leading-7 text-calm-600">{card.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-sm font-medium text-calm-700">{copy.note}</p>
        </div>
      </div>
    </section>
  );
};

export default TikTokSocialProofSection;
