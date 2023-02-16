import {Page} from "./PageEnum";

export default function Navbar({page,setPage}){
    return (
        <div className="navbar">
            <div className="page_name" onClick={()=>{setPage(Page.MainPage)}}>QUIZ</div>
            <div  className="search-bar-container">
                <input type="text" className="search-bar"></input>
                <div className="search-bar-icon"><i className="fa fa-search"></i></div>
            </div>

            <div className="navbar-button-container">
                <div className="navbar-button">Login/Register</div>
            </div>
        </div>
    )
}