import { BRAND } from "../../../config/brand";

// "Bazaar" in sans + "ly" in italic serif accent. `tone` switches accent colour for dark backgrounds.
export default function Wordmark({ tone = "light", className = "" }) {
  return (
    <span className={className}>
      {BRAND.lead}
      <span className={`font-display font-normal italic ${tone === "dark" ? "text-brand-200" : "text-brand-600"}`}>
        {BRAND.accent}
      </span>
    </span>
  );
}
