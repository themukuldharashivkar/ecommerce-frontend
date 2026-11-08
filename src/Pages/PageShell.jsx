export default function PageShell({ eyebrow, title, intro, children }) {
  return (
    <div className="container-x pb-10 pt-10 lg:pt-16">
      <div className="mx-auto max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 text-lg leading-relaxed text-neutral-600">{intro}</p>}
        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-neutral-700">{children}</div>
      </div>
    </div>
  );
}

export const Block = ({ title, children }) => (
  <section>
    <h2 className="mb-2 text-lg font-semibold text-ink">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);
