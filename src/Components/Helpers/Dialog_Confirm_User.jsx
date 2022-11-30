import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import download from "downloadjs";

export default function Dialog_Confirm_User(props) {
  const { onClose, open, title, qr, user } = props;

  React.useEffect(() => {}, [qr, user]);

  const handleExport = () => {
    download(qr, "QR-"+user.fullname + ".png", "image/png");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="card  m-2  bg-transparent border-none">
        <div className="card-title p-1 justify-content-center align-content-center d-flex">
          <h3>{title}</h3>
        </div>
        <div className="card-header  bg-transparent border-none justify-content-center align-content-center d-flex">
          <img src={qr} alt="QR" />
        </div>
        <div className="card-body text-center">
          <h6>{"Qr de " + user.fullname}</h6>
        </div>
        <div className="card-footer bg-transparent border-none justify-content-center align-content-center d-flex">
          <Button className="button-Primary" onClick={handleExport}>
            Guardar imagen
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
