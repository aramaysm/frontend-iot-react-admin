import PropTypes from "prop-types";
import axios from "axios";
import React from "react";


import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import {
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  useNavigate,
} from "react-router-dom";
import { styled } from "@mui/material/styles";



import Services from "../Services";

import LoginImage from "../Resources/undraw_security_on_re_e491.svg";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#03b4cf",
  },
  
  "& .MuiInput-underline:after": {
    borderBottomColor: "#03b4cf",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      
      border: "2px solid rgb(169, 169, 169)",
    },
    "&:hover fieldset": {
      borderColor: "#03b4cf",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#03b4cf",
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

  React.useEffect(() => {}, []);

  const history = useNavigate();

  const handleSuccessFullAuth = (data) => {
    props.handleLoggin(data);
    history("/");
  };
  const onLogin = (ev) => {
    ev.preventDefault();
    setTextButton("Iniciando...");
    Services.deshabilitarBotones("button-Primary");

    axios
      .post(Services.loginUrl(), {
        user: username,
        pass: password,
      
      })
      .then((response) => {
        if (response.data.status === 303) {
          //alert(this.state.username+" , "+this.state.password);

          Services.saveValueInCookies(response.data.data.token);
          //sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
          //sessionStorage.setItem('user-token', JSON.stringify(response.data.data.user.username));
          setTimeout(
            () => Services.habilitarBotones("button-Primary"),
            1000
          );

          handleSuccessFullAuth(response.data.data.user.username);
        }
      })
      .catch((error) => {
        if (error.response.error !== undefined) {
          if (error.response.data.errors.pass !== undefined) {
            setIsError(true);
            setError("La contraseña debe ser mayor de 8 carácteres");
            setTimeout(
              () => Services.habilitarBotones("button-Primary"),
              10000
            );
          } else if (error.response.data.errors.twofactor !== undefined) {
           

            setTimeout(
              () => Services.habilitarBotones("button-Primary"),
              10000
            );
          }
        } else if (
          error.response !== undefined &&
          error.response.data.status === 301
        ) {
          setIsError(true);
          setError("Credenciales incorrectas");
          setTimeout(
            () => Services.habilitarBotones("button-Primary"),
            10000
          );
        } else if (
          error.response !== undefined &&
          error.response.data.status === 302
        ) {
          setIsError(true);
          setError("Codigo invalido");
          setTimeout(
            () => Services.habilitarBotones("button-Primary"),
            1000
          );
        }
      });
  };
  return (
    <div className="w-100 h-100 w-100 position-absolute bg-light" >
      <div className="col-lg-7 col-sm-12 col-12 m-auto justify-content-center align-content-center d-flex mt-2">
        <div className="row bg-white shadow rounded-15 m-auto mt-3 justify-content-center align-content-center d-flex">
          <div className="col-lg-6 col-sm-9 col-9  justify-content-center align-content-center d-flex text-center">
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
                    type={"text"} InputLabelProps={{ shrink: true }}
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
                    value={password} InputLabelProps={{ shrink: true }}
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
      </div>
    </div>
  );
}
