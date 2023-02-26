import {Page} from "../PageEnum";
import {findAllByDisplayValue} from "@testing-library/react";
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

 const quizes =   [new Quiz_Information("My First Quiz","Admin",30),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10),new Quiz_Information("Some Quiz Name","Some Author",10)]

 const profiles =[new Profile_Info("Admin",7),new Profile_Info("User3",3),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4),new Profile_Info("Person",4)]

export default function MainPage(){

    return(
        <div className="main-page-container">
            <div className="main-page-first-batch">
                <div className="main-page-last-quizzes">
                    <div className="main-page-section-name"> Recent quizes</div>
                    <div className="main-page-quizzes-display">
                        <div>
                            {quizes.map(quiz=>{return generate_quiz_sheet(quiz)})}
                        </div>
                    </div>
                </div>
                <div className="main-page-mentions">
                    <div className="main-page-section-name">Quizes you might like</div>
                    <div className="main-page-quizzes-display">
                        <div>
                            {quizes.map(quiz=>{return generate_quiz_sheet(quiz)})}
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-page-users-followed">
                <div className="main-page-section-name">Followed creators </div>
                <div className="main-page-creator-display">
                    <div>
                        {profiles.map(profile=>{return generate_creator_sheet(profile)})}
                    </div>
                </div>
            </div>
        </div>
    )
}

function generate_quiz_sheet(quiz_info){
    return(
        <button className="main-page-quiz-profile" onClick={()=>{window.location="/quiz"}}>
            <div className="main-page-quiz-name">{quiz_info.quiz_name}</div>
            <div>
                <div className="main-page-quiz-info-label">Author name: </div>
                <div className="main-page-quiz-info">{quiz_info.author_name} </div>
            </div>
            <div>
                <div className="main-page-quiz-info-label">Number of questions </div>
                <div className="main-page-quiz-info">{quiz_info.question_number}</div>
            </div>

        </button>
    )
}
function generate_creator_sheet(profile){
    return(
        <button className="main-page-creator-profile">
            <div className="main-page-creator-profile-pic-container">
                <img src="public/empty.jpg" className="main-page-creator-profile-pic"/>
            </div>
            <div className="main-page-profile-info-container">
                <div className="main-page-profile-name">{profile.name}</div>
                <div className="main-page-profile-info">Number of quizes: {profile.quiz_number}</div>
            </div>
        </button>
    )
}