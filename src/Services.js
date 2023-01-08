import Cookies from 'universal-cookie';





export default class Services {
    

    
    static saveValueInCookies(value) {
        const cookies = new Cookies();
       
        cookies.set('to_session', value, {
          path: "/",
          maxAge: 36000,
        });
        //sessionStorage.setItem('21asa2a2',encripted_Token);

    }
    static getValueFromCookies() {
        const cookies = new Cookies();
        return cookies.get("to_session");
    }


    static deshabilitarBotones(nodeFather) {
        var nodesToDisab = document.getElementsByClassName(nodeFather);

        for (var i = 0; i < nodesToDisab.length; i++) {
            nodesToDisab[i].disabled = true;
        }
    }

    static habilitarBotones(nodeFather) {
        var nodesToDisab = document.getElementsByClassName(nodeFather);

        for (var i = 0; i < nodesToDisab.length; i++) {
            nodesToDisab[i].disabled = false;
        }
    }


    //Routes
    static getAxiosConfig(token) {
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
          },
        };
        return axiosConfig;
      }
      static getAxiosConfigWithParams(token, param) {
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
          params: {
            id:param
          },
        };
    
        return axiosConfig;
      }

      
      static loginAdminUrl() {
        return apiUrl + "/auth/login/";
      }
      static getUserAuthUrl() {
        return apiUrl + "/auth/user";
      }


      //Workers
      static getAllWorkersUrl() {
        return apiUrl + "/user";
      }
      static getAllWorkersNamesUrl() {
        return apiUrl + "/user/names";
      }
      static updateWorkersUrl() {
        return apiUrl + "/user/update/";
      }

      

      static changeStatusWorkersUrl(){
        return apiUrl + "/user/status/";
      }

       static getWorkerByTokenUrl(){
        return apiUrl + "/user/getUser";
      }


      //Users
      static getAllUsersNamesUrl() {
        return apiUrl + "/user-details/names";
      }
      static changeStatusUsersUrl(){
        return apiUrl + "/user-details/status/";
      }
      static updateUserUrl() {
        return apiUrl + "/user-details/update/";
      }
      static getAllUsersUrl(){
        return apiUrl + "/user-details/";
      }


      ///Devices
      static getAllDevicesUrl() {
        return apiUrl + "/devices";
      }
      static changeStatusDevicesUrl(){
        return apiUrl + "/devices/status/";
      }

      static getAllUsersHandlerDevicesUrl() {
        return apiUrl + "/user-details/names-handlers";
      }

      //Roles
      static getAllRolesUrl() {
        return apiUrl + "/role";
      }

      //WorkersLogs
      static getAllWorkersLogUrl() {
        return apiUrl + "/worker-log";
      }

      static getAllWorkersLogUrlCheckInTimes() {
        return apiUrl + "/worker-log/checkInTimes/";
      }

      //AuthenticactionLogs
      static getAllAuthLogUrl() {
        return apiUrl + "/auth";
      }

      static getAllAuthLogUrlCheckInTimes() {
        return apiUrl + "/auth/report/checkInHour/";
      }
      static getDeviceHandlerCredentials(){
        return apiUrl + "/devices-handlers/getCredentials";
      }
       static deviceAuth(){
        return apiUrl + "/devices/login/";
      }

      static getDeviceHandlerCredentials(){
        return apiUrl + "/devices-handlers/getCredentials";
      }

      static isDeviceAllowed(){
        return apiUrl + "/devices-handlers/isAllowed";
      }

      static deviceAuth(){
        return apiUrl + "/devices/login/";
      }
}

//Hosted
//let apiUrl = "https://iot-platform-api-nest.onrender.com";
//Local let apiUrl = "http://localhost:8080";
let apiUrl = "http://localhost:8080";
let encripted_Token = '';