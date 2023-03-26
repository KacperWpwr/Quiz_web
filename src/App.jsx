import Navbar from "./Navbar";
import Quiz from "./Pages/Quiz/Quiz";
import LoginRegister from "./Pages/LoginRegister/LoginRegister";
import MainPage from "./Pages/MainPage/MainPage";
import {useEffect, useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
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
    const setLogged = (is_log)=>{
        const record = is_logged
        setIsLogged(is_log)
        if(record&&!is_log){
            if (window.location.pathname==='/'){
                window.location.reload()
            }
        }
    }


    return (

        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Navbar is_logged={is_logged} setIsLogged={setLogged}/>}>
                    <Route index={true} element={<MainPage is_logged={is_logged}/>}/>
                    <Route path="login" element={<LoginRegister setIsLogged={setLogged}/>}/>
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
