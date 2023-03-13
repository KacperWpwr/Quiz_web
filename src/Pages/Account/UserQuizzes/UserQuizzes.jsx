import {useEffect, useState} from "react";
import {getPageContent, getPageNum} from "../../../Api/Account";
import {getQuizById} from "../../../Api/Quiz";
import {createCookie} from "../../../Api/CookieManagement";

export default function UserQuizzes(){
    const [user_quizzes,setUserQuizzes] = useState([])
    const [current_page,setCurrentPage] = useState(0)
    const [page_num,setPageNum] = useState(0)
    useEffect(()=>{
        const fetch_data= async ()=>{
            const result = await getPageNum()
            if(result.ok){
                const body = await result.json()
                setPageNum(body.page_num)
                setCurrentPage(1)
            }

        }
        fetch_data()
    },[])
    useEffect(()=>{
        const fetch_content= async ()=>{
            const result= await getPageContent(current_page)
            if(result.ok){
                const body = await result.json()
                setUserQuizzes(body.page_quizzes)
            }
        }
        if(current_page>0){
            fetch_content()
        }

    },[current_page])

    return (
        <div className="account-content-display-container">
            <div className="user-quizzes-label-container">
               <div className="user-quizzes-label">
                   Your Quizzes:
               </div>
            </div>
            <div className="user-quizzes-quiz-display-list">
                {user_quizzes.map(quiz=>{return getQuizDisplay(quiz.quiz_name,quiz.id)})}
            </div>
            <div className="user-quizzes-footer">
                {getPageSelectionView(page_num,current_page,setCurrentPage)}
            </div>


        </div>
    )
}
function getQuizDisplay(name,id){
    const go_to_quiz= ()=>{
        const fetch_quiz= async ()=>{
            const result = await getQuizById(id)
            if(result.ok){
                const body = await result.json()
                const date = new Date();
                date.setDate(new Date()+ 24*60*60*1000)
                createCookie("quiz",body,date,"/quiz")
                window.location="/quiz"
            }
        }
        fetch_quiz()

    }
    return(
        <div key={id} className="user-quizzes-quiz-display" onClick={go_to_quiz}>
            <div className="user-quizzes-quiz-display-name">{name}</div>
        </div>
    )
}
//TODO: quiz rating display
/*
            <div className="user-quizzes-quiz-display-rating-display">
                <div className="user-quizzes-quiz-display-times-taken">Times taken: 4343</div>
                <div className="user-quizzes-quiz-display-rating">Rating: 54</div>
            </div>
*/
function getPageSelectionView(page_num,current_page,setCurrentPage){
    let return_list =  []

    if(current_page>1) return_list.push(<div className="user-quizzes-footer-button" onClick={()=>setCurrentPage(1)}> &lt;&lt; </div>)
    if(current_page>1) return_list.push(<div className="user-quizzes-footer-button" onClick={()=>setCurrentPage(current_page-1)}> &lt; </div>)

    if (current_page-1>1) return_list.push(<div className="user-quizzes-footer-button disabled"> ... </div>)

    if (current_page>1) return_list.push(<div className="user-quizzes-footer-button " onClick={()=>setCurrentPage(current_page-1)}> {current_page-1} </div>)

    if(current_page!==0) return_list.push(<div disabled={true}  className="user-quizzes-footer-button current"> {current_page} </div>)

    let max =current_page+3<page_num ? current_page+3:page_num
    for (let i = current_page+1; i <= max; i++) {
        return_list.push(<div className="user-quizzes-footer-button" onClick={()=>setCurrentPage(i)}> {i} </div>)
    }


    if (current_page+3<page_num) return_list.push(<div className="user-quizzes-footer-button disabled"> ... </div>)

    if(current_page<page_num) return_list.push(<div className="user-quizzes-footer-button" onClick={()=>setCurrentPage(current_page+1)}> &gt; </div>)
    if(current_page<page_num) return_list.push(<div className="user-quizzes-footer-button" onClick={()=>setCurrentPage(page_num)}> &gt;&gt; </div>)


    return return_list
}