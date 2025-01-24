import React, { useState } from "react";
import { Button } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

export default function PayButton({
  orderId,
  onError,
}: {
  orderId: string;
  onError?: (err: any) => void;
}) {
  // const api = useAppSelector((state) => state.app.api);
  const [submitting, setSubmitting] = useState(false);

  const handlePayClick = () => {
    // TODO: Integrate pay order

    setSubmitting(true);

    setSubmitting(false);
  };

  return (
    <p className="bdl-order-summary__pay-now">
      <Button
        color="primary"
        disabled={submitting}
        onClick={handlePayClick}
        size="large"
        startIcon={<PaymentIcon />}
        variant="contained"
      >
        Pay now
      </Button>
    </p>
  );
}
