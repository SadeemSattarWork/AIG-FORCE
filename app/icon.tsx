import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        {/* Blue dot */}
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#3B28CC",
            position: "absolute",
            top: "8px",
            left: "7px",
          }}
        />
        {/* AiG text */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.5px",
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
