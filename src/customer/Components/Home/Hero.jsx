import { Link } from "react-router-dom";
import { ArrowLongRightIcon, TruckIcon } from "@heroicons/react/24/outline";
import { categoryImages } from "../../../config/navigationMenu";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[26rem] w-[26rem] rounded-full bg-amber-100/60 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <p className="animate-fade-up eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3.5 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> New season is live
          </p>
          <h1
            className="animate-fade-up text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            Wear what <br className="hidden sm:block" />
            feels like{" "}
            <span className="font-display font-normal italic text-brand-600">you.</span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Dresses, kurtas, denim and everyday essentials — curated pieces at honest prices, delivered to your door.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Link to="/women/clothing/women_dress" className="btn-primary group">
              Shop women
              <ArrowLongRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/men/clothing/shirt" className="btn-secondary">
              Shop men
            </Link>
          </div>
          <dl
            className="animate-fade-up mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-neutral-200 pt-6"
            style={{ animationDelay: "320ms" }}
          >
            {[
              ["500+", "styles"],
              ["Up to 70%", "off"],
              ["7 days", "easy returns"],
            ].map(([a, b]) => (
              <div key={b}>
                <dt className="text-lg font-semibold text-ink sm:text-xl">{a}</dt>
                <dd className="text-xs text-neutral-500 sm:text-sm">{b}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* collage */}
        <div className="relative lg:col-span-6">
          <div className="mx-auto grid max-w-xl grid-cols-12 gap-3 sm:gap-4">
            <Link
              to="/women/clothing/women_dress"
              className="animate-fade-up group relative col-span-7 row-span-2 overflow-hidden rounded-t-[999px] rounded-b-3xl bg-neutral-100"
              style={{ animationDelay: "120ms" }}
            >
              <img
                src={categoryImages.women_dress}
                alt="Women's dresses"
                className="aspect-[3/4.4] h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              />
            </Link>
            <Link
              to="/men/clothing/shirt"
              className="animate-fade-up group relative col-span-5 overflow-hidden rounded-3xl bg-neutral-100"
              style={{ animationDelay: "220ms" }}
            >
              <img
                src={categoryImages.shirt}
                alt="Men's shirts"
                className="aspect-square h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              />
            </Link>
            <Link
              to="/women/clothing/saree"
              className="animate-fade-up group relative col-span-5 overflow-hidden rounded-3xl bg-neutral-100"
              style={{ animationDelay: "320ms" }}
            >
              <img
                src={categoryImages.saree}
                alt="Sarees and lehengas"
                className="aspect-square h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              />
            </Link>
          </div>

          <div
            className="animate-fade-up absolute -bottom-4 left-2 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-lift backdrop-blur sm:left-0"
            style={{ animationDelay: "480ms" }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600">
              <TruckIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Free delivery</p>
              <p className="text-xs text-neutral-500">on orders over ₹500</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
