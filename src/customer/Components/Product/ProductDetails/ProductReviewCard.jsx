import React from "react";
import { initials } from "../../ui/format";

const ProductReviewCard = ({ item }) => {
  const date = item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;
  return (
    <article className="flex gap-4 border-b border-neutral-200 py-6 last:border-0">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
        {initials(item?.user)}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-sm font-semibold text-ink">{item?.user?.firstName}</p>
          {date && <p className="text-xs text-neutral-500">{date}</p>}
        </div>
        <p className="mt-2 break-words text-sm leading-relaxed text-neutral-700">{item?.review}</p>
      </div>
    </article>
  );
};

export default ProductReviewCard;
