import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import type { FunnelCopy } from "../content";

const teacherHappy = "/lovable-funnel/teacher-happy.jpg";

type SolutionSectionProps = {
  copy: FunnelCopy["solution"];
};

const SolutionSection = ({ copy }: SolutionSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-white/55 to-zaza-50/40 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            {copy.heading}{" "}
            <span className="text-gradient">{copy.headingAccent}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-calm-600">
            {copy.subheading}
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Card className="glass-strong rounded-[2rem] p-8 shadow-[0_28px_74px_rgba(217,70,239,0.12)]">
              <CardContent className="pt-0">
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold text-calm-800">
                    {copy.generatedHeading}
                  </h4>
                  <div className="rounded-[1.5rem] border border-zaza-200/40 bg-white/85 p-6">
                    <p className="leading-relaxed text-calm-700">
                      {copy.generatedBody}
                    </p>
                  </div>
                </div>
                <div className="mb-4 text-xs text-calm-500">
                  {copy.generatedMeta}
                </div>
                <div className="flex items-center text-sm text-zaza-600">
                  <CheckIcon className="mr-2 h-4 w-4" />
                  {copy.generatedVoiceNote}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              {copy.points.map((point) => (
                <div key={point.title} className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zaza-500 to-zaza-600 text-white shadow-lg shadow-fuchsia-200/50">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-calm-800">
                      {point.title}
                    </h3>
                    <p className="text-calm-600">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] border border-white/35 shadow-[0_28px_74px_rgba(217,70,239,0.14)]">
              <img
                src={teacherHappy}
                alt={copy.imageAlt}
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Card className="glass-strong rounded-[2rem] p-12">
              <CardContent className="pt-0">
                <p className="mb-6 text-xl font-medium text-calm-700 md:text-2xl">
                  {copy.quote}
                </p>
                <p className="font-medium text-calm-500">{copy.note}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
