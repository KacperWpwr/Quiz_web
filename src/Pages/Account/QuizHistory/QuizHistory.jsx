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
                console.log(body)
            }
        }
        fetch_history()

    })


    return(
        <div className="account-content-display-container scroll">
            {quiz_history.map(record=>{
                return  (
                    <div className="quiz-history-quiz-record">
                        <div className="quiz-history-quiz-record-name">{record.quiz_name}</div>
                        <div className="quiz-history-quiz-record-date">{record.date}</div>
                    </div>
                )
            })}
        </div>
    )
}