import {Page} from "./PageEnum";
import {Link, Outlet} from "react-router-dom";
import {expireCookie} from "./Api/CookieManagement";

export default function Navbar({is_logged,setIsLogged}){
    return (
        <>
            <div className="navbar">
                <Link to="/" className="page_name" >QUIZ</Link>
                <div  className="search-bar-container">
                    <input type="text" className="search-bar"></input>
                    <div className="search-bar-button">Search</div>

                </div>

                <div className="navbar-button-container">
                    {!is_logged&&<Link to="/login" className="navbar-button" >Login/Register</Link>}
                    {is_logged&&<Link to="/quiz-creator" className="navbar-button">Create New Quiz</Link>}
                    {is_logged&&<Link to="/quiz" className="navbar-button">Account</Link>}
                    {is_logged&&<Link to="/" className="navbar-button" onClick={()=>{setIsLogged(false);expireCookie("credentials")}}>Logout</Link>}
                </div>

            </div>
            <Outlet />
        </>
    )
}
