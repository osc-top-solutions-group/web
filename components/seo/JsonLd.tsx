/**
 * Injects JSON-LD structured data as a <script> tag.
 * Works in both Server and Client components.
 * Pass a single object or an array of schema objects.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint: dangerouslySetInnerHTML is intentional for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
