import api_path from "./Path"
import {getCookie} from "./CookieManagement";
export async function checkLogin(){
    const cookie = getCookie("credentials")
         const response = await fetch(api_path+"/page/check/login",{
                 credentials:"include",
                 method: 'GET',
                 mode:"cors",
                 headers:{
                     'Content-Type': 'application/json; charset=utf-8',
                     "Access-Control-Allow-Origin":"*",
                     Authorization: "Bearer "+cookie.token
                 },
                 xhrFields: { withCredentials: true}
             })
    const is_logged=response.ok
    return is_logged;


}