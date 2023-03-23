import api_path from "./Path";
import {getCookie} from "./CookieManagement";

export async function getCreatorInfo(){
    const username = localStorage.getItem("creator-query")
    const path = api_path+ "/user/get/creator/info/"+username
    return fetch(path)
}
export async function getCreatorNewest(){
    const username = localStorage.getItem("creator-query")
    const path = api_path+ "/user/get/creator/newest-quizzes/"+username
    return fetch(path)
}
export async function getCreatorTop(){
    const username = localStorage.getItem("creator-query")
    const path = api_path+ "/user/get/creator/top-quizzes/"+username
    return fetch(path)
}
export async function getCreatorAll(){
    const username = localStorage.getItem("creator-query")
    const path = api_path+ "/user/get/creator/quizzes/"+username
    return fetch(path)
}
export async function checkIsFollowed(){
    const credentials = getCookie("credentials")
    const creator_name = localStorage.getItem("creator-query")
    const path = api_path+"/user/get/is-following?following="+credentials.login+"&followed="+creator_name
    return fetch(path,{
        credentials:"omit",
        method: 'GET',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin":"*",
            Authorization: "Bearer "+credentials.token
        },
        xhrFields: { withCredentials: true}
    })
}
export async function followCreator(){
    const credentials = getCookie("credentials")
    const creator_name = localStorage.getItem("creator-query")
    const path = api_path+"/user/follow"
    const request={
        following_username:credentials.login,
        followed_username:creator_name
    }

    return fetch(path,{
        credentials: "omit",
        mode: "cors",
        method: "POST",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin":"*",
            Authorization: "Bearer "+credentials.token
        },
        body: JSON.stringify(request)
    })
}
export async function unfollowCreator(){
    const credentials = getCookie("credentials")
    const creator_name = localStorage.getItem("creator-query")
    const path = api_path+"/user/unfollow"
    const request={
        following_username:credentials.login,
        followed_username:creator_name
    }

    return fetch(path,{
        credentials: "omit",
        mode: "cors",
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin":"*",
            Authorization: "Bearer "+credentials.token
        },
        body: JSON.stringify(request)
    })
}
export async function getFollowedCreators(){
    const credentials = getCookie("credentials")
    const path = api_path+"/user/get/followed/"+credentials.login
    return fetch(path,{
        credentials:"omit",
        method: 'GET',
        mode:"cors",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin":"*",
            Authorization: "Bearer "+credentials.token
        },
        xhrFields: { withCredentials: true}
    })
}
