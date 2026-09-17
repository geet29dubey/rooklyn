import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 60% at 80% 10%, rgba(158,42,69,0.35), transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(17,122,109,0.3), transparent 60%), #0B131C",
        }}
      >
        <svg width="96" height="96" viewBox="0 0 240 240">
          <defs>
            <linearGradient id="og-grad" x1="60" y1="224" x2="200" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8FD3C1" />
              <stop offset="1" stopColor="#A9C4EC" />
            </linearGradient>
            <clipPath id="og-u"><polygon points="0,0 240,0 240,66 0,210" /></clipPath>
            <clipPath id="og-l"><polygon points="0,224 240,80 240,240 0,240" /></clipPath>
          </defs>
          <path fill="#F2EEE8" d="M68 28 H86 Q92 28 92 34 V50 H105 V34 Q105 28 111 28 H129 Q135 28 135 34 V50 H148 V34 Q148 28 154 28 H172 Q178 28 178 34 V88 H62 V34 Q62 28 68 28 Z M60 84 H180 Q188 84 188 92 V94 Q188 102 180 102 H60 Q52 102 52 94 V92 Q52 84 60 84 Z" />
          <path fill="#F2EEE8" clipPath="url(#og-u)" d="M82 100 H158 C158 140 164 166 174 188 H66 C76 166 82 140 82 100 Z" />
          <path fill="url(#og-grad)" clipPath="url(#og-l)" d="M82 100 H158 C158 140 164 166 174 188 H66 C76 166 82 140 82 100 Z" />
          <path fill="url(#og-grad)" d="M60 184 H180 Q186 184 186 190 V196 Q186 202 180 202 H60 Q54 202 54 196 V190 Q54 184 60 184 Z M50 207 H190 Q198 207 198 215 V216 Q198 224 190 224 H50 Q42 224 42 216 V215 Q42 207 50 207 Z" />
          <circle cx="214" cy="88.6" r="10.5" fill="#F4A36C" />
        </svg>
        <div
          style={{
            marginTop: 28,
            fontSize: 58,
            letterSpacing: 14,
            color: "#C9A96E",
            fontFamily: "serif",
          }}
        >
          ROOKLYN
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 28,
            fontStyle: "italic",
            color: "#C9A96E",
            fontFamily: "serif",
          }}
        >
          {t("tagline")}
        </div>
      </div>
    ),
    { ...size }
  );
}
