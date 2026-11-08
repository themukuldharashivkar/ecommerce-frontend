export const inr = (n) =>
  typeof n === "number" || (typeof n === "string" && n !== "")
    ? `₹${Number(n).toLocaleString("en-IN")}`
    : "";

export const avgRating = (ratings = []) =>
  ratings.length ? ratings.reduce((s, r) => s + (r.rating || 0), 0) / ratings.length : 0;

export const initials = (user) =>
  `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase() || "U";
