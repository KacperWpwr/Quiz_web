import {getQuizById, quizSearchAdvanced} from "../../Api/Quiz";
import {createCookie} from "../../Api/CookieManagement";
import {useEffect, useState} from "react";
import {searchUserAdvanced} from "../../Api/User";
import {getQuiz} from "../../InnerFunctions/Quiz";

;


export default function SearchDisplay(){
    const [results,setResults]= useState([])
    const [is_quiz_display,setIsQuizDisplay] = useState(true)


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
        if(localStorage.getItem("is-user-search")==="false"){
            get_quiz_list(search_query)
        }else{
            setIsQuizDisplay(false)
            get_user_list(search_query)
        }


    },[])


    const getRedirection = (result)=>{
        if(is_quiz_display){
            getQuiz(result.id)
        }else{
            localStorage.setItem("creator-query",result.name)
            document.location.pathname="/creator"
        }
    }
    return (
        <div className="search-display-container">
            {results.map(result=>{
                return (
                    <div className="search-display" onClick={()=>getRedirection(result)}>
                        <div key={result.name} className="name-display" >{result.name}</div>
                    </div>
                )
            })}
        </div>
    )
}

