import type { Metadata } from "next";
import { buildCanonicalAlternates } from "@/lib/seo-canonical";
import FoundingTeachersFunnel from "./FoundingTeachersFunnel";

export const metadata: Metadata = {
  title: "Founding Teachers | Zaza Draft",
  description:
    "Join the first teachers shaping Zaza Draft. Early access for calmer, safer school communication with founding pricing locked for life while your subscription stays active.",
  alternates: buildCanonicalAlternates("/founding"),
};

export default function FoundingPage() {
  return <FoundingTeachersFunnel />;
}
