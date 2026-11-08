import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { navigation } from "../../../config/navigationMenu";
import Wordmark from "../ui/Wordmark";
import { BRAND } from "../../../config/brand";

const shop = navigation.categories.flatMap((c) =>
  c.sections.flatMap((s) => s.items.map((i) => ({ label: `${c.name}’s ${i.name}`, to: `/${c.id}/${s.id}/${i.id}` })))
);

const cols = [
  { title: "Shop", links: shop.slice(0, 6) },
  { title: "More styles", links: shop.slice(6) },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "My orders", to: "/account/order" },
      { label: "Shopping bag", to: "/cart" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privaciy-policy" },
      { label: "Terms & conditions", to: "/terms-condition" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-24 bg-ink text-neutral-400">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-ink">
                <ShoppingBagIcon className="h-5 w-5" />
              </span>
              <Wordmark tone="dark" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Modern everyday fashion at honest prices. Free delivery over ₹500 and 7-day easy returns.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">{c.title}</p>
                <ul className="mt-5 space-y-3 text-sm">
                  {c.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>
            Designed & built by <span className="text-neutral-200">Mukul Dharashivkar</span> · Demo storefront
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
