import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import AddDeliveryAddressForm from "./AddAddress";
import OrderSummary from "./OrderSummary";

const steps = ["Bag", "Delivery address", "Order summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const step = Number(new URLSearchParams(location.search).get("step")) || 2;
  const active = step - 1; // step=2 -> "Delivery address"

  const handleNext = () => {};
  const handleBack = () => (step <= 2 ? navigate("/cart") : navigate(`/checkout?step=${step - 1}`));

  return (
    <div className="container-x pb-20 pt-8 lg:pt-12">
      <button
        type="button"
        onClick={handleBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-ink"
      >
        <ArrowLeftIcon className="h-4 w-4" /> Back
      </button>

      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Checkout</h1>

      <ol className="mt-8 flex items-center" aria-label="Checkout progress">
        {steps.map((label, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li key={label} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`} aria-current={current ? "step" : undefined}>
              <span className="flex items-center gap-2.5">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                    done ? "bg-success text-white" : current ? "bg-ink text-white" : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className={`hidden text-sm sm:inline ${current ? "font-semibold text-ink" : "text-neutral-500"}`}>{label}</span>
              </span>
              {i < steps.length - 1 && (
                <span className={`mx-3 h-px flex-1 sm:mx-4 ${done ? "bg-success" : "bg-neutral-300"}`} />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-10">{step === 2 ? <AddDeliveryAddressForm handleNext={handleNext} /> : <OrderSummary />}</div>
    </div>
  );
}
