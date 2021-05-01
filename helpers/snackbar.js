import React from "react";
import { Snackbar } from "@material-ui/core";
function DisplayMessage({ message, open, close }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      onClose={() => close(!open)}
      autoHideDuration={3000}
      message={message}
    />
  );
}

export default DisplayMessage;
