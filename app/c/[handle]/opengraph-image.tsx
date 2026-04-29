/**
 * Dynamic Open Graph image for /c/[handle]
 *
 * When a creator (or anyone) shares zazadraft.com/c/coach on social media,
 * this image is what appears in the link preview. It includes the creator's
 * name so the preview stays branded — meaningful for trust transfer when
 * the link gets reshared.
 *
 * Generated on-demand using Next.js native ImageResponse — no external
 * service, no extra dependency.
 */

import { ImageResponse } from "next/og";
import { getCreator } from "@/lib/creators";

export const runtime = "edge";
export const alt = "Zaza Draft";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: { handle: string };
}) {
  const creator = getCreator(params.handle);

  if (!creator) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#0F172A",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          Zaza Draft
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 100%)",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — Zaza Draft branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#475569",
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 40,
          }}
        >
          Zaza Draft
        </div>

        {/* Middle — creator + product */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#92400E",
              marginBottom: 16,
            }}
          >
            {creator.displayName} �- Zaza Draft
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 600,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {creator.headline ?? "The message you won't regret tomorrow."}
          </div>
        </div>

        {/* Bottom — CTA + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#475569",
            fontSize: 24,
            paddingTop: 40,
            borderTop: "2px solid #E2E8F0",
          }}
        >
          <div style={{ display: "flex" }}>
            zazadraft.com/c/{creator.handle}
          </div>
          {creator.discountPercent && (
            <div
              style={{
                display: "flex",
                background: "#0F172A",
                color: "white",
                padding: "12px 24px",
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              {creator.discountPercent}% off
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
