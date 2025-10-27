export const metadata = {
  title: "Zaza Technologies | Our Company",
  description: "We build safe, teacher-first AI that reduces workload and strengthens teacher efficiency and well-being."
};

export default function CompanyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Our Company</p>
      <h1 className="text-3xl font-bold mb-4">Zaza Technologies</h1>
      <p className="text-muted-foreground mb-6">
        We’re a team of educators, engineers, and designers building the future of teacher technology.
        Zaza creates safe, teacher-first AI tools that reduce workload and strengthen teacher efficiency and well-being.
      </p>
      <p className="mb-4">
        Every Zaza app is powered by our KnowledgeCore platform for trusted, explainable AI and consistent, school-ready safeguards.
        We obsess over privacy, clarity, and classroom fit—so teachers can focus on teaching.
      </p>
      <p className="mb-4">
        Today, Zaza supports teachers across multiple countries, helping them save hours each week on lesson planning,
        feedback, and parent communication. Our vision is simple: give teachers back their time and creative confidence.
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4"><div className="text-2xl font-semibold">500+</div><div className="text-sm text-muted-foreground">Teachers</div></div>
        <div className="rounded-xl border p-4"><div className="text-2xl font-semibold">15</div><div className="text-sm text-muted-foreground">Countries</div></div>
        <div className="rounded-xl border p-4"><div className="text-2xl font-semibold">10h+</div><div className="text-sm text-muted-foreground">Saved weekly</div></div>
      </div>
    </main>
  );
}
