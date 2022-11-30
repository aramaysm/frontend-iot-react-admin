import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PropTypes from "prop-types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Alert_MUI(props) {
  const { children, onClose, open, onSave, title, msg, color, ...other } =
    props;

  const [vertical, setVertical] = React.useState("bottom");
  const [horizontal, setHorizontal] = React.useState("center");
  const [close, setClose] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } else {
      onClose();
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert
          color={color}
          onClose={handleClose}
          severity={color}
          sx={{ width: "100%" }}>
         
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
Alert_MUI.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
