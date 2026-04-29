/**
 * Dynamic Open Graph image for /c/[handle]
 *
 * When a creator shares zazadraft.com/c/coach on social media, this image is
 * used in the link preview. It includes the creator name so the preview stays
 * branded when the link is reshared.
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
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const creator = getCreator(handle);

  if (!creator) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            background: "#0F172A",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: 64,
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
          padding: 80,
          background: "linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 40,
            color: "#475569",
            fontSize: 28,
            fontWeight: 500,
          }}
        >
          Zaza Draft
        </div>

        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              marginBottom: 16,
              color: "#92400E",
              fontSize: 32,
            }}
          >
            {creator.displayName} - Zaza Draft
          </div>

          <div
            style={{
              display: "flex",
              color: "#0F172A",
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {creator.headline ?? "The message you won't regret tomorrow."}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
            borderTop: "2px solid #E2E8F0",
            color: "#475569",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>
            zazadraft.com/c/{creator.handle}
          </div>
          {creator.discountPercent && (
            <div
              style={{
                display: "flex",
                borderRadius: 8,
                background: "#0F172A",
                color: "white",
                fontWeight: 600,
                padding: "12px 24px",
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
