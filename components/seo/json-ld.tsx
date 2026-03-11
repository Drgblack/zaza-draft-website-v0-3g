interface JsonLdScriptProps {
  id: string;
  data: Record<string, unknown>;
}

interface JsonLdCollectionProps {
  entries: Array<{
    id: string;
    data: Record<string, unknown>;
  }>;
}

function serialiseJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialiseJsonLd(data) }}
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
