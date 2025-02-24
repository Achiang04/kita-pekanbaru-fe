import React from "react";
import CheckoutLayout from "../../../layouts/CheckoutLayout";
import CheckoutContactInformationForm from "../../../components/checkoutComponents/CheckoutContactInformationForm";
import ProtectedLayout from "../../../layouts/ProtectedLayout";

export default function CheckoutInfoPage() {
  return (
    <ProtectedLayout>
      <CheckoutLayout>
        <CheckoutContactInformationForm />
      </CheckoutLayout>
    </ProtectedLayout>
  );
}
