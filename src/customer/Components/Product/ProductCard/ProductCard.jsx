import React from "react";
import { Link } from "react-router-dom";
import { inr } from "../../ui/format";

// `to` lets callers override the destination (used by the static fallback data on the home page).
const ProductCard = ({ product, to, className = "" }) => {
  const { title, brand, imageUrl, price, discountedPrice, color, discountPersent, quantity } = product;
  const soldOut = typeof quantity === "number" && quantity < 1;
  const href = to || `/product/${product?.id}`;

  return (
    <Link
      to={href}
      className={`group block focus-visible:outline-none ${className}`}
      aria-label={`${brand ? brand + " " : ""}${title}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 ring-brand-500 transition group-focus-visible:ring-2">
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.05] ${
            soldOut ? "opacity-50 grayscale" : ""
          }`}
        />
        {discountPersent > 0 && !soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold tracking-wide text-sale shadow-sm backdrop-blur">
            -{discountPersent}%
          </span>
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">
            Sold out
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-white/95 py-2.5 text-center text-xs font-semibold text-ink opacity-0 shadow-soft backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden">
          View product
        </span>
      </div>

      <div className="px-1 pt-3.5">
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{brand}</p>
        <h3 className="mt-1 line-clamp-1 text-sm font-medium text-ink">{title}</h3>
        {color && <p className="mt-0.5 text-xs capitalize text-neutral-500">{color}</p>}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[15px] font-semibold text-ink">{inr(discountedPrice)}</span>
          {price > discountedPrice && (
            <span className="text-xs text-neutral-400 line-through">{inr(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => (
  <div>
    <div className="skeleton aspect-[3/4] w-full rounded-2xl" />
    <div className="px-1 pt-3.5 space-y-2">
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-4 w-4/5" />
      <div className="skeleton h-4 w-1/3" />
    </div>
  </div>
);

export default ProductCard;
