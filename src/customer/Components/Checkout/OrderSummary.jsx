import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Cart/CartItem";
import PriceSummary from "../Cart/PriceSummary";
import AddressCard from "../adreess/AdreessCard";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import { createPayment } from "../../../Redux/Customers/Payment/Action";

const OrderSummary = () => {
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("order_id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state);
  const [paying, setPaying] = React.useState(false);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  const handleCreatePayment = async () => {
    setPaying(true);
    await dispatch(createPayment({ orderId: order.order?.id, jwt }));
    setPaying(false); // only reached if the redirect to Razorpay did not happen
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_24rem] xl:gap-12">
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-soft sm:p-6">
          <h2 className="mb-4 text-base font-semibold text-ink">Delivering to</h2>
          <AddressCard address={order.order?.shippingAddress} />
        </div>
        <div className="space-y-4">
          {order.order?.orderItems.map((item) => (
            <CartItem key={item.id} item={item} showButton={false} />
          ))}
        </div>
      </div>
      <div className="lg:sticky lg:top-28">
        <PriceSummary data={order.order}>
          <button type="button" onClick={handleCreatePayment} disabled={!order.order || paying} className="btn-primary mt-6 w-full">
            {paying ? "Redirecting to payment…" : "Pay securely"}
          </button>
          <p className="mt-3 text-center text-xs text-neutral-500">You’ll be taken to Razorpay to complete payment.</p>
        </PriceSummary>
      </div>
    </div>
  );
};

export default OrderSummary;
