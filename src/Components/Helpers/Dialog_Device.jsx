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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { MenuItem } from "@mui/material";
import { OpenInFullTwoTone } from "@mui/icons-material";

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
  const { onClose, onCloseSaved, open, users, errorField } = props;

  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [serial, setSerial] = React.useState("");

  const [url_photo, setUrl_photo] = React.useState("");
  const [userSelected, setUserSelected] = React.useState(0); //id del userdetail selected

  React.useEffect(() => {
    setBrand("");
    setModel("");
    setSerial("");
    setUrl_photo("");
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    console.log("Saved");

    onCloseSaved({
      brand,
      model,
      serialId: serial,
      photo: url_photo,
      is_handled: true,
      user_id: userSelected,
    });
  };

  const onChangeFiltrered = (event) => {
    console.log("Change:", event.target.value);
    setUserSelected(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="card">
        <div className="card-header bg-transparent">
          <h4 style={{ color: "#34434d" }}>Nuevo dispositivo</h4>
        </div>
        <div className="card-body">
          <DialogContent className="row j-c-c">
            <CssTextField
              className="col-12 col-lg-8 col-sm-12 mb-3"
              required
              label="Marca"
              onChange={(event) => setBrand(event.target.value)}
              value={brand}
            />
            <CssTextField
              required
              label="Modelo"
              className="col-12 col-lg-8 col-sm-12 mb-3"
              onChange={(event) => setModel(event.target.value)}
              value={model}
            />
            <CssTextField
              required
              helperText="Es único para cada dispositivo"
              error={errorField}
              className="col-12 col-lg-8 col-sm-12 mb-3"
              label="Número de serie"
              onChange={(event) => setSerial(event.target.value)}
              value={serial}
            />
            <CssTextField
              className="col-12 col-lg-8 col-sm-12 mb-4"
              label="Url de la photo"
              onChange={(event) => setUrl_photo(event.target.value)}
              value={url_photo}
            />

            <CssFormControl
              required
              className="col-12 col-lg-8 col-sm-12 mb-3"
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">
                Seleccionar responsable
              </InputLabel>
              <Select
                color="info"
                labelId="demo-simple-select-label"
                label="Seleccionar responsable"
                value={userSelected}
                onChange={onChangeFiltrered}
              >
                {users.map((opt) => (
                  <MenuItem id={opt.id} value={opt.id}>
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
            <Button
              className="button-Primary"
              disabled={brand === "" || model === "" || serial === ""}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}
