import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.fullName} - academia em ${siteConfig.city}/${siteConfig.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b0414 0%, #2b0d52 55%, #7b2cd9 100%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#7b2cd9",
              border: "3px solid #ffd60a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            purple<span style={{ color: "#ffd60a" }}>fit</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 118, fontWeight: 900, lineHeight: 0.95, textTransform: "uppercase" }}>
            Seu corpo é
          </div>
          <div style={{ fontSize: 118, fontWeight: 900, lineHeight: 0.95, textTransform: "uppercase", color: "#ffd60a" }}>
            capaz de mais.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#e9dcfb" }}>
          {siteConfig.fullName} · {siteConfig.city}/{siteConfig.region} · Aulas inclusas
        </div>
      </div>
    ),
    size,
  );
}
