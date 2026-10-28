"use client";

import React from "react";
import type { ProductColorVariant } from "./closet-types";

/**
 * Realistic boutique wooden coat hanger with metallic hook
 */
export function ClosetHanger({
  className = "",
  highlighted = false,
}: {
  className?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none relative w-full flex justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 280 84"
        className="w-[72%] max-w-[270px] drop-shadow-sm overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wood grain gradient for hanger shoulders */}
          <linearGradient id="hangerWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C5C38" />
            <stop offset="25%" stopColor="#A67347" />
            <stop offset="50%" stopColor="#7A4C2A" />
            <stop offset="75%" stopColor="#9C6B3F" />
            <stop offset="100%" stopColor="#673C1E" />
          </linearGradient>

          {/* Chrome metallic gradient for the hook */}
          <linearGradient id="hangerHookGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8BCBE" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#8A8E91" />
            <stop offset="100%" stopColor="#666A6D" />
          </linearGradient>

          {/* Brass / Silver neck collar */}
          <linearGradient id="neckBand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A4E51" />
            <stop offset="50%" stopColor="#D2D6D9" />
            <stop offset="100%" stopColor="#2E3134" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id="hookShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* The Hook: curves over the rail from behind and wraps over to the front */}
        <g filter="url(#hookShadow)">
          {/* Top curve of the hook looping over rail */}
          <path
            d="M136 28 C136 12, 142 4, 150 4 C158 4, 163 10, 163 18 C163 24, 158 30, 140 33 L140 38"
            stroke="url(#hangerHookGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Hook tip rounded cap */}
          <circle cx="136" cy="27" r="1.8" fill="#8A8E91" />
        </g>

        {/* Neck collar/ferrule attaching hook to wood */}
        <rect
          x="137.5"
          y="35"
          width="5"
          height="6"
          rx="1"
          fill="url(#neckBand)"
        />

        {/* Wooden Contoured Hanger Body */}
        <g className="transition-all duration-300">
          {/* Main contoured shoulder arch */}
          <path
            d="M140 39
               C146 39, 175 44, 218 55
               C244 61, 268 70, 272 75
               C275 79, 270 82, 264 80
               C240 73, 210 65, 140 60
               C70 65, 40 73, 16 80
               C10 82, 5 79, 8 75
               C12 70, 36 61, 62 55
               C105 44, 134 39, 140 39 Z"
            fill="url(#hangerWood)"
            stroke={highlighted ? "#3E2413" : "#4A2B15"}
            strokeWidth="0.8"
          />

          {/* Top subtle highlight reflection on polished wood */}
          <path
            d="M66 54 C104 43, 134 40, 140 40 C146 40, 176 43, 214 54"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Subtle bottom shadow on wood */}
          <path
            d="M20 78 C70 66, 140 62, 140 62 C140 62, 210 66, 260 78"
            stroke="rgba(0, 0, 0, 0.35)"
            strokeWidth="1"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Hanging clothing swing tags (Variant Tags) that hang from strings attached to the hanger
 */
export function HangingVariantTags({
  variants,
  selectedVariantId,
  onSelectVariant,
}: {
  variants: ProductColorVariant[];
  selectedVariantId: string;
  onSelectVariant: (variant: ProductColorVariant) => void;
}) {
  if (!variants || variants.length === 0) return null;

  return (
    <div
      className="absolute top-8 right-2 z-30 flex items-start gap-2.5 sm:right-6 sm:top-10"
      aria-label="Color options"
    >
      {variants.map((v, i) => {
        const isSelected = v.id === selectedVariantId;
        const stringHeight = i === 0 ? 32 : 44; // Staggered string lengths like real tags

        return (
          <div
            key={v.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              onSelectVariant(v);
            }}
          >
            {/* The Hanging String */}
            <svg
              width="2"
              height={stringHeight}
              className="overflow-visible pointer-events-none"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2={stringHeight}
                stroke="#6B7280"
                strokeWidth="1"
                strokeDasharray="2 2"
                className="opacity-70 group-hover:opacity-100"
              />
            </svg>

            {/* The Tag Card */}
            <button
              type="button"
              aria-label={`Select color ${v.name}`}
              aria-pressed={isSelected}
              className={`relative -mt-1 flex flex-col items-center rounded-[3px] px-2 py-3 text-center transition-all duration-300 shadow-md ${
                isSelected
                  ? "scale-105 ring-2 ring-accent ring-offset-2 ring-offset-canvas shadow-xl -translate-y-0.5"
                  : "opacity-85 hover:opacity-100 hover:scale-105 hover:-translate-y-0.5"
              }`}
              style={{
                backgroundColor: v.id.includes("white")
                  ? "#F8F9FA"
                  : v.id.includes("navy") || v.id.includes("blue")
                  ? "#1E2A4A"
                  : v.id.includes("grey") || v.id.includes("slate")
                  ? "#374151"
                  : "#111827",
                color: v.id.includes("white") ? "#111827" : "#F9FAFB",
                minWidth: "38px",
              }}
            >
              {/* Metallic Silver Eyelet Hole */}
              <span
                className="absolute -top-1.5 size-2 rounded-full border border-gray-400 bg-gray-200"
                style={{
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
                }}
              />

              {/* Color swatch dot */}
              <span
                className="mt-1 size-2.5 rounded-full border border-white/40 shadow-xs"
                style={{ backgroundColor: v.swatch }}
              />

              {/* Tag Label */}
              <span
                className="mt-1.5 text-[9px] font-black tracking-widest uppercase writing-mode-vertical"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  letterSpacing: "0.15em",
                }}
              >
                {v.tagLabel}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
