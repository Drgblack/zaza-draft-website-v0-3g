import GlossaryClient from "../../glossary/glossary-client";

export const dynamic = "force-static"; // safe for prerender

export default function Page() {
  return <GlossaryClient serverLang="de" />;
}