import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import "./Quiz/Quizsheet.scss"
import "./LoginRegister/LoginRegister.scss"
import "./MainPage/MainPage.scss"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

