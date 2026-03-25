import { Card, CardContent } from "@/components/ui/card";
import { Clock3, MoonStar, Repeat2 } from "lucide-react";

const teacherStressed = "/lovable-funnel/teacher-stressed.jpg";

const painCards = [
  {
    title: "Sunday Night Dread",
    body: `"It's 9 PM and I still have 25 more comments to write. My family's asleep and I'm staring at a blank screen."`,
    icon: MoonStar,
    iconClassName:
      "from-rose-200/90 to-pink-200/80 text-rose-600 shadow-rose-200/50",
  },
  {
    title: "Repetitive and Robotic",
    body: `"I keep writing the same things over and over. 'Great job' and 'Keep up the good work' - but my students deserve better."`,
    icon: Repeat2,
    iconClassName:
      "from-orange-200/90 to-amber-200/80 text-orange-600 shadow-orange-200/50",
  },
  {
    title: "Time Thief",
    body: `"Report cards steal my entire weekend. That's time I could spend with my own kids, or just breathing."`,
    icon: Clock3,
    iconClassName:
      "from-violet-200/90 to-fuchsia-200/80 text-violet-600 shadow-violet-200/50",
  },
];

const PainSection = () => {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            It's Sunday night.{" "}
            <span className="text-gradient-warm">Again.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-calm-600">
            Report cards are due tomorrow, and you're drowning in comments that
            all sound the same.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {painCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.title}
                className="glass rounded-[1.75rem] p-8 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-0">
                  <div
                    className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ${card.iconClassName}`}
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
                Every teacher knows this feeling. The blank screen. The
                pressure. The guilt that your comments are not good enough.
              </p>
              <p className="font-medium text-calm-500">
                Designed to reduce the risk in every message you send.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2rem] border border-white/35 shadow-[0_28px_74px_rgba(110,68,163,0.16)]">
              <img
                src={teacherStressed}
                alt="Teacher working late at desk looking stressed while writing student comments"
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
