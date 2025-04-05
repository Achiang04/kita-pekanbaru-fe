import React, { useState } from "react";
import { Button } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

export default function PayButton({ url }: { url: string }) {
  const handlePayClick = () => {
    window.open(url, "_blank");
  };

  return (
    <p className="bdl-order-summary__pay-now">
      <Button
        color="primary"
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
