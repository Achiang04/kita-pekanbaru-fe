import React from "react";
import CheckoutLayout from "../../../layouts/CheckoutLayout";
import CheckoutShippingForm from "../../../components/checkoutComponents/CheckoutShippingForm";
import { checkoutShippingDummy } from "../../../dummy/data";
import { ICheckoutShippingPageData } from "../../../@types/delivery";
import ProtectedLayout from "../../../layouts/ProtectedLayout";

export default function ShippingAddressPage() {
  // TODO: Integrate with real data
  const shippingPage: ICheckoutShippingPageData = checkoutShippingDummy;
  return (
    <ProtectedLayout>
      <CheckoutLayout>
        <CheckoutShippingForm />
      </CheckoutLayout>
    </ProtectedLayout>
  );
}
