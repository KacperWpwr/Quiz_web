import api_path from "./Path";

export function searchUserStrict(text){
    const path = api_path+"/user/search/strict/"+text

    return fetch(path)
}

export function searchUserAdvanced(text){
    const path = api_path+"/user/search/advanced/"+text

    return fetch(path)
}