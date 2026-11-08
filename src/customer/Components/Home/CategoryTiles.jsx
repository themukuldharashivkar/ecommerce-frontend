import { Link } from "react-router-dom";
import { navigation, categoryImages } from "../../../config/navigationMenu";
import Reveal from "../ui/Reveal";

const tiles = navigation.categories.flatMap((c) =>
  c.sections.flatMap((s) =>
    s.items.map((i) => ({ ...i, path: `/${c.id}/${s.id}/${i.id}`, group: c.name }))
  )
);

export default function CategoryTiles() {
  return (
    <section className="py-10 lg:py-14">
      <div className="container-x">
        <Reveal className="mb-7">
          <p className="eyebrow mb-2">Browse</p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Shop by category</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {tiles.map((t, i) => (
            <Reveal key={t.path} delay={(i % 5) * 60}>
              <Link
                to={t.path}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <img
                  src={categoryImages[t.id]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">{t.group}</p>
                  <p className="text-base font-semibold text-white">{t.name}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
