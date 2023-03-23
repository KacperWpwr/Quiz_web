import {Page} from "./PageEnum";
import {Link, Outlet} from "react-router-dom";
import {createCookie, expireCookie} from "./Api/CookieManagement";
import {useState} from "react";
import {findAllByDisplayValue} from "@testing-library/react";
import {getQuizById, quizSearchStrict} from "./Api/Quiz";
import {searchUserStrict} from "./Api/User";
import {getQuiz} from "./InnerFunctions/Quiz";





export default function Navbar({is_logged,setIsLogged}){
    const [search_results,setSearchResults] = useState([])
    const [search_query,setSearchQuery] = useState("")

    const SearchBarOnInput = async (text)=>{
        setSearchQuery(text)
        setSearchResults([])
        if(text===""){
            return
        }
        if(text[0]==='@'){
            const result = await searchUserStrict(text.substring(1,text.length))
            if(result.ok){
                const body=await result.json()
                console.log(body)
                setSearchResults(body)
            }
            return
        }
        const result = await quizSearchStrict(text)
        if(result.ok){
            const body=await result.json()
            setSearchResults(body)
        }

    }

    const getUser = async(name)=>{
        localStorage.setItem("creator-query",name)
        document.location.pathname="/creator"
    }

    const get = (result)=>{
        if(result.id){
            getQuiz(result.id)
        }else{
            getUser(result.name)
        }
    }
    const search = ()=>{
        if(search_query[0]==='@'){
            localStorage.setItem("is-user-search","true")
        }else{
            localStorage.setItem("is-user-search","false")
        }
        localStorage.setItem("search-query",search_query)
        document.location.pathname="/search"

    }
    return (
        <>
            <div className="navbar">
                <Link to="/" className="page_name" >QUIZ</Link>
                <div className="search-container">
                    <div  className="search-bar-container">
                        <input type="text" className="search-bar" value={search_query} onChange={(event)=>{SearchBarOnInput(event.target.value)}}></input>
                        <div className="search-bar-button" onClick={search}>Search</div>

                    </div>
                    <div className="search-result-container">
                        {search_results.map(result=>{
                        return(
                        <div className="search-result" onClick={()=>{ get(result)}}>
                    {result.name}
                        </div>
                        )
                    })}
                    </div>
                </div>

                <div className="navbar-button-container">
                    {!is_logged&&<Link  to="/login" className="navbar-button" >Login/Register</Link>}
                    {is_logged&&<Link  to="/quiz-creator" className="navbar-button">Create New Quiz</Link>}
                    {is_logged&&<Link  to="/account" className="navbar-button">Account</Link>}
                    {is_logged&&<Link  to="/" className="navbar-button" onClick={()=>{setIsLogged(false);expireCookie("credentials")}}>Logout</Link>}
                </div>

            </div>
            <Outlet />
        </>
    )
}

