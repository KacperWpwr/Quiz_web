import {getQuizById, quizSearchAdvanced} from "../../Api/Quiz";
import {createCookie} from "../../Api/CookieManagement";
import {useEffect, useState} from "react";
import {searchUserAdvanced} from "../../Api/User";

;


export default function SearchDisplay(){
    const [results,setResults]= useState([])


    useEffect(()=>{
        const get_quiz_list= async (query) =>{
            const result = await quizSearchAdvanced(query)
            if(result.ok){
                const body = await result.json()
                setResults(body)
            }else{
                alert("Something went wrong")
                document.location.pathname="/"
            }
        }
        const get_user_list= async (query) =>{
            const result = await searchUserAdvanced(query.substring(1,query.length))
            if(result.ok){
                const body = await result.json()
                setResults(body)
            }else{
                alert("Something went wrong")
                document.location.pathname="/"
            }
        }
        const search_query =localStorage.getItem("search-query")
        if(!localStorage.getItem("is-user-search")){
            get_quiz_list(search_query)
        }else{
            get_user_list(search_query)
        }


    },[])

    const getQuiz= async (id)=>{
        const result = await getQuizById(id)
        const body = await result.json()
        createCookie("quiz",body,null,"/quiz")
        document.location.pathname="/quiz"
    }
    const get = (result)=>{
        if(result.id){
            getQuiz(result.id)
        }else{

        }
    }
    return (
        <div className="search-display-container">
            {results.map(result=>getDisplay(result.name,()=>get(result)))}
        </div>
    )
}
function getDisplay(name,go_to_function){
    return(
        <div className="search-display">
            <div className="name-display" onClick={go_to_function}>{name}</div>
        </div>
    )
}
