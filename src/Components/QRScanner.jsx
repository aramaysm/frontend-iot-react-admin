import { QrReader } from 'react-qr-reader';
import React, { Component } from "react";
import MiniDrawer from "./Helpers/Drawer_MUI";
import Services from "../Services";
import axios from "axios";
import Protocol_Controller from "../Auth_Module/Protocol_Controller";

export default function QRScaner() {
  const [delay, setDelay] = React.useState(100);
  const [result, setResult] = React.useState("No result");
  const [scanned, setScanned] = React.useState(false);
  const [access_granted, setAccess_granted] = React.useState(false);
  const [deviceAuth, setDeviceAuth] = React.useState(false);

  const handleScan = (data) => {
    const tokenLocalStorage = Services.getValueFromCookies();

    alert("Data", data);
    setResult(data);

    axios
      .post(
        Services.getAllWorkersUrl() + "/getAccess",
        {
          email: data["email"],
          dni: data["dni"],
          fullname: data["fullname"],
        },
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 105) {
          setScanned(true);
          setAccess_granted(true);
          setTimeout(() => setScanned(false), 2000);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.response.status === 403) {
          console.log("Error forbidden");
          setScanned(true);
          setAccess_granted(false);
          setTimeout(() => setScanned(false), 2000);
        } else if (error.response.status === 409) {
          console.log("Error conflict");
          setScanned(true);
          setAccess_granted(false);
          setTimeout(() => setScanned(false), 2000);
        } else if (error.response.status === 422) {
          console.log("Error invalid fields");
          setScanned(true);
          setAccess_granted(false);
          setTimeout(() => setScanned(false), 2000);
        }
      });
  };

  const authenticateDevice = async () => {
    let token_device = localStorage.getItem("token_device");
    let idDevice = localStorage.getItem("id_device");

    let date1 = new Date();

    let protocol = new Protocol_Controller();
    await protocol
      .ExecuteProtocol(idDevice, token_device, Services.deviceAuth(), true)
      .then((response) => {
        if (response.data.status === 200) {
          let date2 = new Date();
          console.log("Time to login device:" + (date2 - date1) / 1000 + "rs");
          //console.log("User authenticated was: ",response.data.data.user.user);
          setDeviceAuth(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log("Credenciales inválidos");
        }
        console.log("Error:", error);
      });
  };

  const handleError = (err) => {
    console.log("Error: ", err);
  };

  const isAllowedByServer = async () => {
    let token_device = localStorage.getItem("token_device");
    let idDevice = localStorage.getItem("id_device");

    const tokenLocalStorage = Services.getValueFromCookies();


    return axios
      .post(
        Services.isDeviceAllowed(),
        {
          brand: "",
          model: "",
        },
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log("Is allowed");
          setDeviceAuth(true);
        }
      })
      .catch((error) => {
        console.log("Error in allowed ", error);
        if (error.response.status === 403) {
          console.log("Ejecutar autenticacion");
          authenticateDevice();
        } else if (error.response.status === 409) {
          console.log("Error conflict");
        } else if (error.response.status === 422) {
          console.log("Error invalid fields");
        }
      });
  };

  return (
    <div className="container-fluid h-100 w-100 p-0 " id="body-pd">
      <MiniDrawer title="Dispositivos" itemSelected={3} />
      <div className="h-100 w-100 j-c-c">
        <div className="col-12 col-lg-11 col-sm-12 card border-none bg-transparent">
          <div className="card-header j-c-c p-2 mb-2 border-none bg-transparent">
            <QrReader
              constraints={{
                facingMode: "environment",
              }}
              style={{
                height: 300,
                width: 300,
              }}
              onError={handleError}
              onResult={handleScan}
            />
          </div>
          <div className="card-body j-c-c ">
            {scanned && access_granted === true ? (
              <h6 className="color-success">{result}</h6>
            ) : (
              <h6 className="color-error">{result}</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
