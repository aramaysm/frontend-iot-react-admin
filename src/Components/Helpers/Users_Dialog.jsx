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

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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



export default function Users_Dialog(props) {
  const { onClose, onCloseSaved, roles, names, open, title, selectedValue,errorUsername } =
    props;

  const [selectedValueState, setSelectedValueState] =
    React.useState(selectedValue);
  const [id, setId] = React.useState(selectedValue.id);
  const [role, setRole] = React.useState(selectedValue.role);
  const [fullname, setFullname] = React.useState(selectedValue.fullname);
  const [username, setUsername] = React.useState(selectedValue.username);

  React.useEffect(() => {
    setSelectedValueState(selectedValue);
    setId(selectedValue.id);
    setRole(roles.find((item)=> item.fullname === selectedValue.role));
    setFullname(names.find((item)=>item.fullname === selectedValue.fullname));
    setUsername(selectedValue.username);
  }, [selectedValue]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    console.log("Saved",username,fullname,role);
    onCloseSaved({
      id,
      role,
      user: fullname,
      username,
    });
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const onChangeRole = (event) => {
    setRole(event.target.value);
  };

  const onChangeFullname = (event) => {
    setFullname(event.target.value);
    //El value es el id en este caso
  };

  return (
    <Dialog open={open} onClose={handleClose}>
        <div className="card">
        <div className="card-header bg-transparent">
          <h4 style={{ color: "#34434d" }}>{title}</h4>
        </div>
        <div className="card-body bg-transparent">
        <DialogContent>
        <CssFormControl required className="m-2 mt-4" disabled = {selectedValue.fullname!==null &&
           selectedValue.fullname!==undefined} fullWidth>
          <InputLabel id="demo-simple-select-label">
            Trabajador correspondiente
          </InputLabel>
          <Select
            label=" Trabajador correspondiente"
            id="demo-simple-select1"
            value={fullname}
            onChange={onChangeFullname}
          >
            {names.map((opt) => (
              <MenuItem id={opt.id} value={opt}>
                {opt.fullname}
              </MenuItem>
            ))}
          </Select>
        </CssFormControl>
        <CssTextField required disabled = {selectedValue.fullname!==null &&
           selectedValue.fullname!==undefined}
          className="m-2 mt-4" helperText="El nombre de usuario debe ser único"
          error={errorUsername}
          label="Nombre de usuario"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          fullWidth
        />
        <CssFormControl required className="m-2 mt-4" fullWidth>
          <InputLabel id="demo-simple-select-label">Rol del usuario</InputLabel>
          <Select label="Rol del usuario"
             id="demo-simple-select"
            value={role}
            onChange={onChangeRole}
          >
            {roles.map((opt) => (
              <MenuItem id={opt.id} value={opt}>
                {opt.fullname}
              </MenuItem>
            ))}
          </Select>
        </CssFormControl>
      </DialogContent>
   
        </div>
        <div className="card-footer bg-transparent">

        <DialogActions>
        <Button className="button-Secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button className="button-Primary" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
   
        </div>
        </div>
    </Dialog>
  );
}
