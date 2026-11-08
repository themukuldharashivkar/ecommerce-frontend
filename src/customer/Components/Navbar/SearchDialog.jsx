import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { inr } from "../ui/format";
import { navigation } from "../../../config/navigationMenu";

const quickLinks = navigation.categories.flatMap((c) =>
  c.sections.flatMap((s) => s.items.slice(0, 3).map((i) => ({ label: i.name, group: c.name, path: `/${c.id}/${s.id}/${i.id}` })))
);

export default function SearchDialog({ open, onClose }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setQ("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    let cancelled = false;
    const t = setTimeout(() => {
      api
        .get("/api/products/search", { params: { q: term } })
        .then(({ data }) => !cancelled && setResults(data.slice(0, 8)))
        .catch(() => !cancelled && setResults([]))
        .finally(() => !cancelled && setLoading(false));
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);

  const go = (path) => {
    onClose();
    navigate(path);
  };

  const hasQuery = q.trim().length >= 2;

  return (
    <Transition.Root show={open} as={Fragment} afterEnter={() => inputRef.current?.focus()}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose} initialFocus={inputRef}>
        <Transition.Child
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4 pt-[8vh] sm:p-6 sm:pt-[12vh]">
          <Transition.Child
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95 -translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-black/5">
              <div className="flex items-center gap-3 border-b border-neutral-200 px-5">
                <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search dresses, shirts, brands…"
                  aria-label="Search products"
                  className="h-16 flex-1 bg-transparent text-base text-ink placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-3">
                {!hasQuery && (
                  <div className="p-2">
                    <p className="eyebrow mb-3">Popular</p>
                    <div className="flex flex-wrap gap-2">
                      {quickLinks.map((l) => (
                        <button key={l.path} type="button" onClick={() => go(l.path)} className="chip">
                          {l.group}’s {l.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {hasQuery && loading && (
                  <div className="space-y-3 p-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="skeleton h-16 w-14" />
                        <div className="flex-1 space-y-2">
                          <div className="skeleton h-3 w-1/4" />
                          <div className="skeleton h-4 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {hasQuery && !loading && results.length === 0 && (
                  <p className="p-8 text-center text-sm text-neutral-500">
                    No results for “{q.trim()}”. Try a different word.
                  </p>
                )}

                {hasQuery && !loading && results.length > 0 && (
                  <ul>
                    {results.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => go(`/product/${p.id}`)}
                          className="flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition hover:bg-neutral-50"
                        >
                          <img src={p.imageUrl} alt="" className="h-16 w-14 rounded-lg bg-neutral-100 object-cover object-top" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                              {p.brand}
                            </p>
                            <p className="truncate text-sm font-medium text-ink">{p.title}</p>
                          </div>
                          <p className="text-sm font-semibold text-ink">{inr(p.discountedPrice)}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
