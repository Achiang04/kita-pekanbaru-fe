import React from "react";
import CheckoutLayout from "../../../layouts/CheckoutLayout";
import CheckoutContactInformationForm from "../../../components/checkoutComponents/CheckoutContactInformationForm";

export default function CheckoutInfoPage() {
  return (
    <CheckoutLayout>
      <CheckoutContactInformationForm />
    </CheckoutLayout>
  );
}
