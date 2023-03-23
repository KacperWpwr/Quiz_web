import Navbar from "./Navbar";
import Quiz from "./Pages/Quiz/Quiz";
import LoginRegister from "./Pages/LoginRegister/LoginRegister";
import MainPage from "./Pages/MainPage/MainPage";
import {useEffect, useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Page} from "./PageEnum";
import CreateNewQuiz from "./Pages/CreateNewQuiz/CreateNewQuiz";
import {checkLogin} from "./Api/LoginCheck";
import Account from "./Pages/Account/Account";
import SearchDisplay from "./Pages/SearchDisplay/SearchDisplay";
import CreatorPage from "./Pages/CreatorPage/CreatorPage";



export default function App(){
    const [is_logged,setIsLogged] = useState(false)
    useEffect(()=>{
        const log_check= async()=>{
            const res = await checkLogin()
            setIsLogged(res)
        }
        log_check()

    },[])
    return (

        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Navbar is_logged={is_logged} setIsLogged={setIsLogged}/>}>
                    <Route index={true} element={<MainPage is_logged={is_logged}/>}/>
                    <Route path="login" element={<LoginRegister setIsLogged={setIsLogged}/>}/>
                    <Route path="quiz" element={<Quiz is_logged={is_logged}/>}/>
                    <Route path="quiz-creator" element={<CreateNewQuiz/>}/>
                    <Route path="account" element={<Account/>} />
                    <Route path="search" element={<SearchDisplay/>}/>
                    <Route path="creator" element={<CreatorPage is_logged={is_logged}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
//<CreatorPage/>
/*
        <div>

            {getpage()}
        </div>
* */
//<Quiz/>
//<LoginRegister/>