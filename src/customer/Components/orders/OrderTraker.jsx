import * as React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

const steps = ["Placed", "Confirmed", "Shipped", "Out for delivery", "Delivered"];

// activeStep = number of completed steps (0-5)
export default function OrderTraker({ activeStep = 0 }) {
  return (
    <ol className="flex w-full items-start" aria-label="Order progress">
      {steps.map((label, i) => {
        const done = i < activeStep;
        const current = i === activeStep;
        return (
          <li key={label} className="relative flex flex-1 flex-col items-center text-center" aria-current={current ? "step" : undefined}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2 ${i <= activeStep ? "bg-success" : "bg-neutral-200"}`}
              />
            )}
            <span
              className={`relative z-10 grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition ${
                done
                  ? "bg-success text-white"
                  : current
                  ? "bg-ink text-white ring-4 ring-neutral-200"
                  : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </span>
            <span className={`mt-2.5 px-1 text-[11px] leading-tight sm:text-xs ${done || current ? "font-semibold text-ink" : "text-neutral-500"}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
