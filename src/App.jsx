import Navbar from "./Navbar";
import Quiz from "./Quiz/Quiz";
import LoginRegister from "./LoginRegister/LoginRegister";
import MainPage from "./MainPage/MainPage";
import {useState} from "react";
import {Page} from "./PageEnum";



export default function App(){
    const [page,setPage] = useState(Page.MainPage);
    const getpage= ()=>{
        switch (page) {
            case Page.MainPage: return <MainPage setPage={setPage}/>
            case Page.LoginPage: return <LoginRegister/>
            case Page.QuizPage: return <Quiz setPage={setPage}/>

        }
    }
    return (
        <div>
            <Navbar page={page} setPage={setPage}/>
            {getpage()}
        </div>
    )
}
//<Quiz/>
//<LoginRegister/>