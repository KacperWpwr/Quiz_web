import {Page} from "./PageEnum";

export default function Navbar({page,setPage}){
    return (
        <div className="navbar">
            <div className="page_name" onClick={()=>{setPage(Page.MainPage)}}>QUIZ</div>

        </div>
    )
}