import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { colorOptions, sizeOptions, singleFilter } from "./FilterData";

const cx = (...c) => c.filter(Boolean).join(" ");

function Section({ title, defaultOpen = true, children }) {
  return (
    <Disclosure as="div" defaultOpen={defaultOpen} className="border-b border-neutral-200 py-5 first:pt-0 last:border-0">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between text-left text-sm font-semibold text-ink">
            {title}
            <ChevronDownIcon className={cx("h-4 w-4 text-neutral-500 transition-transform", open && "rotate-180")} />
          </Disclosure.Button>
          <Disclosure.Panel className="pt-4">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// Fully controlled by the URL: `selected(id)` returns an array, handlers push changes back to the URL.
export default function FilterPanel({ selected, onToggle, onSingle }) {
  return (
    <div>
      <Section title="Colour">
        <div className="flex flex-wrap gap-2.5">
          {colorOptions.map((c) => {
            const on = selected("color").includes(c.value);
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onToggle("color", c.value)}
                title={c.label}
                aria-label={c.label}
                aria-pressed={on}
                className={cx(
                  "relative grid h-9 w-9 place-items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                  on ? "border-ink ring-2 ring-ink ring-offset-2" : "border-neutral-300 hover:scale-110"
                )}
                style={{ backgroundColor: c.hex }}
              >
                {on && (
                  <CheckIcon
                    className={cx("h-4 w-4", ["white", "yellow", "beige"].includes(c.value) ? "text-ink" : "text-white")}
                    strokeWidth={3}
                  />
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => {
            const on = selected("size").includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => onToggle("size", s)}
                aria-pressed={on}
                className={cx("chip !h-9 !min-w-[3rem]", on && "chip-active")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      {singleFilter.map((section) => (
        <Section key={section.id} title={section.name} defaultOpen={section.id !== "stock" ? true : true}>
          <div className="space-y-1">
            {section.options.map((o) => {
              const on = selected(section.id)[0] === o.value;
              return (
                <label
                  key={o.value}
                  className={cx(
                    "flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-neutral-100",
                    on ? "font-semibold text-ink" : "text-neutral-600"
                  )}
                >
                  <input
                    type="radio"
                    name={section.id}
                    checked={on}
                    onChange={() => {}}
                    onClick={() => onSingle(section.id, on ? null : o.value)}
                    className="peer sr-only"
                  />
                  <span
                    className={cx(
                      "grid h-[18px] w-[18px] place-items-center rounded-full border transition peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2",
                      on ? "border-ink bg-ink" : "border-neutral-300 bg-white"
                    )}
                  >
                    {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  {o.label}
                </label>
              );
            })}
          </div>
        </Section>
      ))}
    </div>
  );
}
