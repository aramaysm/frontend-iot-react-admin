import PropTypes from "prop-types";
import axios from "axios";
import React from "react";

import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Protocol_Controller from "../Auth_Module/Protocol_Controller";
import {
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  useNavigate,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import Alert_MUI from "./Helpers/Alert_MUI";

import Services from "../Services";

import LoginImage from "../Resources/undraw_security_on_re_e491.svg";

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

export default function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [textButton, setTextButton] = React.useState("Iniciar Sesión");
  const [showPassword, setShowPassword] = React.useState(false);
  const [messageAlert, setMessageAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [colorAlert, setColorAlert] = React.useState("");

  React.useEffect(() => {}, []);

  const history = useNavigate();

  const handleSuccessFullAuth = (data) => {
    props.handleLoggin(data);
    history("/");
  };

  const onLogin = async (ev) => {
    ev.preventDefault();
    setTextButton("Iniciando...");
    Services.deshabilitarBotones("button-Primary");

    let date1 = new Date();

    let protocol = new Protocol_Controller();
    await protocol
      .ExecuteProtocol(username, password, Services.loginAdminUrl())
      .then((response) => {
        if (response.data.status === 200) {
          Services.saveValueInCookies(response.data.data.token);
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
          let date2 = new Date();
          console.log("Time to login: " + (date2 - date1) / 1000 + " s");
          handleSuccessFullAuth(response.data.data.user);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setMessageAlert("Credenciales incorrectas");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 403");
          setTextButton("Iniciar sesión");
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 404) {
          setMessageAlert("Credenciales incorrectas");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");
          setTextButton("Iniciar sesión");
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else if (error.response.status === 500) {
          setMessageAlert("Ha ocuurido un error en el servidor");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");
          setTextButton("Iniciar sesión");
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        } else {
          setMessageAlert("Ha ocuurido un error en la conexion");
          setOpenAlert(true);
          setColorAlert("error");
          console.log("Error 404");
          setTextButton("Iniciar sesión");
          setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });
  };

  return (
    <div className="w-100 h-100 position-absolute bg-light login-backg justify-content-center align-items-lg-center d-flex">
      <div className="col-lg-7 col-sm-12 col-12 ">
        <form>
        <div className="row bg-white shadow rounded-15 m-3 justify-content-center align-content-center d-flex ">
          <div className="col-lg-6 col-sm-9 col-9  justify-content-center align-content-center d-flex text-center">
            <Alert_MUI
              color={colorAlert}
              msg={messageAlert}
              open={openAlert}
              onClose={() => {
                setOpenAlert(false);
              }}
            />
            <div className="card  border-none text-center  ms-auto me-auto">
              <img src={LoginImage} height="85%" width={"85%"} />
            </div>
          </div>
          <div className="col-lg-5 col-sm-12 col-12 m-2 mb-1 mt-0">
            <div className="card bg-transparent border-none text-end">
              <div className="card-header bg-transparent p-0 border-none ms-auto me-auto justify-content-center d-flex align-content-center">
                <div className="card m-auto text-center bg-transparent border-none">
                  <div className="card-header m-0 text-center bg-transparent border-none"></div>
                  <div className="card-body p-0 m-0 text-start border-none">
                    <h4 className="color-info">¡Bienvenido de vuelta!</h4>
                  </div>
                </div>
              </div>

              <div className="card-body  mt-0">
                <div className="row m-2  mt-5 col-lg-12 col-sm-12 col-12" id="">
                  <CssTextField
                    required
                    value={username}
                    className=""
                    type={"text"}
                    InputLabelProps={{ shrink: true }}
                    onChange={(ev) => {
                      setUsername(ev.target.value);
                    }}
                    label="Nombre de usuario"
                  />
                </div>
                <div className="row m-2 mt-5  col-lg-12 col-sm-12 col-12" id="">
                  <CssTextField
                    required
                    className=""
                    type={"password"}
                    value={password}
                    InputLabelProps={{ shrink: true }}
                    onChange={(ev) => setPassword(ev.target.value)}
                    label="Contraseña"
                  />
                </div>
              </div>
              <div className="card-footer border-none bg-transparent">
                <div className="row w-100  justify-content-center align-content-center d-flex mt-4">
                  <div className="col-10 col-sm-10 col-lg-10 justify-content-center align-content-center d-flex">
                    <input
                      onClick={onLogin}
                      type="submit"
                      disabled={
                        username === "" ||
                        username === null ||
                        password === null ||
                        password === ""
                      }
                      id="loginsub"
                      value={textButton}
                      className="button-Primary w-75 "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        </form>
       </div>
    </div>
  );
}
