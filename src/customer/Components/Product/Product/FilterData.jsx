// Colours present in the catalogue. `value` is matched case-insensitively by the API.
export const colorOptions = [
  { value: "white", label: "White", hex: "#FFFFFF" },
  { value: "black", label: "Black", hex: "#111111" },
  { value: "gray", label: "Gray", hex: "#9CA3AF" },
  { value: "blue", label: "Blue", hex: "#3B82F6" },
  { value: "red", label: "Red", hex: "#E5484D" },
  { value: "maroon", label: "Maroon", hex: "#7F1D1D" },
  { value: "pink", label: "Pink", hex: "#F472B6" },
  { value: "purple", label: "Purple", hex: "#8B5CF6" },
  { value: "green", label: "Green", hex: "#22C55E" },
  { value: "yellow", label: "Yellow", hex: "#FACC15" },
  { value: "beige", label: "Beige", hex: "#E7D8BF" },
];

export const sizeOptions = ["S", "M", "L"];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-499", label: "Under ₹500" },
      { value: "500-999", label: "₹500 – ₹999" },
      { value: "1000-1999", label: "₹1,000 – ₹1,999" },
      { value: "2000-4999", label: "₹2,000 – ₹4,999" },
      { value: "5000-100000", label: "₹5,000 & above" },
    ],
  },
  {
    id: "disccout",
    name: "Discount",
    options: [10, 20, 30, 40, 50, 60, 70].map((n) => ({ value: String(n), label: `${n}% and above` })),
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In stock" },
      { value: "out_of_stock", label: "Out of stock" },
    ],
  },
];

export const sortOptions = [
  { name: "Featured", query: "featured" },
  { name: "Price: Low to High", query: "price_low" },
  { name: "Price: High to Low", query: "price_high" },
];
