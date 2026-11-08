import React from "react";
import PageShell, { Block } from "./PageShell";

const TearmsCondition = () => (
  <PageShell eyebrow="Legal" title="Terms & conditions" intro="The simple rules for using this demo storefront.">
    <Block title="Orders & pricing">
      <p>Prices are shown in Indian rupees and include applicable taxes. Delivery is free on orders over ₹500.</p>
    </Block>
    <Block title="Returns">
      <p>You can return eligible items within 7 days of delivery for a refund to your original payment method.</p>
    </Block>
    <Block title="Your account">
      <p>Keep your login details private and let us know right away if you suspect unauthorised use.</p>
    </Block>
    <Block title="Demo notice">
      <p>Bazaarly is a portfolio project. Products shown may not be available for real purchase.</p>
    </Block>
  </PageShell>
);

export default TearmsCondition;
