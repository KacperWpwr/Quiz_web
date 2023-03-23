import api_path from "./Path";
import {getCookie} from "./CookieManagement";

export async function searchUserStrict(text){
    const credentials = getCookie("credentials")
    let path = api_path+"/user/search/strict/"+text
    if(credentials){
        path = path + "?user="+credentials.login
    }
    return fetch(path)
}

export async function searchUserAdvanced(text){
    const credentials = getCookie("credentials")
    let path = api_path+"/user/search/advanced/"+text
    if(credentials){
        path = path + "?user="+credentials.login
    }

    return fetch(path)
}