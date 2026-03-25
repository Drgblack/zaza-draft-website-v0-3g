import { Card, CardContent } from "@/components/ui/card";

const teacherWorkflow = "/lovable-funnel/teacher-workflow.jpg";

const steps = [
  {
    number: "1",
    title: "Choose Student",
    body: "Select your student and subject. Zaza remembers their progress and your teaching style.",
    preview: '"Emma - Reading Comprehension"',
  },
  {
    number: "2",
    title: "Generate",
    body: "Click generate and watch as Zaza creates a thoughtful, specific comment in your voice.",
    preview: "Generating thoughtful comment...",
  },
  {
    number: "3",
    title: "Tweak and Done",
    body: "Perfect as-is, or add your personal touch. Copy, paste, and you're done.",
    preview: "Ready to copy",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            Three steps to
            <span className="text-gradient"> reclaim your evenings</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-calm-600">
            Works on any device. Your Chromebook, phone, tablet. Wherever you
            are, whenever you need it.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="glass rounded-[1.75rem] p-8 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <CardContent className="pt-0">
                <div className="step-badge mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-calm-800">
                  {step.title}
                </h3>
                <p className="mb-6 text-calm-600">{step.body}</p>
                <div className="rounded-[1.25rem] border border-zaza-200/35 bg-white/65 p-4 text-sm text-calm-700">
                  {step.preview}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Card className="glass-strong rounded-[2rem] p-10">
              <CardContent className="pt-0">
                <div className="mb-5 inline-flex rounded-full border border-zaza-200/50 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-zaza-700">
                  Real time saved
                </div>
                <h3 className="mb-4 text-2xl font-bold text-calm-800">
                  From 3 hours to 30 minutes
                </h3>
                <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                  <div className="rounded-[1.25rem] border border-white/40 bg-white/70 px-4 py-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-500">
                      Before
                    </div>
                    <div className="mt-2 text-2xl font-bold text-calm-800">
                      3 hours
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-zaza-500">→</div>
                  <div className="rounded-[1.25rem] border border-pink-200/60 bg-gradient-to-br from-pink-50 to-white px-4 py-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zaza-600">
                      After
                    </div>
                    <div className="mt-2 text-2xl font-bold text-calm-800">
                      30 minutes
                    </div>
                  </div>
                </div>
                <p className="mb-6 text-lg text-calm-600">
                  What used to take your entire Sunday evening now fits into a
                  coffee break.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-calm-500">
                  <div>Seconds per comment</div>
                  <div>Any device</div>
                  <div>Always editable</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2rem] border border-white/35 shadow-[0_28px_74px_rgba(110,68,163,0.16)]">
              <img
                src={teacherWorkflow}
                alt="Close-up of teacher's hands typing efficient student comments on laptop"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
