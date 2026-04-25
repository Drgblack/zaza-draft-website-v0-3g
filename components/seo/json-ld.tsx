import {
  serializeJsonLd,
  type JsonLdEntry,
  type JsonLdValue,
} from "@/lib/seo/schema";

interface JsonLdScriptProps {
  id: string;
  data: JsonLdValue;
}

interface JsonLdCollectionProps {
  entries: JsonLdEntry[];
}

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function JsonLdCollection({ entries }: JsonLdCollectionProps) {
  return (
    <>
      {entries.map((entry) => (
        <JsonLdScript key={entry.id} id={entry.id} data={entry.data} />
      ))}
    </>
  );
}
