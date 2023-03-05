import {getCookie} from "./CookieManagement";
import api_path from "./Path"

export async function CreateQuiz(quiz_name,questions){
    const credentials = getCookie("credentials")
    const request={
        username: credentials.login,
        quiz_name: quiz_name,
        questions: questions
    }
    const path = api_path+"/quiz/create"
    const result = await fetch(path,{
        credentials: "include",
        mode: "cors",
        method: "POST",
        headers:{
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin":"*",
            Authorization: "Bearer "+credentials.token
        },
        body: JSON.stringify(request)
    })
    return result
}