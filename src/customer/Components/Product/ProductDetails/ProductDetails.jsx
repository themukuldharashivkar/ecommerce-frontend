import { useEffect, useMemo, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LockClosedIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart, getCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { categoryIndex } from "../../../../config/navigationMenu";
import ProductReviewCard from "./ProductReviewCard";
import ProductCard, { ProductCardSkeleton } from "../ProductCard/ProductCard";
import useCategoryProducts from "../../Home/useCategoryProducts";
import Stars from "../../ui/Stars";
import Reveal from "../../ui/Reveal";
import { avgRating, inr } from "../../ui/format";

const cx = (...c) => c.filter(Boolean).join(" ");

function Accordion({ title, children, defaultOpen = false }) {
  return (
    <Disclosure as="div" defaultOpen={defaultOpen} className="border-b border-neutral-200">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between py-5 text-left text-sm font-semibold text-ink">
            {title}
            <ChevronDownIcon className={cx("h-4 w-4 text-neutral-500 transition-transform", open && "rotate-180")} />
          </Disclosure.Button>
          <Disclosure.Panel className="pb-5 text-sm leading-relaxed text-neutral-600">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function SimilarProducts({ category, currentId }) {
  const { items, loading } = useCategoryProducts(category, { size: 9 });
  const list = items.filter((p) => p.id !== currentId).slice(0, 4);
  if (!loading && list.length === 0) return null;
  return (
    <section className="mt-20">
      <h2 className="mb-7 text-2xl font-semibold tracking-tight text-ink">You may also like</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function DetailsSkeleton() {
  return (
    <div className="container-x grid gap-10 py-10 lg:grid-cols-2 lg:gap-16">
      <div className="skeleton aspect-[4/5] w-full rounded-3xl" />
      <div className="space-y-5 pt-4">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-9 w-4/5" />
        <div className="skeleton h-7 w-40" />
        <div className="skeleton mt-8 h-12 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | adding | added | error
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const timer = useRef(null);

  useEffect(() => {
    setSelectedSize(null);
    setSizeError(false);
    setStatus("idle");
    window.scrollTo({ top: 0 });
    dispatch(findProductById({ productId: Number(productId), jwt }));
    dispatch(getAllReviews(productId));
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const product = customersProduct.product;
  const ready = product && String(product.id) === String(productId);

  const meta = ready ? categoryIndex[product.category?.name] : null;
  const rating = useMemo(() => avgRating(product?.ratings), [product]);
  const ratingCount = product?.ratings?.length || 0;
  const dist = useMemo(() => {
    const d = [5, 4, 3, 2, 1].map((n) => ({ n, c: 0 }));
    (product?.ratings || []).forEach((r) => {
      const k = d.find((x) => x.n === Math.round(r.rating));
      if (k) k.c += 1;
    });
    return d;
  }, [product]);

  const sizes = (product?.sizes || []).slice().sort((a, b) => ["XS", "S", "M", "L", "XL", "XXL"].indexOf(a.name) - ["XS", "S", "M", "L", "XL", "XXL"].indexOf(b.name));
  const soldOut = ready && (product.quantity < 1 || (sizes.length > 0 && sizes.every((s) => s.quantity < 1)));

  const handleAdd = async (e) => {
    e?.preventDefault();
    if (!jwt) {
      navigate("/login");
      return;
    }
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setStatus("adding");
    const ok = await dispatch(addItemToCart({ data: { productId, size: selectedSize }, jwt }));
    if (ok) {
      await dispatch(getCart(jwt));
      setStatus("added");
      timer.current = setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
    }
  };

  if (!ready) return <DetailsSkeleton />;

  const saved = product.price - product.discountedPrice;
  const reviews = product.reviews || [];

  const addButton = (className = "") => (
    <button
      type="button"
      onClick={handleAdd}
      disabled={soldOut || status === "adding"}
      className={cx(status === "added" ? "btn bg-success text-white" : "btn-primary", "w-full", className)}
    >
      {soldOut ? (
        "Sold out"
      ) : status === "adding" ? (
        "Adding…"
      ) : status === "added" ? (
        <>
          <CheckIcon className="h-5 w-5" strokeWidth={2.5} /> Added to bag
        </>
      ) : (
        "Add to bag"
      )}
    </button>
  );

  return (
    <div className="pb-28 lg:pb-0">
      <div className="container-x pt-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          {meta && (
            <>
              <ChevronRightIcon className="h-3 w-3" />
              <Link
                to={`/${meta.genderId}/${meta.sectionId}/${product.category.name}`}
                className="hover:text-ink"
              >
                {meta.gender}’s {meta.label}
              </Link>
            </>
          )}
          <ChevronRightIcon className="h-3 w-3" />
          <span className="max-w-[16rem] truncate font-medium text-ink">{product.title}</span>
        </nav>

        <section className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-3xl bg-neutral-100"
              onMouseEnter={() => setZoom((z) => ({ ...z, on: true }))}
              onMouseLeave={() => setZoom({ on: false, x: 50, y: 50 })}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-full w-full object-cover object-top transition-transform duration-300 ease-out"
                style={{
                  transform: zoom.on ? "scale(1.7)" : "scale(1)",
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                }}
              />
              {product.discountPersent > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-sale shadow-sm backdrop-blur">
                  -{product.discountPersent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* info */}
          <div className="lg:py-2">
            <p className="eyebrow">{product.brand}</p>
            <h1 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">{product.title}</h1>

            <div className="mt-4 flex items-center gap-3">
              {ratingCount > 0 ? (
                <>
                  <Stars value={rating} size={18} />
                  <span className="text-sm font-medium text-ink">{rating.toFixed(1)}</span>
                  <a href="#reviews" className="text-sm text-neutral-500 underline-offset-4 hover:underline">
                    {ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
                  </a>
                </>
              ) : (
                <a href="#reviews" className="text-sm text-neutral-500 underline-offset-4 hover:underline">
                  No ratings yet
                </a>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-semibold tracking-tight text-ink">{inr(product.discountedPrice)}</span>
              {product.price > product.discountedPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">{inr(product.price)}</span>
                  <span className="text-sm font-semibold text-success">
                    You save {inr(saved)} ({product.discountPersent}%)
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-neutral-500">Inclusive of all taxes</p>

            {product.color && (
              <p className="mt-6 text-sm text-neutral-600">
                Colour: <span className="font-semibold capitalize text-ink">{product.color}</span>
              </p>
            )}

            {/* sizes */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink">Select size</h2>
                {sizeError && (
                  <p role="alert" className="text-sm font-medium text-sale">
                    Please choose a size
                  </p>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Size">
                {sizes.map((s) => {
                  const out = s.quantity < 1;
                  const on = selectedSize === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      disabled={out}
                      onClick={() => {
                        setSelectedSize(s.name);
                        setSizeError(false);
                      }}
                      className={cx(
                        "chip !h-12 !min-w-[4rem]",
                        on && "chip-active",
                        out && "!cursor-not-allowed !border-neutral-200 !bg-neutral-50 !text-neutral-300 line-through hover:!border-neutral-200",
                        sizeError && !on && !out && "!border-sale/60"
                      )}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
              {sizes.length > 0 && !soldOut && (
                <p className="mt-3 text-xs text-neutral-500">
                  {selectedSize
                    ? `${sizes.find((s) => s.name === selectedSize)?.quantity} left in size ${selectedSize}`
                    : "Pick a size to continue"}
                </p>
              )}
            </div>

            <div className="mt-8 hidden gap-3 lg:flex">
              {addButton()}
            </div>
            {status === "added" && (
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-success/10 px-4 py-3 text-sm text-success animate-fade-in">
                <span className="font-medium">Added to your bag.</span>
                <Link to="/cart" className="font-semibold underline underline-offset-4">
                  View bag
                </Link>
              </div>
            )}
            {status === "error" && (
              <p role="alert" className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                We couldn’t add this item. Please try again.
              </p>
            )}

            <ul className="mt-8 grid gap-3 rounded-2xl bg-white p-5 text-sm text-neutral-700 ring-1 ring-neutral-200">
              <li className="flex items-center gap-3">
                <TruckIcon className="h-5 w-5 text-ink" /> Free delivery on orders over ₹500
              </li>
              <li className="flex items-center gap-3">
                <ArrowPathIcon className="h-5 w-5 text-ink" /> 7-day easy returns
              </li>
              <li className="flex items-center gap-3">
                <LockClosedIcon className="h-5 w-5 text-ink" /> Secure payments via Razorpay
              </li>
            </ul>

            <div className="mt-8 border-t border-neutral-200">
              <Accordion title="Description" defaultOpen>
                {product.description || "No description available."}
              </Accordion>
              <Accordion title="Product details">
                <dl className="grid grid-cols-[7rem_1fr] gap-y-2">
                  <dt className="text-neutral-500">Brand</dt>
                  <dd className="text-ink">{product.brand}</dd>
                  {product.color && (
                    <>
                      <dt className="text-neutral-500">Colour</dt>
                      <dd className="capitalize text-ink">{product.color}</dd>
                    </>
                  )}
                  {meta && (
                    <>
                      <dt className="text-neutral-500">Category</dt>
                      <dd className="text-ink">
                        {meta.gender} · {meta.label}
                      </dd>
                    </>
                  )}
                  <dt className="text-neutral-500">Sizes</dt>
                  <dd className="text-ink">{sizes.map((s) => s.name).join(", ") || "—"}</dd>
                </dl>
              </Accordion>
              <Accordion title="Delivery & returns">
                Orders ship within 1–2 business days and usually arrive in 3–6 days. Not the right fit? Return it within
                7 days of delivery for a full refund.
              </Accordion>
            </div>
          </div>
        </section>

        {/* reviews */}
        <Reveal as="section" id="reviews" className="mt-20 scroll-mt-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Ratings & reviews</h2>
            <Link to={`/account/rate/${product.id}`} className="btn-secondary btn-sm">
              Write a review
            </Link>
          </div>
          <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
            <div>
              {ratingCount > 0 ? (
                <>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-semibold tracking-tight text-ink">{rating.toFixed(1)}</span>
                    <span className="pb-1.5 text-sm text-neutral-500">out of 5</span>
                  </div>
                  <Stars value={rating} size={20} className="mt-2" />
                  <p className="mt-1 text-sm text-neutral-500">
                    Based on {ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
                  </p>
                  <div className="mt-6 space-y-2.5">
                    {dist.map(({ n, c }) => (
                      <div key={n} className="flex items-center gap-3 text-xs text-neutral-600">
                        <span className="w-3 text-right">{n}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
                          <div
                            className="h-full rounded-full bg-amber-500 transition-all duration-700"
                            style={{ width: `${(c / ratingCount) * 100}%` }}
                          />
                        </div>
                        <span className="w-6 text-neutral-400">{c}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-neutral-500">No ratings yet.</p>
              )}
            </div>
            <div>
              {reviews.length > 0 ? (
                reviews.map((item, i) => <ProductReviewCard key={item.id ?? i} item={item} />)
              ) : (
                <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                  <p className="font-semibold text-ink">No reviews yet</p>
                  <p className="mt-1 text-sm text-neutral-500">Be the first to share your thoughts on this product.</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <SimilarProducts category={product.category?.name} currentId={product.id} />
      </div>

      {/* mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-paper/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <div className="shrink-0">
            <p className="text-lg font-semibold leading-none text-ink">{inr(product.discountedPrice)}</p>
            {product.price > product.discountedPrice && (
              <p className="mt-1 text-xs text-neutral-400 line-through">{inr(product.price)}</p>
            )}
          </div>
          {addButton("flex-1")}
        </div>
      </div>
    </div>
  );
}
