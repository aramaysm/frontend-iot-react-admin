import Templete_Crud_Operations from "./Templete_Crud_New";
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Services from "../Services";
import Dialog_Customized from "./Helpers/Dialog_Customized";
import Dialog_Confirm_User from "./Helpers/Dialog_Confirm_User";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MiniDrawer from "./Helpers/Drawer_MUI";
import Alert_MUI from "./Helpers/Alert_MUI";

export default function Workers_Operations() {
  const [dataForLoad, setDataForLoad] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedValue, setSelectedValue] = React.useState({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openQrView, setOpenQrView] = React.useState(false);
  const [qr, setQr] = React.useState("");
  const [user, setUser] = React.useState({});
  const [titleForDialogQr, setTitleForDialogQr] = React.useState("");
  const [operation, setOperation] = React.useState(1);
  const [messageAlert, setMessageAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [colorAlert, setColorAlert] = React.useState("");

  const history = useNavigate();

  const onChangeSearch = () => {};

  React.useEffect(() => onLoadInfo, []);

  const onLoadInfo = () => {
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .get(
        Services.getAllWorkersUrl(),
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === process.env.REACT_APP_USER_LOAD) {
          setDataForLoad(response.data.data);
          setTotalItems(response.data.data.length);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 404) {
          setMessageAlert("Dispositivo no encontrado");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 500) {
          setMessageAlert("Ha ocuurido un error en el servidor");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else {
          setMessageAlert("Ha ocuurido un error en la conexion");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });
  };

  const onChangeRowPerPage = () => {};

  const onChangePage = () => {};

  const onUserSelect = (data) => {
    setSelectedValue(data);
    setUser(data);
  };

  const onHandleSelectionViewUsers = (data) => {};

  const onHandleButtonInsert = () => {
    setSelectedValue({});
    setUser({});
    setOperation(1);
    setOpenDialog(true);
  };

  const onHandleButtonEdit = () => {
    console.log("Funtion onhandleeditbutton");
    setOpenDialog(true);
    setOperation(2);
    setQr("");
    setUser(selectedValue);
  };

  const onHandleSaveData = (data) => {
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .post(
        Services.getAllWorkersUrl(),
        { dni: data.dni, fullname: data.fullname, email: data.email },
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 101) {
          setUser(response.data.data);
          console.log("User created");
          setOpenDialog(false);
          setOpenQrView(true);
          setQr(response.data.data.qrcode);
          setMessageAlert("Trabajador insertado con éxito");
          setOpenAlert(true);
          setColorAlert("success");
          /*let dataString = "Nombre completo: "+user.fullname+"\nDNI: "+user.dni+"\nEmail: "+user.email;
        QRCode.toDataURL(dataString, function (err, url) {
          setQr(url)
        })*/
          setTitleForDialogQr("Trabajador insertado exitosamente");

          onLoadInfo();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 404) {
          setMessageAlert("Trabajador no encontrado"); 
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");
          
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 500) {
          setMessageAlert("Ha ocuurido un error en el servidor");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");
         
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else {
          setMessageAlert("Ha ocuurido un error en la conexion");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");
         
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });
  };

  const onHandleEditData = (data) => {
    console.log("Data is ", data);

    axios
      .put(
        Services.updateWorkersUrl() + data.id,
        {
          id: data.id,
          dni: data.dni,
          fullname: data.fullname,
          email: data.email,
        },
        Services.getAxiosConfig()
      )
      .then((response) => {
        if (response.data.status === process.env.REACT_APP_USER_UPDATED) {
          setUser(response.data.data);
          console.log("User edited");
          setOpenDialog(false);
          setQr(response.data.data.qrcode);
          setOpenQrView(true);

          setTitleForDialogQr("Usuario editado exitosamente");

          onLoadInfo();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 404) {
          setMessageAlert("Usuario no encontrado");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 500) {
          setMessageAlert("Ha ocuurido un error en el servidor");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else {
          setMessageAlert("Ha ocuurido un error en la conexion");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });
  };
  const onHandleViewQR = () => {
    setTitleForDialogQr("Código QR del usuario");
    setOpenQrView(true);
    console.log("Qr-", selectedValue.qrcode);
    setQr(selectedValue.qrcode);
  };

  const onHandleStatusData = () => {
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .put(
        Services.changeStatusWorkersUrl() + selectedValue.id,
        {},
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (
          response.data.status === process.env.REACT_APP_USER_STATUS_CHANGED
        ) {
          console.log("User status changed");
          onLoadInfo();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 404) {
          setMessageAlert("Usuario no encontrado");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 500) {
          setMessageAlert("Ha ocuurido un error en el servidor");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else {
          setMessageAlert("Ha ocuurido un error en la conexion");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });
  };

  return (
    <div
      className="container-fluid  bg-lightBlue  h-100 w-100 p-0"
      id="body-pd"
    >
      <Alert_MUI
        color={colorAlert}
        msg={messageAlert}
        open={openAlert}
        onClose={() => {
          setOpenAlert(false);
        }}
      />
      <MiniDrawer title="Trabajadores" itemSelected={2} />
      <Templete_Crud_Operations
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowPerPage={onChangeRowPerPage}
        onChangePage={onChangePage}
        user={""}
        totalItems={totalItems}
        onElementSelect={onUserSelect}
        onHandleSelectionView={onHandleSelectionViewUsers}
        columnasName={namesColumn}
        onHandleSwitch={onHandleStatusData}
        columnsValue={columnsToFill}
        nameReporte="Trabajadores"
        optionsHowToFiltered={namesColumn}
        dataLoad={dataForLoad}
        optionsHowToSee={["Ninguno", "Nombre", "DNI", "Email"]}
        valueForButton={"Ver "}
        onSearch={onChangeSearch}
        isButtonDisable={true}
        buttonsArray={[
          {
            value: "Editar",
            functionOnClick: onHandleButtonEdit,
            className: "button-White-Primary",
            icon: <EditIcon />,
            disabled: () => {
              return false;
            },
          },
          {
            value: "Ver",
            functionOnClick: onHandleViewQR,
            className: "button-White-Primary",
            icon: <QrCodeIcon />,
            disabled: () => {
              return false;
            },
          },
        ]}
        buttonGeneral={{
          value: "Insertar",
          className: "button-Primary",
          onClick: (ev) => {
            ev.preventDefault();
            onHandleButtonInsert();
          },
        }}
      />
      <Dialog_Customized
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={"Información del trabajador"}
        onCloseSaved={operation === 1 ? onHandleSaveData : onHandleEditData}
        listOfInputs={listOfInputs}
        selectedValue={selectedValue}
      />

      <Dialog_Confirm_User
        open={openQrView}
        onClose={() => setOpenQrView(false)}
        title={titleForDialogQr}
        qr={qr}
        user={user}
      />
    </div>
  );
}

let namesColumn = [
  "Id",
  "Carnet",
  "Nombre completo",
  "Estado",
  "Fecha de inicio",
];

let columnsToFill = [
  {
    id: "id",
    label: "Id",
    minWidth: 70,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "dni",
    label: "Carnet",
    minWidth: 170,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fullname",
    label: "Nombre completo",
    minWidth: 120,
    align: "center",
    isObject: true,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Estado",
    minWidth: 170,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "createdAt",
    label: "Fecha de inicio",
    minWidth: 120,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
];

let listOfInputs = [
  {
    id: "dni",
    label: "Carnet",
  },
  {
    id: "fullname",
    label: "Nombre completo",
  },
  {
    id: "email",
    label: "Correo electrónico",
  },
];
