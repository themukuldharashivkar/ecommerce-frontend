import { useEffect, useState } from "react";
import api from "../../../config/api";

const num = (v) => parseInt(String(v ?? "0").replace(/[^0-9]/g, ""), 10) || 0;

// Normalises the legacy static demo data so it can be rendered by <ProductCard>.
export const normaliseStatic = (item) => ({
  title: item.title,
  brand: item.brand,
  imageUrl: item.imageUrl || item.image,
  color: item.color,
  price: num(item.price),
  discountedPrice: num(item.discountedPrice ?? item.selling_price),
  discountPersent: num(item.discountPersent ?? item.disscount),
});

// Loads a handful of live products for a category; falls back to bundled demo data if the API is unreachable.
export default function useCategoryProducts(category, { size = 10, fallback = [] } = {}) {
  const [state, setState] = useState({ items: [], loading: true, live: false });

  useEffect(() => {
    let cancelled = false;
    api
      .get("/api/products", {
        params: {
          category,
          color: "",
          size: "",
          minPrice: 0,
          maxPrice: 100000,
          minDiscount: 0,
          sort: "featured",
          stock: "",
          pageNumber: 0,
          pageSize: size,
        },
      })
      .then(({ data }) => {
        if (cancelled) return;
        const items = data?.content || [];
        if (items.length) setState({ items, loading: false, live: true });
        else throw new Error("empty");
      })
      .catch(() => {
        if (cancelled) return;
        setState({ items: fallback.slice(0, size).map(normaliseStatic), loading: false, live: false });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, size]);

  return state;
}
