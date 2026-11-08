import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import OrderCard from "./OrderCard";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";

const orderStatus = [
  { label: "Placed", value: "PLACED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (jwt) dispatch(getOrderHistory({ jwt }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  const toggle = (v) => setFilters((f) => (f.includes(v) ? f.filter((x) => x !== v) : [...f, v]));
  const orders = (order.orders || []).filter((o) => filters.length === 0 || filters.includes(o.orderStatus));
  const rows = orders.flatMap((o) => (o.orderItems || []).map((item) => ({ item, o })));

  return (
    <div className="container-x pb-20 pt-8 lg:pt-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">My orders</h1>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[16rem_1fr] xl:gap-12">
        <aside className="lg:sticky lg:top-28">
          <p className="eyebrow mb-3">Order status</p>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {orderStatus.map((o) => {
              const on = filters.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(o.value)}
                  className={`chip !h-10 lg:!justify-start lg:!rounded-xl lg:!border-transparent lg:!bg-transparent lg:hover:!bg-neutral-100 ${
                    on ? "chip-active lg:!bg-ink lg:hover:!bg-ink" : ""
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-4">
          {rows.length > 0 ? (
            rows.map(({ item, o }) => <OrderCard key={`${o.id}-${item.id}`} item={item} order={o} />)
          ) : (
            <div className="grid place-items-center rounded-[2rem] border border-dashed border-neutral-300 bg-white px-6 py-24 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-neutral-100">
                <ClipboardDocumentListIcon className="h-7 w-7 text-neutral-500" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-ink">{filters.length ? "No matching orders" : "No orders yet"}</h2>
              <p className="mt-1.5 max-w-xs text-sm text-neutral-500">
                {filters.length ? "Try clearing the status filter." : "When you place an order, it will show up here."}
              </p>
              {!filters.length && (
                <Link to="/" className="btn-primary mt-7">
                  Start shopping
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
