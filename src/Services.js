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
            Authorization: `Bearer ${token}`,
          },
        };
        return axiosConfig;
      }

      
      static loginAdminUrl() {
        return apiUrl + "/auth/login";
      }

      static getAllUsersUrl() {
        return apiUrl + "/users";
      }
}


let apiUrl = "http://127.0.0.1:8080/api";
let encripted_Token = '';