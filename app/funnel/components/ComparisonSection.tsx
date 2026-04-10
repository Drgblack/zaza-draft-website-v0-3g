import { Card, CardContent } from "@/components/ui/card";
import type { FunnelCopy } from "../content";

type ComparisonSectionProps = {
  copy: FunnelCopy["comparison"];
};

const ComparisonSection = ({ copy }: ComparisonSectionProps) => {
  return (
    <section className="bg-white/70 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            {copy.heading}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-calm-600">
            {copy.subheading}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {copy.items.map((item) => (
            <Card
              key={item.title}
              className="glass rounded-[1.75rem] border border-white/70 p-8"
            >
              <CardContent className="pt-0">
                <h3 className="mb-3 text-xl font-semibold text-calm-800">
                  {item.title}
                </h3>
                <p className="text-calm-600">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
