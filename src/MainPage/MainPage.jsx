import {Page} from "../PageEnum";


export default function MainPage({setPage}){
    return(
        <div className="main-page-container">
            <div className="main-page-first-batch">
                <div className="main-page-last-quizes">
                    <div className="main-page-section-name"> Recent quizes</div>
                    <div className="main-page-last-quizes-display">
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
                    <div>

                    </div>
                </div>
            </div>
            <div className="main-page-users-followed">
                <div className="main-page-section-name">Followed creators </div>
                <div>

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