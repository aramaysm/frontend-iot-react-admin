import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function AlertDialog(props) {
  const {
    children,
    onClose,
    open,
    onSave,
    title,
    msg,
    color,
    hasInput,
    ...other
  } = props;

  const [text, setText] = React.useState("");

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (hasInput === true) onSave(text);
    else onSave();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.msg}
          </DialogContentText>
          {hasInput === true ? (
            <Box>
              <TextField
                color='success'
                id='standard-multiline-flexible'
                label='Escriba aqui el codigo'
                className='w-100'
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                variant='standard'
              />
            </Box>
          ) : (
            <Box></Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            className='button-Secondary'
            onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            className='button-Primary'
            onClick={handleSave}
            autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  hasInput: PropTypes.bool.isRequired,
};
