import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Pagination from "@mui/material/Pagination";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../../Redux/Customers/Product/Action";
import { categoryIndex } from "../../../../config/navigationMenu";
import ProductCard, { ProductCardSkeleton } from "../ProductCard/ProductCard";
import FilterPanel from "./FilterPanel";
import { colorOptions, singleFilter, sortOptions } from "./FilterData";

const PAGE_SIZE = 12;
const cx = (...c) => c.filter(Boolean).join(" ");

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const location = useLocation();
  const { customersProduct } = useSelector((store) => store);

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const pageNumber = Number(query.get("page")) || 1;
  const sortValue = query.get("sort") || "featured";
  const price = query.get("price");
  const discount = query.get("disccout");
  const stock = query.get("stock");
  const colorValue = query.get("color");
  const sizeValue = query.get("size");

  const meta = categoryIndex[param.lavelThree];
  const title = meta?.label || param.lavelThree?.replace(/_/g, " ");

  useEffect(() => {
    const [minPrice, maxPrice] = price ? price.split("-").map(Number) : [0, 100000];
    dispatch(
      findProducts({
        category: param.lavelThree,
        colors: colorValue || [],
        sizes: sizeValue || [],
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 100000,
        minDiscount: discount || 0,
        sort: sortValue,
        pageNumber: pageNumber - 1,
        pageSize: PAGE_SIZE,
        stock: stock,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.lavelThree, colorValue, sizeValue, price, discount, sortValue, pageNumber, stock]);

  const selected = (id) => (query.get(id) ? query.get(id).split(",") : []);

  const push = (params) => {
    params.delete("page"); // any filter change returns to page 1
    const s = params.toString();
    navigate({ search: s ? `?${s}` : "" });
  };

  const onToggle = (id, value) => {
    const params = new URLSearchParams(location.search);
    const current = selected(id);
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    next.length ? params.set(id, next.join(",")) : params.delete(id);
    push(params);
  };

  const onSingle = (id, value) => {
    const params = new URLSearchParams(location.search);
    value === null ? params.delete(id) : params.set(id, value);
    push(params);
  };

  const onSort = (value) => {
    const params = new URLSearchParams(location.search);
    params.set("sort", value);
    push(params);
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    if (query.get("sort")) params.set("sort", query.get("sort"));
    push(params);
  };

  const onPage = (_, value) => {
    const params = new URLSearchParams(location.search);
    params.set("page", value);
    navigate({ search: `?${params.toString()}` });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // active filter chips
  const labelFor = (id, v) => {
    if (id === "color") return colorOptions.find((c) => c.value === v)?.label || v;
    if (id === "size") return `Size ${v}`;
    const sec = singleFilter.find((s) => s.id === id);
    return sec?.options.find((o) => o.value === v)?.label || v;
  };
  const activeChips = ["color", "size", "price", "disccout", "stock"].flatMap((id) =>
    selected(id).map((v) => ({ id, v, label: labelFor(id, v) }))
  );

  const loading = customersProduct.loading;
  const products = customersProduct.products?.content || [];
  const total = customersProduct.products?.totalElements;
  const totalPages = customersProduct.products?.totalPages || 0;
  const currentSort = sortOptions.find((o) => o.query === sortValue) || sortOptions[0];

  return (
    <div className="container-x pb-20 pt-6 lg:pt-8">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-neutral-500">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        {meta && (
          <>
            <ChevronRightIcon className="h-3 w-3" />
            <span>{meta.gender}</span>
            <ChevronRightIcon className="h-3 w-3" />
            <span>{meta.section}</span>
          </>
        )}
        <ChevronRightIcon className="h-3 w-3" />
        <span className="font-medium capitalize text-ink">{title}</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-3xl font-semibold capitalize tracking-tight text-ink sm:text-4xl">
            {meta?.gender ? `${meta.gender}’s ` : ""}
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-neutral-500" aria-live="polite">
            {loading ? "Loading…" : total != null ? `${total} ${total === 1 ? "product" : "products"}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="btn-secondary btn-sm lg:hidden"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4" />
            Filters {activeChips.length > 0 && <span className="text-brand-600">({activeChips.length})</span>}
          </button>

          <Menu as="div" className="relative">
            <Menu.Button className="btn-secondary btn-sm">
              <span className="hidden text-neutral-500 sm:inline">Sort:</span> {currentSort.name}
              <ChevronDownIcon className="h-4 w-4" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-lift focus:outline-none">
                {sortOptions.map((o) => (
                  <Menu.Item key={o.query}>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => onSort(o.query)}
                        className={cx(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm",
                          active && "bg-neutral-100",
                          o.query === sortValue ? "font-semibold text-ink" : "text-neutral-600"
                        )}
                      >
                        {o.name}
                        {o.query === sortValue && <CheckIcon className="h-4 w-4" />}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[17rem_1fr]">
        {/* sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3 no-scrollbar">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Filters</h2>
              {activeChips.length > 0 && (
                <button type="button" onClick={clearAll} className="text-xs font-medium text-brand-600 hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel selected={selected} onToggle={onToggle} onSingle={onSingle} />
          </div>
        </aside>

        <div>
          {activeChips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {activeChips.map(({ id, v, label }) => (
                <button
                  key={`${id}-${v}`}
                  type="button"
                  onClick={() => (["color", "size"].includes(id) ? onToggle(id, v) : onSingle(id, null))}
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 py-1.5 pl-3.5 pr-2.5 text-xs font-medium text-ink transition hover:bg-neutral-200"
                  aria-label={`Remove filter ${label}`}
                >
                  {label}
                  <XMarkIcon className="h-3.5 w-3.5" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="px-2 text-xs font-medium text-neutral-500 hover:text-ink lg:hidden">
                Clear all
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
              {products.map((item, i) => (
                <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid place-items-center rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-24 text-center">
              <p className="text-lg font-semibold text-ink">No products found</p>
              <p className="mt-1.5 max-w-xs text-sm text-neutral-500">
                {activeChips.length > 0
                  ? "Nothing matches those filters. Try removing a few."
                  : "We couldn’t load products for this category right now."}
              </p>
              {activeChips.length > 0 && (
                <button type="button" onClick={clearAll} className="btn-primary btn-sm mt-6">
                  Clear filters
                </button>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-14 flex justify-center">
              <Pagination count={totalPages} page={pageNumber} onChange={onPage} color="primary" shape="rounded" size="large" />
            </div>
          )}
        </div>
      </div>

      {/* mobile filters */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition duration-300 ease-out"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition duration-200 ease-in"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="flex h-full w-full max-w-sm flex-col bg-paper shadow-lift">
                <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                  <Dialog.Title className="text-lg font-semibold text-ink">Filters</Dialog.Title>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="rounded-full p-2 hover:bg-neutral-100"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <FilterPanel selected={selected} onToggle={onToggle} onSingle={onSingle} />
                </div>
                <div className="flex gap-3 border-t border-neutral-200 p-4">
                  <button type="button" onClick={clearAll} className="btn-secondary flex-1">
                    Clear all
                  </button>
                  <button type="button" onClick={() => setMobileFiltersOpen(false)} className="btn-primary flex-1">
                    {total != null ? `Show ${total} results` : "Done"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
