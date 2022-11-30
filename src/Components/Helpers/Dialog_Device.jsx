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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MenuItem } from "@mui/material";


const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#2ecc71",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "#2ecc71",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid #2ecc71",
    },
    "&:hover fieldset": {
      borderColor: "#2ecc71",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2ecc71",
    },
  },
});
const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#2ecc71",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#2ecc71",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2ecc71",
    },
    "&:hover fieldset": {
      borderColor: "#2ecc71",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2ecc71",
    },
  },
});


export default function Dialog_Device(props) {
  const { onClose, onCloseSaved, open, users } = props;

  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [serial, setSerial] = React.useState("");
  const [isHandled, setIsHandled] = React.useState(true);
  const [url_photo, setUrl_photo] = React.useState("");
  const [userSelected,setUserSelected] = React.useState(0); //id del userdetail selected

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    console.log("Saved");
    
    if(isHandled === true)
    onCloseSaved({
      brand,
      model,
      serialId:serial,
      photo:url_photo,
      is_handled: isHandled,
      user_id:userSelected
    });
    else
    onCloseSaved({
      brand,
      model,
      serialId:serial,
      photo:url_photo,
      is_handled: isHandled
    });
  };

  const onChangeFiltrered=(event)=>{
    console.log("Change:",event.target.value);
    setUserSelected(event.target.value);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo dispositivo</DialogTitle>
      <DialogContent>
        <CssTextField
          className="m-2"
          label="Marca"
          onChange={(event) => setBrand(event.target.value)}
          value={brand}
          fullWidth
        />
        <CssTextField
          className="m-2"
          label="Modelo"
          onChange={(event) => setModel(event.target.value)}
          value={model}
          fullWidth
        />
        <CssTextField
          className="m-2"
          label="Número de serie"
          onChange={(event) => setSerial(event.target.value)}
          value={serial}
          fullWidth
        />
        <CssTextField
          className="m-2"
          label="Url de la photo"
          onChange={(event) => setUrl_photo(event.target.value)}
          value={url_photo}
          fullWidth
        />
          <FormControlLabel className="m-2" control={<Checkbox checked={isHandled} 
         onChange={(event)=>setIsHandled(event.target.checked)} />} label="Es un smartphone" />
       {
        isHandled
        ?
        <FormControl className="m-2" variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-label">
          Seleccionar usuario que lo utilizará
        </InputLabel>
        <Select
          color="info"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userSelected}
          onChange={onChangeFiltrered}
        >
          {users.map((opt) => (
            <MenuItem id={opt.id} value={opt.id}>
              {opt.fullname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        :
        null
       }
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
