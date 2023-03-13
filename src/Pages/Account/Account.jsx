import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faHeart,faFile,faCalendar} from "@fortawesome/free-regular-svg-icons";
import AccountInfo from "./AccountInfo/AccountInfo";
import UserQuizzes from "./UserQuizzes/UserQuizzes";
import FollowedCreators from "./FollowedCreators/FollowedCreators";
import QuizHistory from "./QuizHistory/QuizHistory";

export default function Account(){
    const [is_account_display,setIsAccountDisplay] = useState(false)
    const [is_quiz_display,setIsQuizDisplay] = useState(true)
    const [is_followed_display,setIsFollowedDisplay] = useState(false)
    const [is_quiz_history,setIsQuizHistory] = useState(false)


    useEffect(()=>{
        document.title="Account"
    },[])

    const reset = ()=>{
        setIsAccountDisplay(false)
        setIsFollowedDisplay(false)
        setIsQuizDisplay(false)
        setIsQuizHistory(false)
    }

    return(
        <div className="account-display-container">
            <div className="account-choice-list-container">
                <div className="account-choice-container" onClick={()=>{reset();setIsAccountDisplay(true)}}>
                    <div className="account-choice" >
                        <FontAwesomeIcon className="account-choice-icon" icon={faUser} />
                        <div className="account-choice-name">Account</div>
                    </div>
                </div>
                <div className="account-choice-container" onClick={()=>{reset();setIsQuizDisplay(true)}}>
                    <div className="account-choice" >
                        <FontAwesomeIcon className="account-choice-icon" icon={faFile} />
                        <div className="account-choice-name">Your quizzes</div>
                    </div>
                </div>
                <div className="account-choice-container" onClick={()=>{reset();setIsFollowedDisplay(true)}}>
                    <div className="account-choice" >
                        <FontAwesomeIcon className="account-choice-icon" icon={faHeart} />
                        <div className="account-choice-name">Followed creators</div>
                    </div>
                </div>
                <div className="account-choice-container" onClick={()=>{reset();setIsQuizHistory(true)}}>
                    <div className="account-choice" >
                        <FontAwesomeIcon className="account-choice-icon" icon={faCalendar} />
                        <div className="account-choice-name">Quiz history</div>
                    </div>
                </div>
            </div>

            {is_account_display&&<AccountInfo/>}
            {is_quiz_display&&<UserQuizzes/>}
            {is_followed_display&&<FollowedCreators/>}
            {is_quiz_history&&<QuizHistory/>}


        </div>
    )
}