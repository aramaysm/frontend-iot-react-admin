import React from "react";
import axios from "axios";
import foto from "../Resources/happy-smiling-young-man-3d-260nw-2128644164.png";
import MiniDrawer from "./Helpers/Drawer_MUI";
import Services from "../Services";
import { useNavigate } from "react-router-dom";

export default function UserInfo_Card(props) {
  
  const [user,setUser] = React.useState({});

  const history = useNavigate();

  React.useEffect(()=>{
    onLoadInfo();
  },[])

  const onLoadInfo = () => {

    const tokenLocalStorage = Services.getValueFromCookies();

    axios
      .get(
        Services.getWorkerByTokenUrl(),
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 100) {
          setUser(response.data.data.user);
          console.log("User", response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          history("/login");
          //setTimeout(() => Services.habilitarBotones("button-Primary"), 1000);
        }
      });
  };

  return (
    <div
      className="container-fluid  bg-lightBlue  h-100 w-100 p-0 "
      id="body-pd"
    >
      <MiniDrawer title="Dispositivos" itemSelected={3} />
      <div className="bg-light h-100 w-100 j-c-c">
        <div className="col-12 col-lg-11 col-sm-12 j-c-c ">
          <div className="card shadow w-100 rounded-15 mb-3 h-100">
            <div className="row mt-3">
              <div className="col-12 col-sm-12 col-lg-3 mt-2 mb-2">
                <div className="circle">
                  <img
                    src={foto}
                    height="100%"
                    width="100%"
                    className="m-auto"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-lg-6">
                <div className="card border-none bg-transparent">
                  <div className="card-header border-none bg-transparent row">
                    <div className="col-12 col-sm-12 col-lg-5 ">
                      <h6 className="subtitle">Nombre completo:</h6>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-7 ">
                      <h6>{user.fullname}</h6>
                      
                      </div>
                  </div>
                  <div className="card-body bg-transparent row">
                    <div className="col-12 col-sm-12 col-lg-5 ">
                      <h6 className="subtitle">No. identidad:</h6>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-7 ">
                      <h6>{user.dni}</h6>
                      </div>
                  </div>
                  <div className="card-footer border-none bg-transparent row">
                    <div className="col-12 col-sm-12 col-lg-5 ">
                      <h6 className="subtitle">Email:</h6>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-7 ">
                      <h6> {user.email}</h6>                     
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-lg-3 j-c-c mt-2 mb-2">
                <div className="card">
                  <img src={user.qrcode} height="200px" width="200px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
