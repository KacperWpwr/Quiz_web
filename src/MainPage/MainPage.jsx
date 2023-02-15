import {Page} from "../PageEnum";


export default function MainPage({setPage}){
    return(
        <div className="main-page-container">
            <div className="main-page-first-batch">
                <div className="main-page-last-quizes">
                    <div className="main-page-section-name"> Recent quizes</div>
                    <div className="main-page-quizes-display">
                        <div>
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                        </div>
                    </div>
                </div>
                <div className="main-page-mentions">
                    <div className="main-page-section-name">Quizes you might like</div>
                    <div className="main-page-quizes-display">
                        <div>
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                            {generate_quiz_sheet(setPage)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-page-users-followed">
                <div className="main-page-section-name">Followed creators </div>
                <div className="main-page-creator-display">
                    <div>
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                        {generate_creator_sheet()}
                    </div>
                </div>
            </div>
        </div>
    )
}

function generate_quiz_sheet(setPage){
    return(
        <button className="main-page-quiz-profile" onClick={()=>{setPage(Page.QuizPage)}}>
            <div className="main-page-quiz-name">Quiz Name</div>
            <div>
                <div className="main-page-quiz-info-label">Author name: </div>
                <div className="main-page-quiz-info">Author name </div>
            </div>
            <div>
                <div className="main-page-quiz-info-label">Number of questions </div>
                <div className="main-page-quiz-info">10</div>
            </div>

        </button>
    )
}
function generate_creator_sheet(){
    return(
        <button className="main-page-creator-profile">
            <div className="main-page-creator-profile-pic-container">
                <img src="public/empty.jpg" className="main-page-creator-profile-pic"/>
            </div>
            <div className="main-page-profile-info-container">
                <div className="main-page-profile-name">Profile name</div>
                <div className="main-page-profile-info">Number of quizes: 0</div>
            </div>
        </button>
    )
}