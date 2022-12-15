

export default class ManageJSON{

    path;

    constructor(new_path){
        this.path = new_path;
    }

    readJSON(key){
        let rawdata = localStorage.getItem("data");
        //console.log("data",rawdata);
        let data = JSON.parse(rawdata);
        return data[key];
    }

    writeJSON(keys, values){
        let rawdata = localStorage.getItem("data");
        console.log("data",rawdata);
        if(rawdata === null){
            let data = {};
            for(let i = 0; i < keys.length; i++){
                data[keys[i]] = values[i];
    
            }        
            localStorage.setItem("data", JSON.stringify(data));
        }
        else{
            let data = JSON.parse(rawdata);
            for(let i = 0; i < keys.length; i++){
                data[keys[i]] = values[i];
    
            }        
            localStorage.setItem("data", JSON.stringify(data));
        }
        
        
        
    }

    
}
