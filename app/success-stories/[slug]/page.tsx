import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page Not Found | Zaza Draft",
  };
}

export default function CaseStudyPage() {
  notFound();
}
