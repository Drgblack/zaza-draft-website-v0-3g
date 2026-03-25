import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const teacherHappy = "/lovable-funnel/teacher-happy.jpg";

const solutionPoints = [
  {
    title: "Emotionally Intelligent",
    body: "Recognizes each student's unique strengths and growth areas with warmth and specificity.",
  },
  {
    title: "Your Voice, Amplified",
    body: "Learns your teaching style and tone, so comments sound authentically like you wrote them.",
  },
  {
    title: "Always Editable",
    body: "Every comment is your starting point. Tweak, personalize, and make it perfect in seconds.",
  },
  {
    title: "No Prompt Engineering",
    body: "Just choose your student, and Zaza handles the rest. No complex prompts or tech headaches.",
  },
];

const SolutionSection = () => {
  return (
    <section className="bg-gradient-to-br from-white/55 to-zaza-50/40 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            What if writing comments felt...{" "}
            <span className="text-gradient">easy?</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-calm-600">
            Zaza Draft writes emotionally aware, personalized comments that
            sound like you. No prompt engineering, no generic responses, no
            stress.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Card className="glass-strong rounded-[2rem] p-8 shadow-[0_28px_74px_rgba(217,70,239,0.12)]">
              <CardContent className="pt-0">
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold text-calm-800">
                    Generated comment for Emma:
                  </h4>
                  <div className="rounded-[1.5rem] border border-zaza-200/40 bg-white/85 p-6">
                    <p className="leading-relaxed text-calm-700">
                      "Emma has shown remarkable growth in her reading
                      comprehension this quarter. I've noticed how she takes her
                      time to really think about character motivations,
                      especially during our discussions about Charlotte's Web.
                      Her thoughtful questions show she's connecting deeply with
                      the stories we read. Moving forward, I'd love to see her
                      share those insights more confidently during group
                      discussions. Her classmates would benefit from her
                      perspective."
                    </p>
                  </div>
                </div>
                <div className="mb-4 text-xs text-calm-500">
                  Generated in 3 seconds. Fully editable.
                </div>
                <div className="flex items-center text-sm text-zaza-600">
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Sounds like your voice, not a robot
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              {solutionPoints.map((point) => (
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
                alt="Happy teacher working efficiently on laptop in organized classroom"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Card className="glass-strong rounded-[2rem] p-12">
              <CardContent className="pt-0">
                <p className="mb-6 text-xl font-medium text-calm-700 md:text-2xl">
                  Built with teachers, then refined through real classroom
                  feedback.
                </p>
                <p className="font-medium text-calm-500">
                  The goal is simple: help teachers write faster without losing
                  care, nuance, or control.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
