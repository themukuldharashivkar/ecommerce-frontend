import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ProductCard, { ProductCardSkeleton } from "../Product/ProductCard/ProductCard";
import Reveal from "../ui/Reveal";
import useCategoryProducts from "./useCategoryProducts";

// Horizontally scrolling, snap-aligned row of products for one category.
export default function ProductRail({ eyebrow, title, category, path, fallback }) {
  const { items, loading, live } = useCategoryProducts(category, { size: 10, fallback });
  const scroller = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
  }, [items, update]);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-10 lg:py-14">
      <div className="container-x">
        <Reveal className="mb-7 flex items-end justify-between gap-6">
          <div>
            {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={path}
              className="group hidden items-center gap-1.5 text-sm font-semibold text-ink sm:inline-flex"
            >
              Shop all
              <ArrowLongRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={edge.start}
                aria-label={`Scroll ${title} left`}
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 bg-white transition hover:border-ink disabled:opacity-30"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={edge.end}
                aria-label={`Scroll ${title} right`}
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 bg-white transition hover:border-ink disabled:opacity-30"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={scroller}
        onScroll={update}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [--rail-pad:1rem] sm:gap-5 sm:[--rail-pad:1.5rem] lg:[--rail-pad:2.5rem]"
        style={{
          paddingInline: "max(var(--rail-pad), calc((100vw - 1360px) / 2 + var(--rail-pad)))",
          scrollPaddingInline: "var(--rail-pad)",
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[44vw] shrink-0 sm:w-[30vw] lg:w-[17.5rem]">
                <ProductCardSkeleton />
              </div>
            ))
          : items.map((p, i) => (
              <div key={p.id ?? i} className="w-[44vw] shrink-0 snap-start sm:w-[30vw] lg:w-[17.5rem]">
                <ProductCard product={p} to={live ? undefined : path} />
              </div>
            ))}
        <div className="w-1 shrink-0 lg:hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
