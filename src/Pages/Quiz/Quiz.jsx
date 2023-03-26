import Question from "./Question";
import {useEffect, useState} from "react";
import {checkCookie, expireCookie, getCookie} from "../../Api/CookieManagement";
import {addQuizToHistory, addRating, getQuizById, hasRated} from "../../Api/Quiz";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class Answer {
    constructor(is_correct, text,number) {
        this.is_correct = is_correct
        this.answer_txt = text
        this.number=number
    }
}
class Question_Info{
    constructor(question_text,answers) {
        this.question_text=question_text
        this.answers=answers
    }
}
class QuizInfo{
    constructor(name,questions) {
        this.name=name
        this.questions=questions
    }
}

export default function Quiz({is_logged}){
    const [is_started,setIsStarted] = useState(false)
    const [is_checked, setIsChecked]=useState(false)
    const [question_num,setQuestionNum]=useState(0)
    const [correct_num,setCorrectNum]=useState(0)
    const [incorrect_num,setIncorrectNum]=useState(0)
    const [question_id,setQuestionId]=useState(0)
    const [button_checked,setButtonChecked]=useState(0)
    const [is_over,setIsOver]=useState(false)
    const [quiz_name,setQuizName]= useState("")
    const [questions,setQuestions] = useState([])
    const [quiz_id,setQuizId] = useState(0)
    const [star_checked,setStarChecked] = useState()
    const [creators_username,setCreatorUsername] = useState("")
    const [has_rated,setHasRated] = useState(false)
    const [is_creator,setIsCreator] = useState(false)
    let props={
        is_checked:is_checked,
        setIschecked:setIsChecked,
        correct_num:correct_num,
        setCorrectNum:setCorrectNum,
        incorrect_num:incorrect_num,
        setIncorrectNum:setIncorrectNum,
        question_num:question_num,
        setQuestionNum:setQuestionNum,
        button_checked:button_checked,
        setButtonChecked:setButtonChecked
    }
    useEffect(() => {
        const fetch= async ()=>{
            const id = getCookie("quiz")
            const result_quiz = await getQuizById(id)
            const credentials = getCookie("credentials")
            if(result_quiz.ok){
                const quiz = await result_quiz.json()
                setQuizId(quiz.id)
                const this_quiz = QuizDTOResolve(quiz)
                setCreatorUsername(quiz.creator_username)
                setQuizName(this_quiz.name)
                setQuestions(this_quiz.questions)
                setIsCreator(credentials.login===quiz.creator_username)
            }else{
                alert("Something went wrong")
            }

            const result_rtd = await hasRated(id)
            if(result_rtd.ok){
                const body = await result_rtd.json()
                setHasRated(body)
            }
        }

        const quiz_exists=checkCookie("quiz")
        if(!quiz_exists){
            alert("Something went wrong")
            window.location.pathname="/"
        }


        fetch();
        document.title=quiz_name

       expireCookie("quiz")
    }, []);

    const renderQuiz = (
        <div className="quiz_container">
            {is_over ? <div></div>:<Question question_info={questions[question_id]} props={props}/>}
            <div className="quiz_footer">
                <div className="next_button_container">
                    <button disabled={!is_checked} onClick={()=>{nextQuestion(question_id,setQuestionId,setButtonChecked,setIsChecked,setIsOver,questions.length)}} className="next_button">Next Question</button>
                </div>
                <div className="quiz_info">
                    <ul className="unstyled_list">
                        <li className="quiz_list_item quiz_list_first"> Question: {question_num}/{questions.length}</li>
                        <li className="quiz_list_item"> Correct: {correct_num}</li>
                        <li className="quiz_list_item"> Incorrect: {incorrect_num}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
    const renderQuizStart=(
        <div className="quiz_container">
            <div className="quiz_start_over_container">
                <div className="quiz_name">{quiz_name} </div>
                <div className="quiz_button_container">
                    <button className="quiz_button" onClick={()=>{setIsStarted(true);addQuizToHistory(quiz_id)}}>Start quiz</button>
                </div>
            </div>


        </div>
    )
    const renderRating = ()=>{
        return(
            <div className="quiz-rating-display-container">
                <div className="quiz-rating-container">
                    <div className="quiz-rating-star-container">
                        <FontAwesomeIcon key={1} className={getStarRating(1,star_checked)} onClick={()=>setStarChecked(1)} icon={faStar}/>
                        <FontAwesomeIcon key={2} className={getStarRating(2,star_checked)} onClick={()=>setStarChecked(2)} icon={faStar}/>
                        <FontAwesomeIcon key={3} className={getStarRating(3,star_checked)} onClick={()=>setStarChecked(3)} icon={faStar}/>
                        <FontAwesomeIcon key={4} className={getStarRating(4,star_checked)} onClick={()=>setStarChecked(4)} icon={faStar}/>
                        <FontAwesomeIcon key={5} className={getStarRating(5,star_checked)} onClick={()=>setStarChecked(5)} icon={faStar}/>
                    </div>
                    <div className={star_checked>0 ? "quiz-rating-submit-opinion" : "quiz-rating-submit-opinion disabled"}
                         onClick={()=>{ if(star_checked>0) send_opinion()}}>
                        Submit
                    </div>
                </div>
            </div>
        )
    }


    const send_opinion = () =>{
        const fetch = async () =>{
            const response = await addRating(star_checked,quiz_id)
            if(!response.ok){
                alert("Something went wrong!")
                window.location.pathname='/'
            }else{
                setHasRated(true)
            }
        }
        if(is_logged){
            fetch()
        }
    }
    const get_creator = () =>{
        localStorage.setItem("creator-query",creators_username)
        window.location.pathname='/creator'
    }

    function restartquiz() {
        setIsOver(false)
        setQuestionId(0)
        setIncorrectNum(0)
        setCorrectNum(0)
    }

    const renderQuizOver =(
        <div className="quiz_container">
            <div className="quiz_start_over_container">
                <div className="quiz_summary">Quiz completed</div>
                <div className="quiz_info_label">Question answered: {question_id}</div>
                <div className="quiz_info_label">Questions correct: {correct_num}</div>
                <div className="quiz_info_label">Correct ratio: {(correct_num/(question_id)).toFixed(2)}</div>
                {has_rated || is_creator? "": renderRating()}
                {is_creator? "" : (
                    <div className="quiz_button_container">
                        <button className="quiz_button" onClick={()=>{get_creator()}}>Creators Page</button>
                    </div>
                )}
                <div className="quiz_button_container">
                    <button className="quiz_button" onClick={()=>{restartquiz()}}>Restart</button>
                </div>
                <div className="quiz_button_container">
                    <button className="quiz_button" onClick={()=>{window.location= "/"}}>Exit</button>
                </div>
            </div>
        </div>
    )
    return is_started===true ? is_over? renderQuizOver: renderQuiz : renderQuizStart

}
function getStarRating(star_num,star_checked){
    let class_name = "quiz-rating-star"
    if(star_num<=star_checked){
        class_name = class_name +" checked"
    }
    return class_name
}


function nextQuestion(question_id,setQuestionId,setButtonChecked,setIsChecked,setIsOver,question_num){
    setQuestionId(question_id+1)
    setButtonChecked(0)
    setIsChecked(false)

    if(question_id===question_num-1) setIsOver(true)



}
function QuizDTOResolve(quiz_dto){
    const name = quiz_dto.name
    const questions_dto=quiz_dto.questions
    let new_questions = []
    for (let i=0;i<questions_dto.length;i++){
        const question_text= questions_dto[i].question_text
        const answers_dto= questions_dto[i].answers
        let answers=[]
        for(let j=0;j<answers_dto.length;j++){
            answers[j]= new Answer(answers_dto[j].is_correct,answers_dto[j].answer_text,1+j)
        }
        console.log(answers)
        new_questions[i]=new Question_Info(question_text,answers)
    }
    return new QuizInfo(name,new_questions)
}
//question_info={question1}