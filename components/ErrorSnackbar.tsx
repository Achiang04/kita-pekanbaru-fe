import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface Props {
  error: {
    status: boolean;
    message: string;
  };
  onClose: () => void;
}

const ErrorSnackbar = ({ error, onClose }: Props) => {
  return (
    <Snackbar
      open={error.status}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" variant="filled">
        {error.message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
