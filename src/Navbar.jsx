import {Page} from "./PageEnum";
import {Link, Outlet} from "react-router-dom";
import {createCookie, expireCookie} from "./Api/CookieManagement";
import {useState} from "react";
import {findAllByDisplayValue} from "@testing-library/react";
import {getQuizById} from "./Api/Quiz";

class Result{
    constructor(text,quiz_id) {
        this.text=text
        this.id=quiz_id
    }
}



export default function Navbar({is_logged,setIsLogged}){
    const [search_results,setSearchResults] = useState([new Result("Quiz 1" ,1),new Result("Quiz 2",2)])
    const getQuiz= async (id)=>{
        const result = await getQuizById(id)
        const body = await result.json()
        console.log(body)
        createCookie("quiz",body,null,"/quiz")
        //document.location.pathname="/quiz"
    }
    return (
        <div className="visibl-eoverflow">
            <div className="navbar">
                <Link to="/" className="page_name" >QUIZ</Link>
                <div className="search-container">
                    <div  className="search-bar-container">
                        <input type="text" className="search-bar"></input>
                        <div className="search-bar-button">Search</div>
                    </div>
                    <div className="search-result-container">
                        {search_results.map(result=>{
                            return(
                                <div className="search-result" onClick={()=>{ getQuiz(result.id)}}>
                                    {result.text}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="navbar-button-container">
                    {!is_logged&&<Link  to="/login" className="navbar-button" >Login/Register</Link>}
                    {is_logged&&<Link  to="/quiz-creator" className="navbar-button">Create New Quiz</Link>}
                    {is_logged&&<Link  to="/quiz" className="navbar-button">Account</Link>}
                    {is_logged&&<Link  to="/" className="navbar-button" onClick={()=>{setIsLogged(false);expireCookie("credentials")}}>Logout</Link>}
                </div>

            </div>
            <Outlet />
        </div>
    )
}

