import QrReader from 'react-qr-scanner';
import React, { Component } from 'react';
import MiniDrawer from "./Helpers/Drawer_MUI";
import Services from "../Services";

export default function QRScaner() {


    const [delay, setDelay] = React.useState(100);
    const [result, setResult] = React.useState('No result');

    const handleScan = (data) =>{
        setResult(data);
    }

    const handleError = (err) =>{
        console.log("Error: ",err)
    }

  return (
    <div
      className="container-fluid h-100 w-100 p-0 "
      id="body-pd"
    >
      <MiniDrawer title="Dispositivos" itemSelected={3} />
      <div className="h-100 w-100 j-c-c">
        <div className="col-12 col-lg-11 col-sm-12 j-c-c ">
            <div className='card j-c-c p-2'>
            <QrReader facingMode="rear"
          delay={delay}
          style={{
            height: 240,
            width: 320,
          }}
          onError={handleError}
          onScan={handleScan}
          />
            </div>
       
        <p>{result}</p>
        </div>
      </div>
    </div>
  );
}
