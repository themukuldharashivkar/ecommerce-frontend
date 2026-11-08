import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { inr } from "../ui/format";

export const statusStyle = {
  PLACED: "bg-blue-50 text-blue-700",
  CONFIRMED: "bg-indigo-50 text-indigo-700",
  SHIPPED: "bg-amber-50 text-amber-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
  PENDING: "bg-neutral-100 text-neutral-700",
};

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  const status = order?.orderStatus || "PENDING";
  const date = order?.orderDate || order?.createdAt;
  return (
    <div className="rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-soft transition hover:shadow-lift sm:p-5">
      <div className="flex items-start gap-4 sm:gap-5">
        <Link to={`/account/order/${order?.id}`} className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-28 sm:w-24">
          <img className="h-full w-full object-cover object-top" src={item?.product.imageUrl} alt="" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[status] || statusStyle.PENDING}`}>
              {status.toLowerCase()}
            </span>
            <p className="text-sm font-semibold text-ink">{inr(item?.discountedPrice ?? item?.price)}</p>
          </div>
          <Link to={`/account/order/${order?.id}`} className="mt-2 line-clamp-2 block text-sm font-medium text-ink hover:underline">
            {item?.product.title}
          </Link>
          <p className="mt-1 text-xs text-neutral-500">
            Size {item?.size}
            {date && <> · Ordered {new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</>}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <button
              type="button"
              onClick={() => navigate(`/account/order/${order?.id}`)}
              className="font-semibold text-ink underline underline-offset-4 hover:text-brand-600"
            >
              View order
            </button>
            {status === "DELIVERED" && (
              <button
                type="button"
                onClick={() => navigate(`/account/rate/${item?.product.id}`)}
                className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline"
              >
                <StarIcon className="h-4 w-4" /> Rate & review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
