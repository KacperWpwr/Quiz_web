import Question from "./Question";
import {useEffect, useState} from "react";
import {Page} from "../PageEnum";
import {checkCookie, expireCookie, getCookie} from "../Api/CookieManagement";

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
const question1= new Question_Info("2+2 equals", [new Answer(true,4,1),new Answer(false,3,2),new Answer(false,5,3)])
const question2 = new Question_Info("2*2 equals",[new Answer(true,4,1),new Answer(false,3,2),new Answer(false,5,3)])
const question3 = new Question_Info("What is root of 4",[new Answer(false,1,1),new Answer(true,2,2),new Answer(false,3,3),new Answer(false,4,4)])
const _questions=[question1,question2,question3]
export default function Quiz(){
    const [is_started,setIsStarted] = useState(false)
    const [is_checked, setIsChecked]=useState(false)
    const [question_num,setQuestionNum]=useState(0)
    const [correct_num,setCorrectNum]=useState(0)
    const [incorrect_num,setIncorrectNum]=useState(0)
    const [question_id,setQuestionId]=useState(0)
    const [button_checked,setButtonChecked]=useState(0)
    const [is_over,setIsOver]=useState(false)
    const [quiz_name,setQuizName]= useState("QUIZ")
    const [questions,setQuestions] = useState(_questions)
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
        const quiz_exists=checkCookie("quiz")
        if(!quiz_exists){
            return;
        }
        const quiz = getCookie("quiz")
        console.log(quiz)
        const this_quiz = QuizDTOResolve(quiz)
        setQuizName(this_quiz.name)
        setQuestions(this_quiz.questions)

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
                <div className="quiz_name">QUIZ </div>
                <div className="quiz_button_container">
                    <button className="quiz_button" onClick={()=>setIsStarted(true)}>Start quiz</button>
                </div>
            </div>


        </div>
    )

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
        for(let j=0;j<questions_dto.length;j++){
            answers[j]= new Answer(answers_dto[j].is_correct,answers_dto[j].answer_text,1+j)
        }
        new_questions[i]=new Question_Info(question_text,answers)
    }
    return new QuizInfo(name,new_questions)
}
//question_info={question1}