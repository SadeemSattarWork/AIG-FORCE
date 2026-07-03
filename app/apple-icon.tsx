import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "40px",
        }}
      >
        {/* Blue dot */}
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "#3B28CC",
            position: "absolute",
            top: "42px",
            left: "36px",
          }}
        />
        {/* AiG text */}
        <span
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          AiG
        </span>
      </div>
    ),
    { ...size }
  );
}
