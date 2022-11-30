import React from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function Device_Card(props) {
  const { id, marca, modelo, urlphoto, status, classColor, button} = props;

  return (
    <div className={"card m-2 h-100 mt-3 border-none rounded-15 shadow " + classColor}>
      <div className="card-header text-center border-none bg-transparent rounded-15">
        <img height="100px" width="100px" src={urlphoto} />
      </div>
      <div className="card-body mt-2 rounded-15">
        <h6 className="text-center">{"Marca: " + marca}</h6>
        <h6 className="text-center">{"Modelo: " + modelo}</h6>
      </div>
      <div className="card-footer justify-content-center d-flex align-content-center border-none bg-transparent rounded-15">
        {button}
      </div>
    </div>
  );
}

/*

<div className="col-6 col-md-6 col-lg-3">
        <div className="card  bg-transparent border-none text-center">
        <img height="75px" width="75px" src={urlphoto} />
          </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card bg-transparent border-none">
        <h6 className="mt-2">{marca}</h6>
          </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card bg-transparent border-none">
        <h6 className="mt-2">{modelo}</h6>
          </div>
      </div>
      <div className="col-12 col-md-6 col-lg-2">
        <div className="card  bg-transparent border-none">
        {status === "Activo" ? (
           <FormControlLabel control={
            <Switch checked={true} className="color-success"
              onChange={onHandleSwitch}
              inputProps={{ 'aria-label': 'controlled' }}
            />} 
            label="Activo" />
        ) : (
          <FormControlLabel control={
            <Switch checked={true} className="color-warning"
              onChange={onHandleSwitch}
              inputProps={{ 'aria-label': 'controlled' }}
            />} 
            label="Inactivo" />
        )}
          </div>
      </div>


 <div className="card shadow rounded-15">
      <div className="card-header border-none bg-transparent rounded-15">
       
      </div>
      <div className="card-body mt-2 rounded-15">
        <h6 className="text-center">{marca}</h6>
        <h6 className="text-center">{modelo}</h6>
      </div>
      <div className="card-footer justify-content-center d-flex align-content-center border-none bg-transparent rounded-15">
        {status === "Activo" ? (
          <div className="ChipMine-success"></div>
        ) : (
          <div className="ChipMine-warning"></div>
        )}
      </div>
    </div>
*/
