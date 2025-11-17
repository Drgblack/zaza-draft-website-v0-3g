"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Download, ArrowLeft, FileText, CheckCircle, Book } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/language-context";
import type { AILiteracyResource } from "@/lib/data/ai-literacy-resources";

interface ResourceDetailClientProps {
  resource: AILiteracyResource;
}

export default function ResourceDetailClient({
  resource,
}: ResourceDetailClientProps) {
  const { language } = useLanguage();
  const isGerman = language === "de";

  const downloadUrl =
    isGerman && resource.downloadUrlDe
      ? resource.downloadUrlDe
      : resource.downloadUrl;

  const handleDownload = () => {
    trackEvent("resource_downloaded", {
      resource_slug: resource.slug,
      resource_title: resource.title,
      category: resource.category,
    });

    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  const title = isGerman ? resource.titleDe : resource.title;
  const description = isGerman ? resource.descriptionDe : resource.description;
  const features = isGerman ? resource.featuresDe : resource.features;

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={isGerman ? "/de/ai-literacy" : "/ai-literacy"}
            className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-[#A78BFA] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isGerman ? "Zurück zu KI-Kompetenzen" : "Back to AI Literacy"}
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center flex-shrink-0">
              {resource.category === "templates" ? (
                <FileText className="w-8 h-8 text-white" />
              ) : (
                <Book className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-[#8B5CF6]/20 rounded-full text-sm text-[#A78BFA] mb-4">
                {resource.category === "templates"
                  ? isGerman
                    ? "Vorlage"
                    : "Template"
                  : isGerman
                    ? "Leitfaden"
                    : "Guide"}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl text-gray-300">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>
                {resource.downloads} {isGerman ? "Downloads" : "downloads"}
              </span>
            </div>
            {resource.fileType && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="uppercase">{resource.fileType}</span>
              </div>
            )}
          </div>

          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:from-[#7C3AED] hover:to-[#8B5CF6] text-white px-8"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGerman ? "Kostenlos herunterladen" : "Download Free"}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="py-16 px-4 bg-[#0F172A]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              {isGerman ? "Was ist enthalten" : "What's Included"}
            </h2>
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-[#1E293B] border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-200">{feature}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Use Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {isGerman
              ? "So verwenden Sie diese Ressource"
              : "How to Use This Resource"}
          </h2>
          <Card className="bg-[#1E293B] border-white/10 p-8">
            <ol className="space-y-4 text-gray-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white mb-1">
                    {isGerman ? "Herunterladen" : "Download"}
                  </p>
                  <p className="text-sm">
                    {isGerman
                      ? "Klicken Sie auf die Schaltfläche oben, um die Ressource kostenlos herunterzuladen."
                      : "Click the button above to download the resource for free."}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white mb-1">
                    {isGerman ? "Anpassen" : "Customize"}
                  </p>
                  <p className="text-sm">
                    {isGerman
                      ? "Passen Sie die Vorlagen an Ihren Unterrichtsstil und die Bedürfnisse Ihrer Schüler an."
                      : "Adapt the templates to your teaching style and your students' needs."}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <p className="font-semibold text-white mb-1">
                    {isGerman ? "Implementieren" : "Implement"}
                  </p>
                  <p className="text-sm">
                    {isGerman
                      ? "Nutzen Sie die Ressource in Ihrem Klassenzimmer und beobachten Sie die Ergebnisse."
                      : "Use the resource in your classroom and observe the results."}
                  </p>
                </div>
              </li>
            </ol>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isGerman ? "Bereit für mehr?" : "Ready for More?"}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {isGerman
              ? "Entdecken Sie unsere vollständige Bibliothek mit über 50 kostenlosen Ressourcen"
              : "Explore our full library of 50+ free resources"}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10"
            >
              <Link href={isGerman ? "/de/ai-literacy" : "/ai-literacy"}>
                {isGerman
                  ? "Alle Ressourcen durchsuchen"
                  : "Browse All Resources"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]"
            >
              <Link href="/pricing">
                {isGerman ? "Zaza Draft testen" : "Try Zaza Draft"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
