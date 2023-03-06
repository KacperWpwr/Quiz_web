import {useEffect, useState} from "react";
import {findAllByDisplayValue} from "@testing-library/react";
import {CreateQuiz} from "../Api/CreateQuiz";
import {createCookie} from "../Api/CookieManagement";

class Question{
    constructor(id,question,answers) {
        this.id=id
        this.question_text=question
        this.answers=answers
    }
}
class Answer{
    constructor(id,is_correct,answer_txt) {
        this.id=id
        this.is_correct=is_correct
        this.text=answer_txt

    }

}
export default function CreateNewQuiz(){
    const[quiz_name,setQuizName]=useState("")
    const [questions,setQuestions]= useState([])
    const [question_id,setQuestionId]=useState(1)
    const [editor_active,setEditorActive]=useState(false)
    const [active_question_id, setActiveQuestionId] = useState(0)

    useEffect(()=>{
        document.title="Create Quiz"
    },[])

    const create = async ()=>{
        const result = await CreateQuiz(quiz_name,QuestionsToDTO(questions))
        console.log(result)
        if(!result.ok){
            console.log("Error")
            return;
        }
        const new_quiz= await result.json()
        const date = new Date();
        date.setDate(new Date()+ 24*60*60*1000)
        createCookie("quiz",new_quiz,date,"/quiz")
        document.location.pathname="/quiz"
    }

    const close_editor = ()=>{
        setEditorActive(false)
        setActiveQuestionId(0)
    }
    const update_questions= (id,question_txt,answers)=>{
        let new_questions=[]

        questions.forEach(question=>{
            if(question.id===id){
                new_questions.push(new Question(id,question_txt,answers))
            }else{
                new_questions.push(question)
            }
        })
        setQuestions(new_questions)
    }

    const question_editor_props={
        closeEditor:close_editor,
        updateQuestions:update_questions
    }
    const delete_function= (id)=>{
        if(id!==active_question_id){
            delete_question(id,questions,setQuestions,question_id,setQuestionId)
        }
    }
    const open_editor = (id)=>{
        if(!editor_active&&active_question_id===0){
            setEditorActive(true)
            setActiveQuestionId(id)
        }
    }
    return (
        <div className="cq-container">

            <div className="cq-quiz-creation-menu">
                <div className="cq-quiz-name-input-container">
                    <input type="text" value={quiz_name} placeholder="Quiz Name" className="cq-quiz-name-input" onChange={(event)=>{setQuizName(event.target.value)}}/>
                </div>
                <div className="cq-create-quiz-button-container">
                    <div className="cq-create-quiz-button" onClick={()=>create()}>Create Quiz</div>
                </div>


            </div>
            <div className="cq-question-container">
                <div className="cg-add-quest-button-container">
                    <button className="cg-add-question-button"
                            onClick={()=>{setQuestions(questions.concat(new Question(question_id,"Place for question",[])));
                                setQuestionId(question_id+1)}}> Add Question</button>
                </div>
                <div className="cq-question-display-container">
                    {questions.map(question=>{return create_question_form(question,delete_function,open_editor)})}
                </div>
            </div>
            {editor_active ? getQuestionEditor(question_editor_props,questions[active_question_id-1]) : <div/>}
        </div>

    )
}

function delete_question(id,questions,setQuestions,question_id,setQuestionId){
    let itr =1
    let new_questions=[]
    questions.forEach(question=>{
        if(question.id!==id){
            new_questions.push(new Question(itr,question.question_text,question.answers))
            itr++
        }

    })
        if(new_questions.length<questions.length){
            setQuestionId(question_id-1)
        }
    setQuestions(new_questions)
}

function create_question_form(question,delete_function,open_editor){
    return(
        <div className="cq-question-form">
            <div className="cq-question-form-question"> {question.id}. {question.question_text}</div>
            <div className="cq-question-form-buttons">
                <button className="cq-question-form-delete" onClick={()=>{delete_function(question.id)}}>Delete</button>
                <button className="cq-question-form-edit" onClick={()=>{open_editor(question.id)}}>Edit</button>
            </div>
        </div>
    )
}
function getQuestionEditor(question_editor_props,question){
    return <QuestionEditor props={question_editor_props} question_in={question}/>
}

//id,questions,setQuestions,setEditorActive
function QuestionEditor({props,question_in}){
    const [is_edit,setIsEdit]= useState(true)
    const [question,setQuestion] = useState(question_in.question_text)
    const [answers,setAnswers] = useState(question_in.answers)
    let edit_props={
        question_txt: question,
        setQuestion: setQuestion,
        answers: answers,
        setAnswers: setAnswers
    }
    let display_props={
        question_txt: question,
        answers: answers
    }

    return (
        <div className="cq-question-editor">
            <div className="cq-question-editor-top-bar">
                <div className="cq-question-editor-close-button" onClick={()=>{props.closeEditor()}}>X</div>
            </div>
            <div className="cq-question-editor-view-options">
                <div>
                    <input type="radio" checked={is_edit} onClick={()=>{setIsEdit(true)}} id="qe-edit-view" name="qe-view-choice-input" className="qe-edit-view" />
                    <label htmlFor="qe-edit-view" className="qe-view-mode-choice">Edit</label>
                    <input type="radio" checked={!is_edit} onClick={()=>{setIsEdit(false)}} id="qe-preview-view" name="qe-view-choice-input" className="qe-preview-view"/>
                    <label htmlFor="qe-preview-view" className="qe-view-mode-choice">Preview</label>
                </div>
            </div>
            {is_edit? <EditForm props={edit_props}/> : <PreviewForm props={display_props}/>}
            <div  className="cq-question-editor-save-button" onClick={()=>{props.updateQuestions(question_in.id,question,answers);props.closeEditor()}}>Save</div>
        </div>
    )
}

function EditForm({props}){
    const [next_answer_id, setNextAnswerId]= useState(props.answers.length+1)
    const [answers,setAnswers]=useState([])
    const [question,setQuestion]=useState("")
    useEffect(()=>{
        setAnswers(props.answers)
        setQuestion(props.question_txt)
    },[])

    const setAnswerChecked= (id)=>{
        const new_answers=[]

        answers.forEach(answer=>{
            let is_correct=false
            if(answer.id===id){
                is_correct=true;
            }
            new_answers.push(new Answer(answer.id,is_correct,answer.text))
        })
        setAnswers(new_answers)
        props.setAnswers(new_answers)
    }
    const setAnswerInput = (id,input)=>{
        const new_answers=[]

        answers.forEach(answer=>{
            if(answer.id===id){
                new_answers.push(new Answer(answer.id,answer.is_correct, input))
                console.log(input)
            }else{
                new_answers.push(new Answer(answer.id,answer.is_correct,answer.text))
            }

        })
        setAnswers(new_answers)
        props.setAnswers(new_answers)
    }
    const deleteAnswer = (id)=>{
        let new_answers =[]
        let id_itr=1
        answers.forEach(answer=>{
            if(answer.id!==id){
                new_answers.push(new Answer(id_itr,answer.is_correct,answer.text))
                id_itr++
            }
        })
        if(answers.length>new_answers.length) setNextAnswerId(next_answer_id-1)
        setAnswers(new_answers)
    }
    const setQuestionText=(text)=>{
        setQuestion(text)
        props.setQuestion(text)
    }

    return(
        <div className="cq-question-editor-content-page">
            <div className="qe-question-input-container">
                <input type="text" value={question} onInput={(event)=>{setQuestionText(event.target.value)}} placeholder="Question" className="qe-question-input"/>
            </div>
            <div className="qe-add-answer-container">
                <div className="qe-add-answer" onClick={()=>{setAnswers(answers.concat(new Answer(next_answer_id,next_answer_id === 1,"")));setNextAnswerId(next_answer_id+1)}}>Add answer</div>
            </div>
            <div className="qe-answer-list-container">
                <ul className="unstyled_list">
                    {answers.map(answer=>{
                        return(
                            <li key={answer.id} className="qe-answer-container">
                                <input  type="radio" checked={answer.is_correct}  onClick={()=>{if(!answer.is_correct) setAnswerChecked(answer.id)}} name="question-check"/>
                                <input type="text" value={answer.text} onInput={(event)=>{setAnswerInput(answer.id,event.target.value)}} className="qe-answer-input"/>
                                <div className="qe-answer-delete" onClick={()=>{deleteAnswer(answer.id)}}>Delete</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}


function PreviewForm({props}){
    return(
        <div className="cq-question-editor-content-page">
            <div>{props.question_txt}</div>
            <div className="qe-answer-list-container">
                <ul className="unstyled_list">
                    {props.answers.map(answer=>{
                        return(
                            <li key={answer.id} className="qe-answer-container">
                                <input type="radio" checked={false}/>
                                <div> {answer.text}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
function QuestionsToDTO(questions){
    const questions_dtos=[]
    questions.forEach(question=>{
        const answers_dtos=[]
        question.answers.forEach(answer=>{
            const answer_dto = {
                is_correct:answer.is_correct,
                answer_text:answer.text
            }
            console.log(JSON.stringify(answer_dto))
            answers_dtos.push(answer_dto)
        })
        const question_dto={
            answers:answers_dtos,
            question_text:question.question_text
        }
        questions_dtos.push(question_dto)
    })
    console.log(JSON.stringify(questions_dtos))
    return questions_dtos
}