import {getQuizById} from "../Api/Quiz";
import {createCookie} from "../Api/CookieManagement";

export async function getQuiz(id){
    const result = await getQuizById(id)
    const body = await result.json()
    createCookie("quiz",body,null,"/quiz")
    document.location.pathname="/quiz"
}