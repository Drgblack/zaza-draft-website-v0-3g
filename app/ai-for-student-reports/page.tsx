import AiStudentReportsClient from "./ai-student-reports-client";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="container mx-auto py-12 px-4">
        {/* The Title is now handled entirely by AiStudentReportsClient */}
        <AiStudentReportsClient />
      </div>
    </main>
  );
}
