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



export default function App(){
    const [page,setPage] = useState(Page.CreateQuizPage);
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
                    <Route index={true} element={<MainPage/>}/>
                    <Route path="login" element={<LoginRegister setIsLogged={setIsLogged}/>}/>
                    <Route path="quiz" element={<Quiz setPage={setPage}/>}/>
                    <Route path="quiz-creator" element={<CreateNewQuiz/>}/>
                    <Route path="account" element={<Account/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
/*
        <div>

            {getpage()}
        </div>
* */
//<Quiz/>
//<LoginRegister/>