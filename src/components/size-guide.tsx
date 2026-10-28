"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  open,
  onClose,
  productName,
  category,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
  category: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const piece = category === "Sweatshirts" ? "sweatshirt" : "hoodie";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2.5rem)] w-[min(520px,calc(100vw-2rem))] overflow-y-auto border-0 bg-transparent p-0 text-ink backdrop:bg-ink/70"
    >
      <div className="relative box-border w-full overflow-hidden bg-canvas px-5 py-6 min-[861px]:px-7 min-[861px]:py-7">
        <div className="stripe absolute inset-y-0 right-0 w-3.5" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
              {productName}
            </div>
            <h2 id={titleId} className="cd text-3xl min-[861px]:text-4xl mt-1 mb-0 leading-tight">
              Size guide
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close size guide"
            onClick={onClose}
            className="mr-2 flex size-9 shrink-0 cursor-pointer items-center justify-center border-2 border-ink bg-transparent"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Unit switch */}
        <div className="mt-4 flex w-[140px]">
          <button
            type="button"
            aria-pressed={unit === "cm"}
            onClick={() => setUnit("cm")}
            className={`min-h-8 flex-1 cursor-pointer border-2 border-ink text-xs font-black tracking-wider ${
              unit === "cm" ? "bg-ink text-paper" : "bg-transparent text-ink"
            }`}
          >
            CM
          </button>
          <button
            type="button"
            aria-pressed={unit === "in"}
            onClick={() => setUnit("in")}
            className={`min-h-8 flex-1 cursor-pointer border-2 border-l-0 border-ink text-xs font-black tracking-wider ${
              unit === "in" ? "bg-ink text-paper" : "bg-transparent text-ink"
            }`}
          >
            IN
          </button>
        </div>

        {/* Measurements Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[380px] border-collapse text-left text-xs font-semibold">
            <thead>
              <tr className="text-[10px] tracking-[0.12em] text-muted uppercase">
                <th scope="col" className="pb-1.5 text-left font-bold">
                  Size
                </th>
                <th scope="col" className="text-left font-bold">
                  Chest
                </th>
                <th scope="col" className="text-left font-bold">
                  Length
                </th>
                <th scope="col" className="text-left font-bold">
                  Shoulder
                </th>
                <th scope="col" className="text-left font-bold">
                  Sleeve
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size} className="border-t border-ink/40">
                  <th scope="row" className="cd py-2 text-left text-base font-black">
                    {row.size}
                  </th>
                  <td className="py-2">{formatMeasure(row.chest, unit)}</td>
                  <td className="py-2">{formatMeasure(row.length, unit)}</td>
                  <td className="py-2">{formatMeasure(row.shoulder, unit)}</td>
                  <td className="py-2">{formatMeasure(row.sleeve, unit)}</td>
                </tr>
              ))}
              <tr className="border-t border-ink/40">
                <td colSpan={5} className="p-0" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <h3 className="cd mt-5 mb-1.5 text-lg min-[861px]:text-xl font-black">
          How to measure
        </h3>
        <div>
          {steps.map((step) => (
            <div
              key={step.index}
              className="flex items-start gap-3 border-t border-ink/30 py-2.5"
            >
              <span className="cd text-lg text-accent font-black">{step.index}</span>
              <div>
                <div className="text-xs font-black">{step.title}</div>
                <div className="mt-0.5 text-[11px] leading-relaxed text-body">{step.body}</div>
              </div>
            </div>
          ))}
          <div className="border-t border-ink/30" />
        </div>

        <div className="mt-4 bg-ink px-4 py-2.5 text-xs leading-normal text-paper">
          <strong>Between sizes?</strong> This {piece} is cut relaxed. Pick your
          usual size for an easy fit, or size down for a closer one.
        </div>
      </div>
    </dialog>
  );
}
