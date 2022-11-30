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

export default function Users_Dialog(props) {
  const { onClose, onCloseSaved, roles, names, open, title, selectedValue } =
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl className="m-2 mt-4" disabled = {selectedValue.fullname!==null &&
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
        </FormControl>
        <CssTextField disabled = {selectedValue.fullname!==null &&
           selectedValue.fullname!==undefined}
          className="m-2 mt-4"
          label="Nombre de usuario"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          fullWidth
        />
        <FormControl className="m-2 mt-4" fullWidth>
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
        </FormControl>
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
