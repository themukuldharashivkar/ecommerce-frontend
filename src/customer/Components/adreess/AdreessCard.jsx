import React from "react";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

const AddressCard = ({ address }) => {
  if (!address) return null;
  return (
    <div className="flex gap-3.5">
      <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
      <div className="min-w-0 text-sm leading-relaxed text-neutral-600">
        <p className="font-semibold text-ink">{`${address.firstName} ${address.lastName}`}</p>
        <p>{`${address.streetAddress}, ${address.city}, ${address.state} ${address.zipCode}`}</p>
        <p className="mt-1.5 flex items-center gap-1.5">
          <PhoneIcon className="h-4 w-4 text-neutral-400" />
          {address.mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
