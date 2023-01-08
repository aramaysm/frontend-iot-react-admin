import QrReader from "react-qr-scanner";
import React, { Component } from "react";
import MiniDrawer from "./Helpers/Drawer_MUI";
import Services from "../Services";
import axios from "axios";

export default function QRScaner() {
  const [delay, setDelay] = React.useState(100);
  const [result, setResult] = React.useState("No result");
  const [scanned, setScanned] = React.useState(false);
  const [access_granted, setAccess_granted] = React.useState(false);

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

  const handleError = (err) => {
    console.log("Error: ", err);
  };

  return (
    <div className="container-fluid h-100 w-100 p-0 " id="body-pd">
      <MiniDrawer title="Dispositivos" itemSelected={3} />
      <div className="h-100 w-100 j-c-c">
        <div className="col-12 col-lg-11 col-sm-12 card border-none bg-transparent">
          <div className="card-header j-c-c p-2 mb-2 border-none bg-transparent">
            <QrReader
              constraints={{
                facingMode: 'environment'
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
          <h6>{result}</h6>
          </div>
         
        </div>
      </div>
    </div>
  );
}
