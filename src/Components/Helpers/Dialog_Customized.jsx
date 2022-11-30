import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "gray",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "gray",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid gray",
    },
    "&:hover fieldset": {
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
});

export default function Dialog_Customized(props) {
  const { onClose, onCloseSaved, open, title, listOfInputs, selectedValue } =
    props;

  const [selectedValueState, setSelectedValueState] = React.useState(selectedValue);
  const [id, setId] = React.useState(selectedValue.id);
  const [fullname, setFullname] = React.useState(selectedValue.fullname);
  const [email, setEmail] = React.useState(selectedValue.email);
  const [dni, setDni] = React.useState(selectedValue.dni);
  

  React.useEffect(() => {
   setSelectedValueState(selectedValue);
   setId(selectedValue.id);
   setFullname(selectedValue.fullname);
   setEmail(selectedValue.email);
   setDni(selectedValue.dni);

  },[selectedValue]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    console.log("Saved")
    onCloseSaved({
     id, dni,fullname,email
    });
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const onChangeValue = (id, value) => {
   
   switch (id) {
    case "id":
      setId(value);
      break;
    case "fullname":
      setFullname(value);
      break;
    case "email":
      setEmail(value);
      break;
    case "dni":
      setDni(value);
      break;
   }
      
  

    setSelectedValueState({
      dni,fullname,email
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
      <CssTextField
              className="m-2"
              label="Carnet de identidad"
              onChange={(event) => setDni(event.target.value)}
              value={dni}
              fullWidth
            />
        <CssTextField
              className="m-2"
              label="Nombre completo"
              onChange={(event) => setFullname( event.target.value)}
              value={fullname}
              fullWidth
            />
            <CssTextField
              className="m-2"
              label="Correo electrónico"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              fullWidth
            />
      </DialogContent>
      <DialogActions>
        <Button className="button-Secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button className="button-Primary" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
