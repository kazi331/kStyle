"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "@/components/icons";
import { sizeChart } from "@/lib/catalog";

const steps = [
  {
    index: "01",
    title: "Chest",
    body: "Measure around the fullest part of your chest, arms relaxed.",
  },
  {
    index: "02",
    title: "Length",
    body: "From the highest point of the shoulder down to the hem.",
  },
  {
    index: "03",
    title: "Sleeve",
    body: "From the shoulder seam to the end of the cuff.",
  },
];

function formatMeasure(cm: number, unit: "cm" | "in") {
  if (unit === "cm") return String(cm);
  return (cm / 2.54).toFixed(1);
}

export function SizeGuide({
  productName,
  category,
  closeHref,
}: {
  productName: string;
  category: string;
  closeHref: string;
}) {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const piece = category === "Sweatshirts" ? "sweatshirt" : "hoodie";

  return (
    <div className="relative mx-auto box-border w-full max-w-[760px] overflow-hidden bg-canvas px-6 py-8 text-ink min-[861px]:px-10 min-[861px]:py-10">
      <div className="stripe absolute inset-y-0 right-0 w-5" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
            {productName}
          </div>
          <h1 className="cd size-title mt-1.5 mb-0">Size guide</h1>
        </div>
        <Link
          href={closeHref}
          aria-label="Close size guide"
          className="mr-3 flex size-12 shrink-0 items-center justify-center border-2 border-ink"
        >
          <CloseIcon />
        </Link>
      </div>

      <div className="mt-7 flex w-[200px]">
        <button
          type="button"
          aria-pressed={unit === "cm"}
          onClick={() => setUnit("cm")}
          className={`min-h-11 flex-1 cursor-pointer border-2 border-ink text-[13px] font-extrabold tracking-[0.1em] ${
            unit === "cm" ? "bg-ink text-paper" : "bg-transparent text-ink"
          }`}
        >
          CM
        </button>
        <button
          type="button"
          aria-pressed={unit === "in"}
          onClick={() => setUnit("in")}
          className={`min-h-11 flex-1 cursor-pointer border-2 border-l-0 border-ink text-[13px] font-extrabold tracking-[0.1em] ${
            unit === "in" ? "bg-ink text-paper" : "bg-transparent text-ink"
          }`}
        >
          IN
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[17px] font-semibold">
          <thead>
            <tr className="text-xs tracking-[0.12em] text-muted uppercase">
              <th scope="col" className="pb-2.5 text-left font-semibold">
                Size
              </th>
              <th scope="col" className="text-left font-semibold">
                Chest
              </th>
              <th scope="col" className="text-left font-semibold">
                Length
              </th>
              <th scope="col" className="text-left font-semibold">
                Shoulder
              </th>
              <th scope="col" className="text-left font-semibold">
                Sleeve
              </th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((row) => (
              <tr key={row.size} className="border-t-2 border-ink">
                <th scope="row" className="cd py-3.5 text-left text-[30px]">
                  {row.size}
                </th>
                <td className="py-3.5">{formatMeasure(row.chest, unit)}</td>
                <td className="py-3.5">{formatMeasure(row.length, unit)}</td>
                <td className="py-3.5">{formatMeasure(row.shoulder, unit)}</td>
                <td className="py-3.5">{formatMeasure(row.sleeve, unit)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-ink">
              <td colSpan={5} className="p-0" />
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="cd mt-9 mb-2 text-[32px] leading-[0.9] min-[861px]:text-[44px]">
        How to measure
      </h2>
      <div>
        {steps.map((step) => (
          <div
            key={step.index}
            className="flex gap-4 border-t-2 border-ink py-3.5"
          >
            <span className="cd text-[32px] text-accent">{step.index}</span>
            <div>
              <div className="text-[17px] font-extrabold">{step.title}</div>
              <div className="mt-0.5 leading-normal text-body">{step.body}</div>
            </div>
          </div>
        ))}
        <div className="border-t-2 border-ink" />
      </div>
      <div className="mt-6 bg-ink px-5 py-[18px] text-[15px] leading-normal text-paper">
        <strong>Between sizes?</strong> This {piece} is cut relaxed. Pick your
        usual size for an easy fit, or size down for a closer one.
      </div>
    </div>
  );
}
