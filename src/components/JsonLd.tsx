/**
 * Indsætter JSON-LD (schema.org) for Google og andre forståelse af siden.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD kræver serialiseret output
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
