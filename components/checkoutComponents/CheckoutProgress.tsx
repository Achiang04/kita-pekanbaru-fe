import { Step, StepButton, Stepper } from "@mui/material";
import { TCheckoutStep } from "boundless-api-client";
import React, { useMemo } from "react";
import { getPathByStep, getStepByPath } from "../../utils/routeUtils";
import { ICheckoutStepper } from "../../@types/checkout";
import { stepperDummy } from "../../dummy/data";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function CheckoutProgress() {
  // TODO: Make functionality working without dummy data
  const stepper: ICheckoutStepper = stepperDummy;
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = getStepByPath(pathname)
    ? stepper?.steps.indexOf(getStepByPath(pathname)!)
    : 0;

  const handleStepChange = (step: TCheckoutStep) => {
    const url = getPathByStep(step);
    if (url) router.push(`/newcheckout${url}`);
  };

  const checkoutStepTitles = useMemo(() => {
    return {
      [TCheckoutStep.contactInfo]: "Contact Info",
      [TCheckoutStep.shippingAddress]: "Delivery Method",
      [TCheckoutStep.shippingMethod]: "Delivery Method",
      [TCheckoutStep.paymentMethod]: "Payment Method",
      [TCheckoutStep.thankYou]: "Thank you for your order!",
    };
  }, []);

  if (!stepper) return null;

  return (
    <div className="bdl-checkout-progress">
      <Stepper activeStep={currentStep} alternativeLabel>
        {stepper.steps.map((step) => (
          <Step key={step}>
            <StepButton
              color="inherit"
              onClick={handleStepChange.bind(null, step)}
            >
              {checkoutStepTitles[step]}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
