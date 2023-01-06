import CryptoJS from "crypto-js";
import Services from "../Services";
import axios from "axios";
import Client_Entity from "./Client_Entity";

export default class Protocol_Controller {
  _urlServer = null;
  _username = "";
  _password = "";
  _protocol = {};

  constructor() {}

  /*** Just need the username, the password in plain text and the 
   * url of the login of the API 
   * Example: ExecuteProtocol(user1, secret1234, https://localhost:5001/api/auth/login/)
   * */
  async ExecuteProtocol(username, password, urlServer) {
    let isSuccessful = false;
    this._urlServer = urlServer;
    this._username = username;
    this._password = password;
    await this.phase0();
    let responseFinal={};
    while (isSuccessful === false) {
      let response_Phase1 = await this.phase1();    
      let response_Phase2 = await this.phase3(response_Phase1.data.data);
      isSuccessful = response_Phase2.data.data.finished;
      responseFinal= response_Phase2;
    }

    return responseFinal;
    
  }

  async phase0() {
    const hashPass = CryptoJS.SHA256(this._password).toString();
    console.log("Hash:", hashPass);
    this._password = hashPass;

    this._protocol = new Client_Entity({
      url_server: this._urlServer,
      password: this._password,
      username: this._username,
    });


    let phase0_toServer = await axios.post(
      this._urlServer,
      {
        username: this._username        
      },
      Services.getAxiosConfig("")
    );

    console.log("Phase 0:", phase0_toServer);

     await this._protocol.phase_0(phase0_toServer.data.data, this._password);
     
     return phase0_toServer;
  }

  phase1 = async () => {
   
    let dataToTransfer = this._protocol.phase_1();
    console.log("Phase 1:", dataToTransfer);

    return dataToTransfer.then((data)=>{
      return  axios.post(
        this._urlServer + "1",
        data,
        Services.getAxiosConfig("")
      );
    })
    
    
  };

  phase3 = async (responseBefore) => {

    let dataToTransfer = this._protocol.phase_2(responseBefore);

    return dataToTransfer.then((data)=>{
      return  axios.post(
        this._urlServer + "3",
        data,
        Services.getAxiosConfig("")
      );
    })
    
  };
}
