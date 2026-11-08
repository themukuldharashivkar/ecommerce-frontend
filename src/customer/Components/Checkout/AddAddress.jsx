import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";

const Field = ({ label, name, className = "", ...rest }) => (
  <div className={className}>
    <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
      {label}
    </label>
    <input id={name} name={name} required className="field" {...rest} />
  </div>
);

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const addresses = auth.user?.addresses || [];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };
    dispatch(createOrder({ address, jwt, navigate }));
    handleNext();
  };

  const handleCreateOrder = (item) => {
    dispatch(createOrder({ address: item, jwt, navigate }));
    handleNext();
  };

  return (
    <div className={`grid items-start gap-8 ${addresses.length ? "lg:grid-cols-[22rem_1fr] xl:gap-12" : "mx-auto max-w-2xl"}`}>
      {addresses.length > 0 && (
        <section aria-labelledby="saved-addresses">
          <h2 id="saved-addresses" className="mb-4 text-base font-semibold text-ink">
            Saved addresses
          </h2>
          <div className="space-y-3" role="radiogroup" aria-label="Saved addresses">
            {addresses.map((item) => {
              const on = selectedAddress?.id === item.id;
              return (
                <div
                  key={item.id}
                  role="radio"
                  aria-checked={on}
                  tabIndex={0}
                  onClick={() => setSelectedAddress(item)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelectedAddress(item))}
                  className={`cursor-pointer rounded-2xl border bg-white p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    on ? "border-ink shadow-soft ring-1 ring-ink" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <AddressCard address={item} />
                  {on && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateOrder(item);
                      }}
                      className="btn-primary btn-sm mt-4 w-full"
                    >
                      Deliver to this address
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section aria-labelledby="new-address" className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-soft sm:p-8">
        <h2 id="new-address" className="mb-6 text-base font-semibold text-ink">
          {addresses.length ? "Add a new address" : "Delivery address"}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" name="firstName" autoComplete="given-name" />
          <Field label="Last name" name="lastName" autoComplete="family-name" />
          <div className="sm:col-span-2">
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink">
              Address
            </label>
            <textarea id="address" name="address" required rows={3} autoComplete="street-address" className="field" />
          </div>
          <Field label="City" name="city" autoComplete="address-level2" />
          <Field label="State" name="state" autoComplete="address-level1" />
          <Field label="PIN code" name="zip" autoComplete="postal-code" inputMode="numeric" />
          <Field label="Phone number" name="phoneNumber" type="tel" autoComplete="tel" />
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Deliver to this address
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
