import React from "react";
import PageShell, { Block } from "./PageShell";

const PrivacyPolicy = () => (
  <PageShell eyebrow="Legal" title="Privacy policy" intro="A short, plain-language summary of how this demo store handles your data.">
    <Block title="What we collect">
      <p>When you create an account we store your name and email, and a securely hashed password. When you order we store your delivery address and order details.</p>
    </Block>
    <Block title="How we use it">
      <p>Only to run your account, process orders and show your order history. We don’t sell your data.</p>
    </Block>
    <Block title="Payments">
      <p>Payments are handled by Razorpay. Card and bank details are entered on Razorpay’s pages and never reach our servers.</p>
    </Block>
    <Block title="Demo notice">
      <p>This is a portfolio demo. Please don’t enter sensitive personal information.</p>
    </Block>
  </PageShell>
);

export default PrivacyPolicy;
