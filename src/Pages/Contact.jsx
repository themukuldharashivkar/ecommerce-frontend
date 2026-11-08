import React from "react";
import { EnvelopeIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import PageShell from "./PageShell";

const items = [
  { icon: EnvelopeIcon, title: "Email", text: "dharashivkarmukul@gmail.com", href: "mailto:dharashivkarmukul@gmail.com" },
  { icon: ClockIcon, title: "Support hours", text: "Mon – Sat, 10am – 6pm IST" },
  { icon: MapPinIcon, title: "Based in", text: "India" },
];

const Contact = () => (
  <PageShell eyebrow="Contact" title="We’d love to hear from you." intro="Questions about an order, a product or this project? Drop a line and we’ll get back to you.">
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map(({ icon: Icon, title, text, href }) => (
        <div key={title} className="card p-6">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600">
            <Icon className="h-5 w-5" />
          </span>
          <p className="mt-4 text-sm font-semibold text-ink">{title}</p>
          {href ? (
            <a href={href} className="mt-1 block break-words text-sm text-neutral-600 underline-offset-4 hover:text-ink hover:underline">
              {text}
            </a>
          ) : (
            <p className="mt-1 text-sm text-neutral-600">{text}</p>
          )}
        </div>
      ))}
    </div>
  </PageShell>
);

export default Contact;
