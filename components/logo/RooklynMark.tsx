"use client";

import { useId } from "react";

type RooklynMarkProps = {
  variant?: "dark" | "light";
  className?: string;
  size?: number;
};

/**
 * The Rooklyn mark: a rook split by a 31° diagonal cut, with an apricot
 * spark on the line of the cut. Do not redraw, stretch, recolour or
 * simplify it. Minimum size is 20px; keep clear space of at least half
 * its width around it.
 */
export function RooklynMark({
  variant = "dark",
  className,
  size = 32,
}: RooklynMarkProps) {
  const reactId = useId();
  const uid = reactId.replace(/[:]/g, "");
  const gradId = `rk-${uid}`;
  const upperClip = `rk-u-${uid}`;
  const lowerClip = `rk-l-${uid}`;

  if (variant === "light") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 240"
        role="img"
        aria-label="Rooklyn"
        width={size}
        height={size}
        className={className}
      >
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="60"
            y1="224"
            x2="200"
            y2="90"
          >
            <stop offset="0" stopColor="#117A6D" />
            <stop offset="1" stopColor="#2A5CAA" />
          </linearGradient>
          <clipPath id={upperClip} clipPathUnits="userSpaceOnUse">
            <polygon points="0,0 240,0 240,66 0,210" />
          </clipPath>
          <clipPath id={lowerClip} clipPathUnits="userSpaceOnUse">
            <polygon points="0,224 240,80 240,240 0,240" />
          </clipPath>
        </defs>
        <path
          fill="#13243A"
          d="M68 28 H86 Q92 28 92 34 V50 H105 V34 Q105 28 111 28 H129 Q135 28 135 34 V50 H148 V34 Q148 28 154 28 H172 Q178 28 178 34 V88 H62 V34 Q62 28 68 28 Z M60 84 H180 Q188 84 188 92 V94 Q188 102 180 102 H60 Q52 102 52 94 V92 Q52 84 60 84 Z"
        />
        <path
          fill="#13243A"
          clipPath={`url(#${upperClip})`}
          d="M82 100 H158 C158 140 164 166 174 188 H66 C76 166 82 140 82 100 Z"
        />
        <path
          fill={`url(#${gradId})`}
          clipPath={`url(#${lowerClip})`}
          d="M82 100 H158 C158 140 164 166 174 188 H66 C76 166 82 140 82 100 Z"
        />
        <path
          fill={`url(#${gradId})`}
          d="M60 184 H180 Q186 184 186 190 V196 Q186 202 180 202 H60 Q54 202 54 196 V190 Q54 184 60 184 Z M50 207 H190 Q198 207 198 215 V216 Q198 224 190 224 H50 Q42 224 42 216 V215 Q42 207 50 207 Z"
        />
        <circle cx="214" cy="88.6" r="10.5" fill="#F4A36C" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      role="img"
      aria-label="Rooklyn"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="224"
          x2="200"
          y2="90"
        >
          <stop offset="0" stopColor="#8FD3C1" />
          <stop offset="1" stopColor="#A9C4EC" />
        </linearGradient>
        <clipPath id={upperClip} clipPathUnits="userSpaceOnUse">
          <polygon points="0,0 240,0 240,66 0,210" />
        </clipPath>
        <clipPath id={lowerClip} clipPathUnits="userSpaceOnUse">
          <polygon points="0,224 240,80 240,240 0,240" />
        </clipPath>
      </defs>
      <path
        fill="#F2EEE8"
        d="M68 28 H86 Q92 28 92 34 V50 H105 V34 Q105 28 111 28 H129 Q135 28 135 34 V50 H148 V34 Q148 28 154 28 H172 Q178 28 178 34 V88 H62 V34 Q62 28 68 28 Z M60 84 H180 Q188 84 188 92 V94 Q188 102 180 102 H60 Q52 102 52 94 V92 Q52 84 60 84 Z"
      />
      <path
        fill="#F2EEE8"
        clipPath={`url(#${upperClip})`}
        d="M82 100 H158 C158 140 164 166 174 188 H66 C76 166 82 140 82 100 Z"
      />
      <path
        fill={`url(#${gradId})`}
        clipPath={`url(#${lowerClip})`}
        d="M82 100 H158 C158 140 164 166 174 188 H66 C76 166 82 140 82 100 Z"
      />
      <path
        fill={`url(#${gradId})`}
        d="M60 184 H180 Q186 184 186 190 V196 Q186 202 180 202 H60 Q54 202 54 196 V190 Q54 184 60 184 Z M50 207 H190 Q198 207 198 215 V216 Q198 224 190 224 H50 Q42 224 42 216 V215 Q42 207 50 207 Z"
      />
      <circle cx="214" cy="88.6" r="10.5" fill="#F4A36C" />
    </svg>
  );
}
