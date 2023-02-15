import {useState} from "react";

export default function Question({question_info,props}) {


    return(
        <div className="question_container">
            <div>{question_info.question_text}</div>
            <ul className="unstyled_list">
                { question_info.answers.map(answer=>
                <li key={answer.number} >
                    <div className={getMarker(props.is_checked,answer.number===props.button_checked,answer.is_correct)}>
                        <input checked={props.button_checked===answer.number} disabled={props.is_checked} onClick={()=>{check(props,answer.is_correct);props.setButtonChecked(answer.number)}} className="question_choice" type="radio" />
                        {answer.text}
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}
function getMarker(is_checked,is_key_checked,is_correct){
    let returning = 'choice'
    if(is_key_checked&&!is_correct){
            returning +=' incorrect'

    }
    if(is_checked&&is_correct){
        returning+=' correct'
    }
    return returning;




}
function check(props,is_correct){
    props.setIschecked(true)
    if (is_correct) {
        props.setCorrectNum(props.correct_num+1)
    }else{
        props.setIncorrectNum(props.incorrect_num+1)
    }
    props.setQuestionNum(props.question_num+1)
}

//
//