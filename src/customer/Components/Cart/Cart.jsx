import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import PriceSummary from "./PriceSummary";
import { getCart } from "../../../Redux/Customers/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector((store) => store);
  const items = (cart.cartItems || []).filter(Boolean);

  useEffect(() => {
    if (jwt) dispatch(getCart(jwt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  return (
    <div className="container-x pb-20 pt-8 lg:pt-12">
      <div className="mb-8 flex items-baseline gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Your bag</h1>
        {items.length > 0 && <span className="text-sm text-neutral-500">{items.length} {items.length === 1 ? "item" : "items"}</span>}
      </div>

      {items.length > 0 ? (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_24rem] xl:gap-12">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} showButton={true} />
            ))}
            <Link to="/" className="inline-block pt-2 text-sm font-semibold text-ink underline underline-offset-4 hover:text-brand-600">
              ← Continue shopping
            </Link>
          </div>
          <div className="lg:sticky lg:top-28">
            <PriceSummary data={cart.cart}>
              <button type="button" onClick={() => navigate("/checkout?step=2")} className="btn-primary mt-6 w-full">
                Checkout
              </button>
              <p className="mt-3 text-center text-xs text-neutral-500">Taxes included. Delivery is free.</p>
            </PriceSummary>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center rounded-[2rem] border border-dashed border-neutral-300 bg-white px-6 py-24 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-neutral-100">
            <ShoppingBagIcon className="h-7 w-7 text-neutral-500" />
          </span>
          <h2 className="mt-5 text-xl font-semibold text-ink">{jwt ? "Your bag is empty" : "Sign in to see your bag"}</h2>
          <p className="mt-1.5 max-w-xs text-sm text-neutral-500">
            {jwt ? "Looks like you haven’t added anything yet. Let’s fix that." : "Your saved items will be waiting for you."}
          </p>
          {jwt ? (
            <Link to="/" className="btn-primary mt-7">
              Start shopping
            </Link>
          ) : (
            <Link to="/login" className="btn-primary mt-7">
              Sign in
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
