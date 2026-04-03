import { Card, CardContent } from "@/components/ui/card";
import { Clock3, MoonStar, Repeat2 } from "lucide-react";
import type { FunnelCopy } from "../content";

const teacherStressed = "/lovable-funnel/teacher-stressed.jpg";

const painIcons = [MoonStar, Repeat2, Clock3] as const;
const painIconClassNames = [
  "from-rose-200/90 to-pink-200/80 text-rose-600 shadow-rose-200/50",
  "from-orange-200/90 to-amber-200/80 text-orange-600 shadow-orange-200/50",
  "from-violet-200/90 to-fuchsia-200/80 text-violet-600 shadow-violet-200/50",
] as const;

type PainSectionProps = {
  copy: FunnelCopy["pain"];
};

const PainSection = ({ copy }: PainSectionProps) => {
  const imageSrc = copy.imageSrc ?? teacherStressed;

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            {copy.heading}{" "}
            {copy.headingAccent ? (
              <span className="text-gradient-warm">{copy.headingAccent}</span>
            ) : null}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-calm-600">
            {copy.subheading}
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {copy.cards.map((card, index) => {
            const Icon = painIcons[index];

            return (
              <Card
                key={card.title}
                className="glass rounded-[1.75rem] p-8 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-0">
                  <div
                    className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ${painIconClassNames[index]}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-calm-800">
                    {card.title}
                  </h3>
                  <p className="text-calm-600">{card.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="glass-strong rounded-[2rem] p-12">
              <p className="mb-6 text-2xl font-medium text-calm-700 md:text-3xl">
                {copy.quote}
              </p>
              <p className="font-medium text-calm-500">{copy.note}</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2rem] border border-white/35 shadow-[0_28px_74px_rgba(110,68,163,0.16)]">
              <img
                src={imageSrc}
                alt={copy.imageAlt}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
