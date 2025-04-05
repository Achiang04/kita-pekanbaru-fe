import React from "react";
import PaymentMethodForm from "../../../components/checkoutComponents/PaymentMethodForm";
import { paymentDataDummy } from "../../../dummy/data";
import { ICheckoutPaymentPageData } from "../../../@types/payment";
import CheckoutLayout from "../../../layouts/CheckoutLayout";
import ProtectedLayout from "../../../layouts/ProtectedLayout";

export default function CheckoutPaymentPage() {
  const paymentData: ICheckoutPaymentPageData = paymentDataDummy;

  return null;

  return (
    <ProtectedLayout>
      <CheckoutLayout>
        <PaymentMethodForm paymentPage={paymentData} />
      </CheckoutLayout>
    </ProtectedLayout>
  );
}
