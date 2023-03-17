import {getCookie} from "./CookieManagement";
import api_path from "./Path";

export async function getAccountInfo(){
    const credentials = getCookie("credentials")
    const path = api_path+"/user/get/profile-info/"+credentials.login
    return await fetch(path,{
        credentials:"omit",
        method: 'GET',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token

        },
        xhrFields: { withCredentials: true}

    }).then((result)=>{
        return result
    })
}
export async function changeDescription(new_description){
    const credentials = getCookie("credentials")
    const request ={
        username: credentials.login,
        new_description:new_description
    }
    const path = api_path+ "/user/change/description"
    return await fetch(path, {
        credentials:"omit",
        method: 'PUT',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token

        },
        body: JSON.stringify(request),
        xhrFields: { withCredentials: true}
    })
}

export async function changeEmail(new_email){
    const credentials = getCookie("credentials")
    const request ={
        username: credentials.login,
        new_email:new_email
    }
    const path = api_path+ "/user/auth/change/email"
    return await fetch(path, {
        credentials:"omit",
        method: 'PUT',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token

        },
        body: JSON.stringify(request),
        xhrFields: { withCredentials: true}
    })
}

export async function changeLogin(new_username){
    const credentials = getCookie("credentials")
    const request ={
        username: credentials.login,
        new_username:new_username
    }
    const path = api_path+ "/user/auth/change/login"
    return await fetch(path, {
        credentials:"omit",
        method: 'PUT',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token

        },
        body: JSON.stringify(request),
        xhrFields: { withCredentials: true}
    })
}

export async function getPageNum(){
    const credentials = getCookie("credentials")
    const path = api_path+"/user/get/quiz/page-number/"+credentials.login
    return await fetch(path,{
        credentials:"omit",
        method: 'GET',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token

        },
        xhrFields: { withCredentials: true}

    }).then((result)=>{
        return result
    })
}
export async function getPageContent(current_page){
    const credentials = getCookie("credentials")
    const path = api_path+"/user/get/quiz/page-content/user="+credentials.login+"/page="+current_page
    return await fetch(path,{
        credentials:"omit",
        method: 'GET',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token

        },
        xhrFields: { withCredentials: true}

    }).then((result)=>{
        return result
    })
}
export async function getQuizHistory(){
    const credentials = getCookie("credentials")
    const path = api_path+"/user/get/quiz-history/user="+credentials.login
    return await fetch(path,{
        credentials:"omit",
        method: 'GET',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin':'true',
            Authorization: "Bearer "+credentials.token

        },
        xhrFields: { withCredentials: true}

    }).then((result)=>{
        return result
    })
}

