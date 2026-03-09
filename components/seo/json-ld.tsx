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

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
