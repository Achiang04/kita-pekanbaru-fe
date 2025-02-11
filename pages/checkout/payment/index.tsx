import React from "react";
import PaymentMethodForm from "../../../components/checkoutComponents/PaymentMethodForm";
import { paymentDataDummy } from "../../../dummy/data";
import { ICheckoutPaymentPageData } from "../../../@types/payment";
import CheckoutLayout from "../../../layouts/CheckoutLayout";

export default function CheckoutPaymentPage() {
  const paymentData: ICheckoutPaymentPageData = paymentDataDummy;

  return (
    <CheckoutLayout>
      <PaymentMethodForm paymentPage={paymentData} />
    </CheckoutLayout>
  );
}
