import {useEffect, useState} from "react";
import {
    checkIsFollowed,
    followCreator,
    getCreatorAll,
    getCreatorInfo,
    getCreatorNewest,
    getCreatorTop, unfollowCreator
} from "../../Api/Creator";
import {createCookie} from "../../Api/CookieManagement";


export default function CreatorPage({is_logged}){
    const [is_newest,setIsNewest] = useState(false)
    const [is_top,setIsTop] = useState(false)
    const [is_all,setIsAll] = useState(false)
    const [creator_name,setCreatorName] = useState("")
    const [creator_description,setCreatorDescription] = useState("")
    const [creator_quiz_num,setCreatorQuizNum] = useState("")
    const [creator_rating,setCreatorRating] = useState("")
    const [newest,setNewest] = useState([])
    const [top,setTop] = useState([])
    const [is_top_loaded,setIsTopLoaded] = useState(false)
    const [all,setAll] = useState([])
    const [is_all_loaded,setIsAllLoaded] = useState(false)
    const [is_following,setIsFollowing] = useState(false)


    useEffect(()=>{
        const fetch_info = async ()=>{
            const result = await getCreatorInfo()
            if(result.ok){
                const body = await result.json()
                setCreatorName(body.username)
                setCreatorRating(parseFloat(body.rating).toFixed(2))
                setCreatorQuizNum(body.quiz_num)
                setCreatorDescription(body.description)

            }else{
                alert('Something went wrong')
                window.location.pathname='/'
            }
        }
        const fetch_newest = async ()=>{
            const result = await getCreatorNewest()
            if(result.ok){
                const body = await result.json()
                setNewest(body.quiz_list)
                setIsNewest(true)
            }else {
                alert('Something went wrong')
                window.location.pathname='/'
            }
        }
        const fetch_is_followed = async ()=>{
            const result = await checkIsFollowed()
            if(result.ok){
                const body = await result.json()
                if(body){
                    setIsFollowing(true)
                }
            }
        }


        fetch_info()
        fetch_newest()
        fetch_is_followed()
    },[])
    const render_newest = ()=>{
        if(is_newest){
            return (
                <div className="cp-quiz-display-content">
                    {newest.map(quiz=>renderQuizSheet(quiz))}
                </div>
            )
        }
    }
    const render_top = ()=>{
        if(is_top){
            return (
                <div className="cp-quiz-display-content">
                    {top.map(quiz=>renderQuizSheet(quiz))}
                </div>
            )
        }
    }
    const render_all = ()=>{
        if(is_all){
            return (
                <div className="cp-quiz-display-content">
                    {all.map(quiz=>renderQuizSheet(quiz))}
                </div>
            )
        }
    }
    const load_newest =()=>{
        setIsAll(false)
        setIsTop(false)
        setIsNewest(true)
    }

    const load_top = async ()=>{
        setIsAll(false)
        setIsNewest(false)
        if(is_top_loaded){
            setIsTop(true)
            return;
        }
        const result = await getCreatorTop()
        if(result.ok){
            const body = await result.json()
            setTop(body.quiz_list)
            setIsTopLoaded(true)
            setIsTop(true)
        }else{
            alert('Something went wrong')
            window.location.pathname='/'
        }

    }
    const load_all = async ()=>{
        setIsTop(false)
        setIsNewest(false)
        if(is_all_loaded){
            setIsAll(true)
            return;
        }
        const result = await getCreatorAll()
        if(result.ok){
            const body = await result.json()
            setAll(body.quiz_list)
            setIsAllLoaded(true)
            setIsAll(true)
        }else{
            alert('Something went wrong')
            window.location.pathname='/'
        }

    }

    const follow = async () =>{
        if(is_logged){
            const result = await followCreator()
            if(result.ok){
                setIsFollowing(true)
            }else{
                alert('Something went wrong')
                window.location.pathname='/'
            }
        }else{
            window.location.pathname="/login"
        }
    }
    const unfollow = async ()=>{
        const result = await unfollowCreator()
        if(result.ok){
            setIsFollowing(false)
        }else{
            alert('Something went wrong')
            window.location.pathname='/'
        }
    }
    const follow_button_action = ()=>{
        if(is_following){
            unfollow()
        }else{
            follow()
        }
    }


    return(
        <div className="creator-page-container">
            <div className="creator-page-account-section">
                <div className="cp-account-name-follow-container">
                    <div className="cp-account-name"> {creator_name}</div>
                    <div className="cp-account-follow-container">
                        <button   className={getFollowButtonClass(is_following)} onClick={follow_button_action}>
                            {is_following? "Following" : "Follow"}
                        </button>
                    </div>
                </div>


                <div className="cp-account-info-container">
                    <div className="cp-account-info-label-container">
                        <div className="cp-account-info-label">Creator quizzes:{creator_quiz_num}</div>
                        <div className="cp-account-info-label">Creator overall rating: {creator_rating===0 ? "--" : creator_rating}</div>
                    </div>
                    <div className="cp-account-description-container">
                        <div className="cp-account-description-label">
                            Description:
                        </div>
                        <div className="cp-account-description">
                            {creator_description}
                        </div>
                    </div>
                </div>

            </div>
            <div className="creator-page-content-section">
                <div className="cp-quiz-display-container">
                    <div className="cp-quiz-display-label">Creator Quizzes:</div>
                    <div className="cp-quiz-display-choice-container">
                        <div id="quiz-display-first-choice" className={getChoiceClass(is_newest)}
                             onClick={()=>{load_newest()}}>Newest</div>
                        <div className={getChoiceClass(is_top)} onClick={()=>{load_top()}}>Best Rating</div>
                        <div className={getChoiceClass(is_all)} onClick={()=>{load_all()}}>All</div>
                    </div>
                    {render_newest()}
                    {render_top()}
                    {render_all()}
                </div>
            </div>
        </div>
    )
}
function getFollowButtonClass(is_disabled){
    let returning = "cp-account-follow"

    if(is_disabled){
        returning= returning+" disabled"
    }
    return returning
}
function getChoiceClass(is_active){
    let class_name = "cp-quiz-display-choice"
    if(is_active){
        class_name+=" active"
    }
    return class_name
}
function renderQuizSheet(quiz){
    return(
        <div key={quiz.id} className="cp-quiz-display-view" onClick={()=>{createCookie("quiz",quiz.id,null,"/quiz");window.location.pathname="/quiz"}}>
            <div className="cp-quiz-display-view-title">{quiz.name}</div>
            <div className="cp-quiz-display-view-label">Questions: {quiz.question_amount}</div>
            <div className="cp-quiz-display-view-label">Rating: {quiz.rating ===0 ? "--": parseFloat(quiz.rating).toFixed(2)}</div>
        </div>
    )
}