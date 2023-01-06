
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
import Users_Dialog from "./Helpers/Users_Dialog";
import Alert_MUI from "./Helpers/Alert_MUI";



export default function Users_Operations() {
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
  const [workersNames, setWorkersNames] = React.useState([]);
  const [rolesNames, setRolesNames] = React.useState([]);
  const [messageAlert, setMessageAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [colorAlert, setColorAlert] = React.useState("");
  const [errorUsername, setErrorUsername] = React.useState(false);
  

  const history = useNavigate();

  const onChangeSearch = () => {};

  React.useEffect(() => onLoadInfo, []);

  const onLoadInfo = async () => {
    const tokenLocalStorage = Services.getValueFromCookies();

   await axios
      .get(
        Services.getAllUsersNamesUrl(),
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 100) {
          setDataForLoad(response.data.data);
          setTotalItems(response.data.data.length);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });

      await axios
      .get(
        Services.getAllWorkersNamesUrl(),
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 100) {
            setWorkersNames(response.data.data);
          
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });

      await axios
      .get(
        Services.getAllRolesUrl(),
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 600) {
          setRolesNames(response.data.data);
          
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");

         
        }
      });

      let hour=7;
      

      await  axios
      .get(
        Services.getAllAuthLogUrlCheckInTimes()+hour,
       Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 100) {
          console.log(response.data.data);
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

  const onHandleButtonInsert =  () => {
     setSelectedValue({username:""});
     setUser({});
    setOperation(1);
    setOpenDialog(true);
  };

  const onHandleButtonEdit =  () => {
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
        Services.getAllUsersUrl(),
        {
          username: data.username,
          role: data.role,
          user: data.user,
        } ,
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 101) {
          setUser(response.data.data);
          console.log("User created");
          setOpenDialog(false);
          
          /*let dataString = "Nombre completo: "+user.fullname+"\nDNI: "+user.dni+"\nEmail: "+user.email;
        QRCode.toDataURL(dataString, function (err, url) {
          setQr(url)
        })*/
          
          onLoadInfo();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");

          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
        else if (error.response.status === 409) {
          setErrorUsername(true);
          setMessageAlert("Ocurrió un conflicto al guardar el usuario");
          setOpenAlert(true);
         
          setColorAlert("error");
          console.log("Error conflict");
        }
      });
  };

  const onHandleEditData = (data) => {
    console.log("Data is ", data);
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .put(
        Services.updateUserUrl() + data.id,
        {
         role:data.role
        },
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 102) {
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
        /*if (
            error.response.status !== undefined &&
            error.response.status === 401
          )*/
        //this.props.history.push("/login");
      });
  };
 
  const onHandleStatusData = () => {
    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .put(
        Services.changeStatusUsersUrl() + selectedValue.id,
        {},
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (
          response.data.status === 103
        ) {
          console.log("User status changed");
          onLoadInfo();
        }
      })
      .catch((error) => {
        /*if (
            error.response.status !== undefined &&
            error.response.status === 401
          )*/
        //this.props.history.push("/login");
      });
  };

  return (
    <div
      className="container-fluid  bg-lightBlue  h-100 w-100 p-1"
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
      <MiniDrawer title="Usuarios" itemSelected={1}/>

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
        nameReporte="Usuarios"
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
      <Users_Dialog
        open={openDialog} errorUsername={errorUsername}
        onClose={() => setOpenDialog(false)}
        title={"Información del usuario"}
        onCloseSaved={operation === 1 ? onHandleSaveData : onHandleEditData}
        listOfInputs={listOfInputs}
        selectedValue={selectedValue} names={workersNames} roles={rolesNames}
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
    id: "fullname",
    label: "Nombre completo",
    minWidth: 170,
    align: "center",
    isObject: false,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "username",
    label: "Nombre de usuario",
    minWidth: 170,
    align: "center",
    isObject: true,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "Rol",
    minWidth: 170,
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
