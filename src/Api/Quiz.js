import api_path from "./Path";

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