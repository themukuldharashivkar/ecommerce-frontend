import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { createRating, createReview } from "../../../Redux/Customers/Review/Action";
import { findProductById } from "../../../Redux/Customers/Product/Action";
import { inr } from "../ui/format";

const labels = ["Poor", "Fair", "Good", "Very good", "Excellent"];

const RateProduct = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = customersProduct.product;

  useEffect(() => {
    dispatch(findProductById({ productId }));
  }, [productId, dispatch]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const text = [formData.title.trim(), formData.description.trim()].filter(Boolean).join(" — ");
    if (rating > 0) await dispatch(createRating({ productId, rating }));
    if (text) await dispatch(createReview({ review: text, productId }));
    navigate(`/product/${productId}`);
  };

  const shown = hover || rating;

  return (
    <div className="container-x pb-20 pt-8 lg:pt-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Rate & review</h1>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[22rem_1fr] xl:gap-12">
        {product && (
          <Link
            to={`/product/${productId}`}
            className="flex gap-4 rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-soft lg:flex-col"
          >
            <img
              className="h-28 w-24 rounded-2xl bg-neutral-100 object-cover object-top lg:aspect-[4/5] lg:h-auto lg:w-full"
              src={product.imageUrl}
              alt=""
            />
            <div className="min-w-0 lg:px-1 lg:pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{product.brand}</p>
              <p className="mt-1 line-clamp-2 text-sm font-medium text-ink">{product.title}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{inr(product.discountedPrice)}</p>
            </div>
          </Link>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-soft sm:p-8">
          <fieldset>
            <legend className="text-sm font-semibold text-ink">Your rating</legend>
            <div className="mt-3 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  aria-pressed={rating === n}
                  className="rounded-md p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {n <= shown ? <StarIcon className="h-9 w-9 text-amber-500" /> : <StarOutline className="h-9 w-9 text-neutral-300" />}
                </button>
              ))}
              <span className="ml-3 w-24 text-sm text-neutral-500">{shown ? labels[shown - 1] : ""}</span>
            </div>
          </fieldset>

          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
              Headline
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Sum it up in a few words"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
              Your review
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="What did you like or dislike? How was the fit and quality?"
              className="field"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || (rating === 0 && !formData.title.trim() && !formData.description.trim())}
            className="btn-primary"
          >
            {submitting ? "Submitting…" : "Submit review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateProduct;
