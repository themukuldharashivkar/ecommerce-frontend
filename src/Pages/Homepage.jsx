import React from "react";
import { Link } from "react-router-dom";
import { ArrowLongRightIcon, ArrowPathIcon, LockClosedIcon, TruckIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Hero from "../customer/Components/Home/Hero";
import CategoryTiles from "../customer/Components/Home/CategoryTiles";
import ProductRail from "../customer/Components/Home/ProductRail";
import Reveal from "../customer/Components/ui/Reveal";
import { categoryImages } from "../config/navigationMenu";
import { dressPage1 } from "../Data/dress/page1";
import { sareePage1 } from "../Data/Saree/page1";
import { mens_kurta } from "../Data/Men/men_kurta";
import { mensShoesPage1 } from "../Data/shoes";
import { kurtaPage1 } from "../Data/Kurta/kurta";

const perks = [
  { icon: TruckIcon, title: "Free delivery", text: "On every order over ₹500" },
  { icon: ArrowPathIcon, title: "Easy returns", text: "7-day hassle-free returns" },
  { icon: LockClosedIcon, title: "Secure checkout", text: "Protected by Razorpay" },
  { icon: SparklesIcon, title: "Quality checked", text: "Every piece inspected" },
];

const Homepage = () => {
  return (
    <div>
      <Hero />

      <section className="border-y border-neutral-200 bg-white">
        <div className="container-x grid grid-cols-2 gap-x-6 gap-y-6 py-7 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neutral-100 text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="text-xs text-neutral-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryTiles />

      <ProductRail
        eyebrow="Women"
        title="Dresses we love"
        category="women_dress"
        path="/women/clothing/women_dress"
        fallback={dressPage1}
      />

      {/* promo banner */}
      <section className="py-6">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl"
            />
            <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
              <div>
                <p className="eyebrow !text-brand-200">Limited time</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                  Up to <span className="font-display font-normal italic text-brand-200">70% off</span>
                  <br />
                  on festive dresses
                </h2>
                <p className="mt-4 max-w-sm text-neutral-400">Big savings on bestsellers while stocks last.</p>
                <Link
                  to="/women/clothing/women_dress?disccout=60"
                  className="btn mt-8 bg-white text-ink hover:bg-brand-100"
                >
                  Shop the sale
                  <ArrowLongRightIcon className="h-5 w-5" />
                </Link>
              </div>
              <div className="hidden justify-end gap-4 lg:flex">
                <img
                  src={categoryImages.women_dress}
                  alt=""
                  className="h-64 w-48 -rotate-3 rounded-2xl object-cover object-top shadow-lift"
                />
                <img
                  src={categoryImages.gouns}
                  alt=""
                  className="mt-8 h-64 w-48 rotate-3 rounded-2xl object-cover object-top shadow-lift"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ProductRail
        eyebrow="Women"
        title="Sarees & lehengas"
        category="saree"
        path="/women/clothing/saree"
        fallback={sareePage1}
      />
      <ProductRail
        eyebrow="Men"
        title="Kurtas for every occasion"
        category="mens_kurta"
        path="/men/clothing/mens_kurta"
        fallback={mens_kurta}
      />
      <ProductRail
        eyebrow="Men"
        title="Step into comfort"
        category="shoes"
        path="/men/footwear/shoes"
        fallback={mensShoesPage1}
      />
      <ProductRail
        eyebrow="Women"
        title="Kurtas & sets"
        category="kurtas"
        path="/women/clothing/kurtas"
        fallback={kurtaPage1}
      />

      <div className="h-10" />
    </div>
  );
};

export default Homepage;
