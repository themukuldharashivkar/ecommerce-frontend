import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { removeCartItem, updateCartItem } from "../../../Redux/Customers/Cart/Action";
import { inr } from "../ui/format";

const CartItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const p = item?.product;

  const handleRemove = () => dispatch(removeCartItem({ cartItemId: item?.id, jwt }));
  const handleUpdate = (num) =>
    dispatch(updateCartItem({ data: { quantity: item.quantity + num }, cartItemId: item?.id, jwt }));

  return (
    <div className="flex gap-4 rounded-3xl border border-neutral-200/80 bg-white p-3 shadow-soft sm:gap-6 sm:p-4">
      <Link
        to={`/product/${p?.id}`}
        className="h-32 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-40 sm:w-32"
      >
        <img className="h-full w-full object-cover object-top" src={p?.imageUrl} alt={p?.title} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{p?.brand}</p>
            <Link to={`/product/${p?.id}`} className="mt-0.5 line-clamp-2 text-sm font-medium text-ink hover:underline sm:text-base">
              {p?.title}
            </Link>
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              Size: <span className="font-medium text-ink">{item?.size}</span>
              {p?.color && (
                <>
                  {" "}
                  · <span className="capitalize">{p.color}</span>
                </>
              )}
              {!showButton && <> · Qty: {item?.quantity}</>}
            </p>
          </div>
          {showButton && (
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove item"
              className="rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-sale"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          {showButton ? (
            <div className="inline-flex items-center rounded-full border border-neutral-300">
              <button
                type="button"
                onClick={() => handleUpdate(-1)}
                disabled={item?.quantity <= 1}
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-neutral-100 disabled:opacity-30"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                {item?.quantity}
              </span>
              <button
                type="button"
                onClick={() => handleUpdate(1)}
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-neutral-100"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <span />
          )}
          <div className="text-right">
            <p className="text-base font-semibold text-ink sm:text-lg">{inr(item?.discountedPrice ?? p?.discountedPrice)}</p>
            <p className="flex items-center justify-end gap-2 text-xs">
              {p?.price > p?.discountedPrice && <span className="text-neutral-400 line-through">{inr(item?.price ?? p?.price)}</span>}
              {p?.discountPersent > 0 && <span className="font-semibold text-success">{p.discountPersent}% off</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
