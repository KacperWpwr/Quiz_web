import api_path from "./Path";

export async function getQuizById(id){
    const path = api_path+"/get/id/"+id
    const result = await fetch(path)
    console.log(result)
    return result
}