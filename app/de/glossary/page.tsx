import GlossaryClient from "../../glossary/glossary-client";
export const dynamic = "force-static";
export default function Page() {
  return <GlossaryClient serverLang="de" />;
}