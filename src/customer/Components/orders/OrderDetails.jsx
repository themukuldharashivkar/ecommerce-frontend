import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/outline";
import OrderTraker from "./OrderTraker";
import AddressCard from "../adreess/AdreessCard";
import PriceSummary from "../Cart/PriceSummary";
import { statusStyle } from "./OrderCard";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import { inr } from "../ui/format";

const stepFor = { PLACED: 1, CONFIRMED: 2, SHIPPED: 3, DELIVERED: 5 };

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);
  const o = order.order;
  const status = o?.orderStatus || "PENDING";

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  return (
    <div className="container-x pb-20 pt-8 lg:pt-12">
      <Link to="/account/order" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-ink">
        <ArrowLeftIcon className="h-4 w-4" /> All orders
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Order #{o?.id ?? orderId}</h1>
        {o && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[status] || statusStyle.PENDING}`}>
            {status.toLowerCase()}
          </span>
        )}
      </div>

      <div className="mt-8 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-soft sm:p-8">
        <OrderTraker activeStep={stepFor[status] ?? 1} />
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_24rem] xl:gap-12">
        <div className="space-y-4">
          {o?.orderItems.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-soft sm:gap-6 sm:p-5">
              <Link to={`/product/${item.product.id}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                <img className="h-full w-full object-cover object-top" src={item.product.imageUrl} alt="" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{item.product.brand}</p>
                <p className="mt-0.5 line-clamp-2 text-sm font-medium text-ink">{item.product.title}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Size {item.size}
                  {item.product.color && <> · <span className="capitalize">{item.product.color}</span></>} · Qty {item.quantity}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">{inr(item.discountedPrice ?? item.price)}</p>
                <Link
                  to={`/account/rate/${item.product.id}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                >
                  <StarIcon className="h-4 w-4" /> Rate & review
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-soft">
            <h2 className="mb-4 text-base font-semibold text-ink">Delivery address</h2>
            <AddressCard address={o?.shippingAddress} />
          </div>
          <PriceSummary data={o} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
