import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import "./Pages/Quiz/Quizsheet.scss"
import "./Pages/LoginRegister/LoginRegister.scss"
import "./Pages/MainPage/MainPage.scss"
import "./Pages/CreateNewQuiz/CreateNewQuiz.scss"
import "./Pages/Account/Account.scss"
import '@fortawesome/fontawesome-svg-core/styles.css'
import './Pages/Account/AccountInfo/AccountInfo.scss'
import './Pages/Account/UserQuizzes/UserQuizzes.scss'
import './Pages/Account/QuizHistory/QuizHistory.scss'
import './Pages/SearchDisplay/SearchDisplay.scss'
import './Pages/CreatorPage/CreatorPage.scss'
import './Pages/Account/FollowedCreators/FollowedCreators.scss'





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

