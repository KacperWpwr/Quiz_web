import api_path from "./Path";
import {getCookie} from "./CookieManagement";

export async function getQuizById(id){
    const path = api_path+"/quiz/get/id/"+id
    const result = await fetch(path)
    return result
}
export async function quizSearchStrict(name){
    const path = api_path+"/quiz/search/strict/"+name
    const result = await fetch(path)
    return result
}
export async function quizSearchAdvanced(name){
    const path = api_path+"/quiz/search/advanced/"+name
    const result = await fetch(path)
    return result
}
export async function addQuizToHistory(id){
    const credentials = getCookie("credentials")
    if(credentials){
        const date = new Date()
        const request_Date = date.getFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate()+' '+date.getHours()+':'+date.getMinutes()
        console.log(request_Date)
        const data={
            quiz_id:id,
            username: credentials.login,
            date: request_Date
        }
        const path = api_path+"/quiz-history/add"
        return fetch(path,{
            credentials: 'omit',
            mode: 'cors',
            method: "POST",
            headers:{
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin':'true',
                Authorization: "Bearer "+credentials.token
            },
            body: JSON.stringify(data)
        }).then(response =>  response)
    }else{
        return {
            ok:false
        }
    }


}
export async function addRating(rating,quiz_id){
    const credentials = getCookie("credentials")
    const request = {
        quiz_id:quiz_id,
        rating:rating,
        username:credentials.login
    }
    const path = api_path +"/quiz/add/rating"

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
export async function hasRated(quiz_id){
    const credentials = getCookie("credentials")

    const path = api_path+"/user/"+credentials.login+"/given-opinion?quiz="+quiz_id

    return fetch(path,{
        credentials: "omit",
        mode: "cors",
        method: "GET",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin":"*",
            Authorization: "Bearer "+credentials.token
        }
    })
}