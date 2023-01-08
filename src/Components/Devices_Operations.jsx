import Templete_Crud_Operations from "./Templete_Crud_New";
import React from "react";
import PropTypes from "prop-types";
import Services from "../Services";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Device_Card from "./Device_Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ResponsiveAppBar from "./Helpers/AppBar";
import Dialog_Device from "./Helpers/Dialog_Device";
import Alert_MUI from "./Helpers/Alert_MUI";
import AlertDialog from "./Helpers/AlertDialog";
import MiniDrawer from "./Helpers/Drawer_MUI";





export default function Devices_Operations() {
  const [dataForLoad, setDataForLoad] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [users_list, setUsers_list] = React.useState([]);
  const [messageAlert, setMessageAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [colorAlert, setColorAlert] = React.useState("");
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [errorField, setErrorField] = React.useState(false);

  React.useEffect(() => onLoadInfo, []);

  const history = useNavigate();

  const onChangeSearch = () => {};

  const onChangeRowPerPage = () => {};

  const onChangePage = () => {};

  const onHandleStatusData = () => {
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .put(
        Services.changeStatusDevicesUrl() + userData.id,
        {},
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (
          response.data.status === 303
        ) {
          console.log("Device status changed");
          onLoadInfo();
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

  const onHandleSelectionViewDevices = () => {};

  const onButtonClick = () => {};

  const onHandleButtonInsert = () => {
    setOpenDialog(true);

    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .get(
        Services.getAllUsersHandlerDevicesUrl(),
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 100) {
          setUsers_list(response.data.data);
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

  const onHandleSwitch = () => {
   
  };
  const onDeviceSelect = (data) => {
    setUserData(data);
  };

  const onLoadInfo = () => {
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .get(
        Services.getAllDevicesUrl(),
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 300) {
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

  const onHandleDevice = (data) => {
    setUserData(data);
    setOpenAlertDialog(true);
  };

  const onSaveDevice = () => {
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .post(
        Services.getAllDevicesUrl(),
        userData,
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 301) {
          onLoadInfo();
          setOpenDialog(false);
          setMessageAlert("Dispositivo creado con éxito");
          setOpenAlert(false);
          setColorAlert("success");
          setErrorField(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setErrorField(true);
          setMessageAlert("Ocurrió un conflicto al guardar el dispositivo");
          setOpenAlert(true);
          setOpenAlertDialog(false);
          setColorAlert("error");
          console.log("Error conflict");
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
      <AlertDialog
        color={"info"}
        title={"Confirmación"}
        msg={"¿Está seguro que desea guardar el dispositivo ?"}
        open={openAlertDialog}
        onSave={onSaveDevice}
        onClose={() => {
          setOpenAlertDialog(false);
        }}
      />
      <MiniDrawer title="Dispositivos" itemSelected={3}/>
      <Templete_Crud_Operations
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowPerPage={onChangeRowPerPage}
        onChangePage={onChangePage}
        user={""}
        totalItems={totalItems}
        onElementSelect={onDeviceSelect}
        onHandleSelectionView={onHandleSelectionViewDevices}
        columnasName={namesColumn}
        onHandleSwitch={onHandleStatusData}
        columnsValue={columnsToFill}
        nameReporte="Dispositivos"
        optionsHowToFiltered={namesColumn}
        dataLoad={dataForLoad}
        optionsHowToSee={["Ninguno", "Nombre", "DNI", "Email"]}
        valueForButton={"Ver "}
        onSearch={onChangeSearch}
        isButtonDisable={true}
        buttonsArray={[]}
        buttonGeneral={{
          value: "Insertar",
          className: "button-Primary",
          onClick: (ev) => {
            ev.preventDefault();
            onHandleButtonInsert();
          },
        }}
      />
      <Dialog_Device
        onClose={() => setOpenDialog(false)}
        onCloseSaved={onHandleDevice}
        open={openDialog} 
        errorField={errorField}
        users={users_list}
      />
    </div>
  );
}

let namesColumn = ["IMAGEN", "MARCA", "MODELO", "ESTADO"];

let columnsToFill = [
  {
    id: "photo",
    label: "FOTO",
    minWidth: 70,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "brand",
    label: "MARCA",
    minWidth: 170,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "model",
    label: "MODELO",
    minWidth: 120,
    align: "center",
    isObject: true,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "serialId",
    label: "SERIAL ID",
    minWidth: 120,
    align: "center",
    isObject: false,
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
];

let dataToFill = [
  {
    id: 1,
    created_at: "2021-10-10",
    status: "Activo",
    brand: "Samsung",
    model: "A03s",
    photo:
      "https://i.postimg.cc/KY5yTm67/samsung-galaxy-a03s-dual-sim-black-32gb-and-3gb-ram-sm-a037f-ds.png",
  },
  {
    id: 2,
    created_at: "2021-10-10",
    status: "Inactivo",
    brand: "Samsung",
    model: "A03",
    photo: "https://i.postimg.cc/jSyJgKdF/Samsung-A03.png",
  },
  {
    id: 3,
    created_at: "2021-10-10",
    status: "Activo",
    brand: "Raspberry Pi",
    model: "Model 3",
    photo: "https://i.postimg.cc/qvBzLKSz/Raspberry-Pi-4-Model-B-Side.png",
  },
];

/*

  <Templete_Crud_Operations
            page={page}
            rowsPerPage={rowsPerPage}
            onChangeRowPerPage={onChangeRowPerPage}
            onChangePage={onChangePage}
            user={""}
            totalItems={totalItems}
            onOrderSelect={onOrderSelect}
            onHandleSelectionViewOrders={onHandleSelectionViewOrders}
            columnasName={namesColumn}
            columnsValue={columnsToFill}
            nameReporte='Dispositivos IoT'
            optionsHowToFiltered={namesColumn}
            dataLoad={dataForLoad}
            optionsHowToSee={["Todas", "Pendientes", "Completadas"]}
            valueForButton={"Ver "}
            onSearch={onChangeSearch}
            isButtonDisable={true}
            buttonsArray={[{
              id: "resp-button",
              label: "Ver",
              functionOnClick: onButtonClick,
              className: "button-Primary-Two",
              icon: <VisibilityIcon />,
              disabled: ()=>{
                return false
            },
            },]} 
            buttonGeneral={{
                value: "Insertar", 
                className:"button-Primary",
                onClick: (ev) => {
                    ev.preventDefault();
                    onHandleButtonInsert();
            }}}
          />
  */
