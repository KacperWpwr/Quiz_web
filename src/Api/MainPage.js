import {getCookie} from "./CookieManagement";
import api_path from "./Path";

export async function getRecentQuizes(){
    const credentials = getCookie("credentials")
    const path = api_path+"/user/"+credentials.login+"/recent-quizzes"

    return fetch(path,{
        credentials: 'omit',
        mode: 'cors',
        method: "GET",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token
        }
    })
}
export async function getProposedQuizes(){
    //TODO: fetch
    return []
}
export async function getFollowedCreators(){
    //TODO: fetch
    return []
}