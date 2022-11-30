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
        return apiUrl + "/user-details/names";
      }

      //Roles
      static getAllRolesUrl() {
        return apiUrl + "/role";
      }
}


let apiUrl = "http://127.0.0.1:8080";
let encripted_Token = '';