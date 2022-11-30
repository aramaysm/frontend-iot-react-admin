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
    let response_Phase0 = await this.phase0();
    let responseFinal={};
    while (isSuccessful === false) {
      let response_Phase1 = await this.phase1(response_Phase0.data.data);
      let response_Phase2 = await this.phase3(response_Phase1.data.data);
      isSuccessful = response_Phase2.data.data.finished;
      responseFinal= response_Phase2;
    }

    return responseFinal;
    
  }

  async phase0() {
    const hashPass = CryptoJS.SHA256(this._password).toString();
    this._password = hashPass;

    return await axios.post(
      this._urlServer,
      {
        username: this._username,
        password: this._password,
      },
      Services.getAxiosConfig("")
    );
  }

  phase1 = async (responseBefore) => {
    this._protocol = new Client_Entity({
      url_server: this._urlServer,
      password: this._password,
      username: this._username,
    });

    return await axios.post(
      this._urlServer + "1",
      this._protocol.phase_0(responseBefore, this._password),
      Services.getAxiosConfig("")
    );
  };

  phase3 = async (responseBefore) => {
    return await axios.post(
      this._urlServer + "3",
      this._protocol.phase_2(responseBefore),
      Services.getAxiosConfig("")
    );
  };
}
