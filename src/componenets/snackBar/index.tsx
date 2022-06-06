import { Alert, Snackbar } from "@mui/material";
import React from "react";

import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { useActions } from "../../hooks/redux/useActions";

export const SnackbarSuccess = () => {
  const { success } = useTypedSelector((s) => s.app);
  const { setSuccess } = useActions();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSuccess(null);
  };

  return (
    <>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

export const SnackbarError = () => {
  const { error } = useTypedSelector((s) => s.app);
  const { setError } = useActions();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setError(null);
  };
  return (
    <>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
