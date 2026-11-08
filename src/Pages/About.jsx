import React from "react";
import { Link } from "react-router-dom";
import PageShell, { Block } from "./PageShell";

const About = () => (
  <PageShell
    eyebrow="About"
    title="Fashion that feels like you."
    intro="Bazaarly is a modern fashion storefront for everyday wear — from dresses and sarees to denim, kurtas and shoes."
  >
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        ["500+", "styles across women’s and men’s fashion"],
        ["7 days", "easy returns on every order"],
        ["₹500+", "orders ship free, always"],
      ].map(([a, b]) => (
        <div key={a} className="card p-6">
          <p className="text-3xl font-semibold tracking-tight text-ink">{a}</p>
          <p className="mt-1 text-sm text-neutral-600">{b}</p>
        </div>
      ))}
    </div>
    <Block title="What we believe">
      <p>Good style shouldn’t be complicated or expensive. We pick pieces that are comfortable, versatile and fairly priced — and we make buying them effortless.</p>
    </Block>
    <Block title="About this demo">
      <p>
        This storefront is a full-stack portfolio project built with React, Redux and Tailwind on the front end, and Spring Boot with MySQL on the
        back end — including authentication, cart, checkout and Razorpay payments.
      </p>
    </Block>
    <Link to="/" className="btn-primary">
      Start shopping
    </Link>
  </PageShell>
);

export default About;
