import api_path from "./Path"
import {getCookie} from "./CookieManagement";
export async function checkLogin(setLogged){
    const token = getCookie("credentials")
    if(token!==""){
        await fetch(api_path.api_path+"/page/check/login",{
            method: 'GET',
            headers:{
                Authentication: 'Bearer '+token
            }
        }).then((response)=>{
            if (response.ok){
                console.log(response)
                setLogged(true)
            }
        }).catch()
    }

}