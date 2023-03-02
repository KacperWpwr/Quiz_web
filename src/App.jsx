import Navbar from "./Navbar";
import Quiz from "./Quiz/Quiz";
import LoginRegister from "./LoginRegister/LoginRegister";
import MainPage from "./MainPage/MainPage";
import {useEffect, useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Page} from "./PageEnum";
import CreateNewQuiz from "./CreateNewQuiz/CreateNewQuiz";
import {checkLogin} from "./Api/LoginCheck";



export default function App(){
    const [page,setPage] = useState(Page.CreateQuizPage);
    const [is_logged,setIsLogged] = useState(false)
    useEffect(()=>{
        const log_check= async()=>{
            const res = await checkLogin()
            console.log(res)
            setIsLogged(res)
        }
        log_check()

    },[])
    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Navbar is_logged={is_logged} setIsLogged={setIsLogged}/>}>
                    <Route index={true} element={<MainPage/>}/>
                    <Route path="login" element={<LoginRegister setIsLogged={setIsLogged}/>}/>
                    <Route path="quiz" element={<Quiz setPage={setPage}/>}/>
                    <Route path="quiz-creator" element={<CreateNewQuiz/>}/>
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