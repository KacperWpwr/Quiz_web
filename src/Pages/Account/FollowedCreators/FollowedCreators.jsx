import {useEffect, useState} from "react";
import {getFollowedCreators} from "../../../Api/Creator";

export default function FollowedCreators() {
    const [followed_creators, setFollowedCreators] = useState([])

    useEffect(() => {
        const fetch_creators = async () => {
            const result = await getFollowedCreators()
            if (result.ok) {
                const body = await result.json()
                console.log(body.followed_list)
                setFollowedCreators(body.followed_list)
            } else {
                alert("Something went wrong")
                document.location.pathname = "/"
            }
        }
        fetch_creators()
    }, [])

    return (

        <div className= {getDisplayClass(followed_creators.length>0)}>
            {followed_creators.length>0 ? followed_creators.map(creator=>getCreatorForm(creator)): "You are following no creators"}
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

function goToUser(username) {
    localStorage.setItem("creator-query",username)
    document.location.pathname='/creator'
}

function getCreatorForm(creator){
    return (<div key={creator.username} className="ac-creator-container" onClick={()=>goToUser(creator.username)}>
        <div className="ac-creator-name">{creator.username}</div>
        <div className="ac-creator-info">Quizzes: {creator.quiz_num}</div>
        <div className="ac-creator-info">Rating: {creator.rating}</div>
    </div>)
}