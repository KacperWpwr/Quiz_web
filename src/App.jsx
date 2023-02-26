import Navbar from "./Navbar";
import Quiz from "./Quiz/Quiz";
import LoginRegister from "./LoginRegister/LoginRegister";
import MainPage from "./MainPage/MainPage";
import {useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Page} from "./PageEnum";
import CreateNewQuiz from "./CreateNewQuiz/CreateNewQuiz";



export default function App(){
    const [page,setPage] = useState(Page.CreateQuizPage);
    const [is_logged,setIdLogged] = useState(true)
    const getpage= ()=>{
        switch (page) {
            case Page.MainPage: return <MainPage setPage={setPage}/>
            case Page.LoginPage: return <LoginRegister/>
            case Page.QuizPage: return
            case Page.CreateQuizPage: return <CreateNewQuiz/>

        }
    }
    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Navbar is_logged={is_logged} setIsLogged={setIdLogged}/>}>
                    <Route index={true} element={<MainPage/>}/>
                    <Route path="login" element={<LoginRegister/>}/>
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