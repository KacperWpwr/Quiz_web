import {useEffect, useState} from "react";
import {getQuizHistory} from "../../../Api/Account";

export default function QuizHistory(){
    const [quiz_history,setQuizHistory] = useState([])

    useEffect(()=>{
        const fetch_history = async ()=>{
            const request = await getQuizHistory()
            if(request.ok){
                const body = await request.json()
                setQuizHistory(body.quiz_history)
            }
        }
        fetch_history()

    },[])


    return(
        <div className={getDisplayClass(quiz_history.length>0)}>
            {quiz_history.length>0 ? quiz_history.map(record=>getRecordDisplay(record)) : "You haven't completed any quizzes yet"}
        </div>
    )
}
function getDisplayClass(has_content){
    let class_name="account-content-display-container "
    if(has_content){
        class_name= class_name+"scroll"
    }else{
        class_name= class_name+"text"
    }
    return class_name
}
function getRecordDisplay(record){
    return  (
        <div className="quiz-history-quiz-record">
            <div className="quiz-history-quiz-record-name">{record.quiz_name}</div>
            <div className="quiz-history-quiz-record-date">{record.date}</div>
        </div>
    )
}