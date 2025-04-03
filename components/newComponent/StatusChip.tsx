import React from "react";
import { Chip } from "@mui/material";

const StatusChip = ({ label }: { label: string }) => {
  switch (label) {
    case "WAITING_PAYMENT":
      return <Chip size="small" color="warning" label="Waiting Payment" />;
    case "POSTED":
      return <Chip size="small" color="info" label="Payment on Process" />;
    case "DONE":
      return <Chip size="small" color="success" label="Payed" />;
  }
};

export default StatusChip;
