"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Download, FileText, Calendar } from "lucide-react";

interface Resource {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: string;
  publishedDate: string;
  enPath: string;
  dePath: string;
}

const resources: Resource[] = [
  {
    id: "ai-prompt-library",
    titleKey: "resources.items.aiPromptLibrary.title",
    descriptionKey: "resources.items.aiPromptLibrary.description",
    category: "AI Tools",
    publishedDate: "2024-01-15",
    enPath: "/resources/ai-prompt-library/build/AI-Prompt-Library-for-Teachers.docx",
    dePath: "/resources/ai-prompt-library/build/KI-Prompt-Bibliothek-fuer-Lehrkraefte.docx"
  },
  {
    id: "ai-rubric-prompts",
    titleKey: "resources.items.aiRubricPrompts.title",
    descriptionKey: "resources.items.aiRubricPrompts.description",
    category: "AI Tools",
    publishedDate: "2024-01-20",
    enPath: "/resources/ai-rubric-prompts/build/AI-Rubric-Prompts.docx",
    dePath: "/resources/ai-rubric-prompts/build/KI-Bewertungsraster-Prompts.docx"
  },
  {
    id: "assessment-rubrics",
    titleKey: "resources.items.assessmentRubrics.title",
    descriptionKey: "resources.items.assessmentRubrics.description",
    category: "Assessment",
    publishedDate: "2024-02-01",
    enPath: "/resources/assessment-rubrics/build/Assessment-Rubric-Library.docx",
    dePath: "/resources/assessment-rubrics/build/Bewertungsraster-Bibliothek.docx"
  },
  {
    id: "classroom-management",
    titleKey: "resources.items.classroomManagement.title",
    descriptionKey: "resources.items.classroomManagement.description",
    category: "Management",
    publishedDate: "2024-02-05",
    enPath: "/resources/classroom-management/build/Classroom-Management-Toolkit.docx",
    dePath: "/resources/classroom-management/build/Klassenmanagement-Toolkit.docx"
  },
  {
    id: "end-of-term-comments",
    titleKey: "resources.items.endOfTermComments.title",
    descriptionKey: "resources.items.endOfTermComments.description",
    category: "Communication",
    publishedDate: "2024-02-10",
    enPath: "/resources/end-of-term-comments/build/End-of-Term-Comment-Bank.docx",
    dePath: "/resources/end-of-term-comments/build/Zeugnisbemerkungen-Bank.docx"
  },
  {
    id: "lesson-planning-templates",
    titleKey: "resources.items.lessonPlanningTemplates.title",
    descriptionKey: "resources.items.lessonPlanningTemplates.description",
    category: "Planning",
    publishedDate: "2024-02-15",
    enPath: "/resources/lesson-planning-templates/build/Lesson-Planning-Templates.docx",
    dePath: "/resources/lesson-planning-templates/build/Unterrichtsplanungsvorlagen.docx"
  },
  {
    id: "parent-message-templates",
    titleKey: "resources.items.parentMessageTemplates.title",
    descriptionKey: "resources.items.parentMessageTemplates.description",
    category: "Communication",
    publishedDate: "2024-02-20",
    enPath: "/resources/parent-message-templates/build/Parent-Communication-Templates.docx",
    dePath: "/resources/parent-message-templates/build/Elternkommunikations-Vorlagen.docx"
  },
  {
    id: "teacher-time-playbook",
    titleKey: "resources.items.teacherTimePlaybook.title",
    descriptionKey: "resources.items.teacherTimePlaybook.description",
    category: "Productivity",
    publishedDate: "2024-02-25",
    enPath: "/resources/teacher-time-playbook/build/Teacher-Time-Saving-Playbook.docx",
    dePath: "/resources/teacher-time-playbook/build/Lehrer-Zeitspar-Handbuch.docx"
  },
  {
    id: "tone-checklist",
    titleKey: "resources.items.toneChecklist.title",
    descriptionKey: "resources.items.toneChecklist.description",
    category: "Communication",
    publishedDate: "2024-03-01",
    enPath: "/resources/tone-checklist/build/Professional-Tone-Checklist.docx",
    dePath: "/resources/tone-checklist/build/Professioneller-Ton-Checkliste.docx"
  },
  {
    id: "weekly-newsletter-bundle",
    titleKey: "resources.items.weeklyNewsletterBundle.title",
    descriptionKey: "resources.items.weeklyNewsletterBundle.description",
    category: "Communication",
    publishedDate: "2024-03-05",
    enPath: "/resources/weekly-newsletter-bundle/build/Weekly-Newsletter-Bundle.docx",
    dePath: "/resources/weekly-newsletter-bundle/build/Woechentliches-Newsletter-Paket.docx"
  }
];

export default function ResourcesClient() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(resources.map(r => r.category)))];
  
  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  const handleDownload = (resource: Resource) => {
    console.log("=== DOWNLOAD DEBUG ===");
    console.log("Current language:", language);
    console.log("Resource ID:", resource.id);
    console.log("English path:", resource.enPath);
    console.log("German path:", resource.dePath);
    
    const path = language === "de" ? resource.dePath : resource.enPath;
    console.log("Selected path:", path);
    console.log("=== END DEBUG ===");
    
    const link = document.createElement("a");
    link.href = path;
    link.download = path.split("/").pop() || "resource.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-20 lg:py-32 bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-4">
            {t("resources.title")}
          </h1>
          <p className="text-lg text-[#D1D5DB]">
            {t("resources.subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]"
              }`}
            >
              {category === "all" ? "All Resources" : category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-[#1E293B] rounded-lg p-6 hover:bg-[#334155] transition-colors"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#8B5CF6]/10 text-[#8B5CF6]">
                  {resource.category}
                </span>
                <FileText className="h-5 w-5 text-[#94A3B8]" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">
                {t(resource.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#94A3B8] mb-4 line-clamp-3">
                {t(resource.descriptionKey)}
              </p>

              {/* Published Date */}
              <div className="flex items-center text-xs text-[#64748B] mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {t("resources.published")}: {resource.publishedDate}
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(resource)}
                className="w-full flex items-center justify-center gap-2 bg-[#8B5CF6] text-white px-4 py-2 rounded-lg hover:bg-[#7C3AED] transition-colors"
              >
                <Download className="h-4 w-4" />
                {t("resources.download")}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#94A3B8]">
              {t("resources.comingSoon")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
