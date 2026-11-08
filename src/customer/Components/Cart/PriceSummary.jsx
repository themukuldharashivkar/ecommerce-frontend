import { inr } from "../ui/format";

// Shared by the cart and the checkout order summary.
export default function PriceSummary({ data, children }) {
  return (
    <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-soft">
      <h2 className="text-base font-semibold text-ink">Order summary</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-neutral-600">
            Subtotal ({data?.totalItem ?? 0} {data?.totalItem === 1 ? "item" : "items"})
          </dt>
          <dd className="font-medium text-ink">{inr(data?.totalPrice ?? 0)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-600">Discount</dt>
          <dd className="font-medium text-success">-{inr(data?.discounte ?? 0)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-600">Delivery</dt>
          <dd className="font-medium text-success">Free</dd>
        </div>
        <div className="flex justify-between border-t border-neutral-200 pt-4 text-base">
          <dt className="font-semibold text-ink">Total</dt>
          <dd className="font-semibold text-ink">{inr(data?.totalDiscountedPrice ?? 0)}</dd>
        </div>
      </dl>
      {(data?.discounte ?? 0) > 0 && (
        <p className="mt-4 rounded-xl bg-success/10 px-3.5 py-2.5 text-xs font-medium text-success">
          You’re saving {inr(data.discounte)} on this order 🎉
        </p>
      )}
      {children}
    </div>
  );
}
