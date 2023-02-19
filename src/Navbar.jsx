import {Page} from "./PageEnum";

export default function Navbar({setPage,is_logged,setIsLogged}){
    return (
        <div className="navbar">
            <div className="page_name" onClick={()=>{setPage(Page.MainPage)}}>QUIZ</div>
            <div  className="search-bar-container">
                <input type="text" className="search-bar"></input>
                <div className="search-bar-button">Search</div>

            </div>

            <div className="navbar-button-container">
                {!is_logged&&<div className="navbar-button" onClick={()=>{setPage(Page.LoginPage)}}>Login/Register</div>}
                {is_logged&&<div className="navbar-button">Create New Quiz</div>}
                {is_logged&&<div className="navbar-button">Account</div>}
                {is_logged&&<div className="navbar-button" onClick={()=>{setIsLogged(false);setPage(Page.MainPage)}}>Logout</div>}
            </div>
        </div>
    )
}
