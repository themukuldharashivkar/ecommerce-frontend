import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/24/solid";
import { updatePayment } from "../../../Redux/Customers/Payment/Action";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../adreess/AdreessCard";
import { inr } from "../ui/format";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      dispatch(updatePayment({ orderId, paymentId, jwt }));
      dispatch(getOrderById(orderId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, paymentId]);

  return (
    <div className="container-x pb-20 pt-10 lg:pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto grid h-16 w-16 animate-fade-up place-items-center rounded-full bg-success text-white shadow-lift">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Thank you — order placed!</h1>
        <p className="mt-2 text-neutral-600">We’ve received your payment and we’re getting your order ready.</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-soft sm:p-8">
        <OrderTraker activeStep={1} />
      </div>

      <div className="mx-auto mt-6 grid max-w-3xl gap-6 md:grid-cols-[1fr_16rem]">
        <div className="space-y-4">
          {order.order?.orderItems.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-soft">
              <img className="h-24 w-20 rounded-2xl bg-neutral-100 object-cover object-top" src={item.product.imageUrl} alt="" />
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-medium text-ink">{item.product.title}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Size {item.size} · Qty {item.quantity}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">{inr(item.discountedPrice ?? item.price)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-fit rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-soft">
          <p className="eyebrow mb-3">Delivering to</p>
          <AddressCard address={order.order?.shippingAddress} />
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-3">
        <Link to={`/account/order/${orderId}`} className="btn-primary">
          View order
        </Link>
        <Link to="/" className="btn-secondary">
          Keep shopping
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
