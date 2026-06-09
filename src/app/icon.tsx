import { ImageResponse } from "next/og";

// 브라우저 탭에 표시되는 파비콘 (KEN 로고)
export const size = { width: 64, height: 64 };
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
          background: "#111111",
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 1,
        }}
      >
        KEN
      </div>
    ),
    { ...size },
  );
}
