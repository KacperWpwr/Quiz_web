import {useEffect, useState} from "react";
import { getProposedQuizes, getRecentQuizes} from "../../Api/MainPage";
import {createCookie, getCookie} from "../../Api/CookieManagement";
import {getFollowedCreators} from "../../Api/Creator";
import default_image from "../../Images/empty.jpg"
 class Quiz_Information{
    constructor(quiz_name,author_name,question_number) {
        this.quiz_name=quiz_name
        this.author_name=author_name
        this.question_number=question_number
     }
 }
 class Profile_Info{
     constructor(name,quiz_number) {
         this.name=name
         this.quiz_number=quiz_number
     }
 }


export default function MainPage({is_logged}){
    const  [recent_quizzes, setRecentQuizzes] = useState([])
    const  [proposed_quizzes, setProposedQuizzes] = useState([])
    const  [followed_creators, setFollowedCreators] = useState([])
    useEffect(() => {
        document.title="Home"
        const fetch_info = async ()=>{
            const response_rec = await getRecentQuizes()
            if(response_rec.ok){
                const body = await response_rec.json()
                setRecentQuizzes(body.quizzes)
            }
            const response_prop= await getProposedQuizes()
            if(response_prop.ok){
                const body = await response_prop.json()
                setProposedQuizzes(body.quizzes)
            }

            const response_foll = await getFollowedCreators()
            if(response_foll.ok){
                const body = await response_foll.json()
                setFollowedCreators(body.followed_list)
            }
        }

        if(getCookie('credentials')){
            fetch_info()
        }

    }, [is_logged])

    return(
        <div className="main-page-container">
            <div className="main-page-first-batch">
                <div className="main-page-last-quizzes">
                    <div className="main-page-section-name"> Recent quizes</div>
                    <div className="main-page-quizzes-display">
                        {recent_quizzes.length===0 ? <div className="main-page-quizzes-nothing">Nothing to show</div> : <div>{recent_quizzes.map(quiz=>{return generate_quiz_sheet(quiz)})}</div>}
                    </div>
                </div>
                <div className="main-page-mentions">
                    <div className="main-page-section-name">Quizes you might like</div>
                    <div className="main-page-quizzes-display">
                        <div>
                            {proposed_quizzes.length===0 ? <div className="main-page-quizzes-nothing">Nothing to show</div>:<div>{proposed_quizzes.map(quiz=>{return generate_quiz_sheet(quiz)})}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-page-users-followed">
                <div className="main-page-users-followed-section-name">Followed creators </div>
                <div className="main-page-creator-display">
                    {followed_creators.length===0 ? <div className="main-page-users-followed-nothing">Nothing to show</div> : <div>{followed_creators.map(profile=>{return generate_creator_sheet(profile)})}</div>}
                </div>
            </div>
        </div>
    )
}

function generate_quiz_sheet(quiz_info){
    return(
        <button className="main-page-quiz-profile" onClick={()=>{createCookie("quiz",quiz_info.id,null,"/quiz");window.location.pathname="/quiz"}}>
            <div className="main-page-quiz-name">{quiz_info.name}</div>
            <div>
                <div className="main-page-quiz-info-label">Author name: </div>
                <div className="main-page-quiz-info">{quiz_info.creator_username} </div>
            </div>
            <div>
                <div className="main-page-quiz-info-label">Number of questions </div>
                <div className="main-page-quiz-info">{quiz_info.question_amount}</div>
            </div>

        </button>
    )
}
function generate_creator_sheet(profile){
    return(
        <button className="main-page-creator-profile" onClick={()=>{localStorage.setItem("creator-query",profile.username);window.location.pathname="/creator"}}>
            <div className="main-page-creator-profile-pic-container">
                <img src={default_image} className="main-page-creator-profile-pic"/>
            </div>
            <div className="main-page-profile-info-container">
                <div className="main-page-profile-name">{profile.username}</div>
                <div className="main-page-profile-info">Number of quizes: {profile.quiz_num}</div>
            </div>
        </button>
    )
}