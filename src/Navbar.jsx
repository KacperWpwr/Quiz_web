import {Page} from "./PageEnum";
import {Link, Outlet} from "react-router-dom";
import {createCookie, expireCookie} from "./Api/CookieManagement";
import {useState} from "react";
import {findAllByDisplayValue} from "@testing-library/react";
import {getQuizById, quizSearchStrict} from "./Api/Quiz";





export default function Navbar({is_logged,setIsLogged}){
    const [search_results,setSearchResults] = useState([])

    const SearchBarOnInput = async (text)=>{
        setSearchResults([])
        if(text!==""){
            const result = await quizSearchStrict(text);
            if(result.ok){
                const body=await result.json();
                setSearchResults(body)
            }
        }
    }
    const getQuiz= async (id)=>{
        const result = await getQuizById(id)
        const body = await result.json()
        console.log(body)
        createCookie("quiz",body,null,"/quiz")
        document.location.pathname="/quiz"
    }
    return (
        <>
            <div className="navbar">
                <Link to="/" className="page_name" >QUIZ</Link>
                <div className="search-container">
                    <div  className="search-bar-container">
                        <input type="text" className="search-bar" onChange={(event)=>{SearchBarOnInput(event.target.value)}}></input>
                        <div className="search-bar-button">Search</div>
                    </div>
                    <div className="search-result-container">
                        {search_results.map(result=>{
                        return(
                        <div className="search-result" onClick={()=>{ getQuiz(result.id)}}>
                    {result.quiz_name}
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

