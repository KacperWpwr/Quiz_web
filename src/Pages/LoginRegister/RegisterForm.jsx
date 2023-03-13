import {Register} from "../../Api/LoginRegister";
import {useState} from "react";
import {createCookie} from "../../Api/CookieManagement";

export default function RegisterForm({setLogged}){
    const [login_correct,setLoginCorrect]= useState(true)
    const [login_error,setLoginError]= useState("")
    const [password_correct,setPasswordCorrect]= useState(true)
    const [password_error,setPasswordError]= useState("")
    const [email_correct,setEmailCorrect]= useState(true)
    const [email_error,setEmailError]= useState("")
    const register_props={
        setLoginCorrect:setLoginCorrect,
        setLoginError:setLoginError,
        setPasswordCorrect:setPasswordCorrect,
        setPasswordError:setPasswordError,
        setEmailCorrect:setEmailCorrect,
        setEmailError:setEmailError
    }
    return(
        <div className="reg-inner-container">
            <div className="log-reg-text-container">
                <input id="register-login-input" type="text" className={getClass(login_correct)} placeholder="Login"/>
                <div className="log-reg-error-feedback">{login_error}</div>
            </div>
            <div className="log-reg-text-container">
                <input id="register-password-input" type="password" className={getClass(password_correct)} placeholder="Password"/>
                <div className="log-reg-error-feedback">{password_error}</div>
            </div>
            <div className="log-reg-text-container">
                <input id="register-match-password-input" type="password" className={getClass(password_correct)} placeholder="Repeat Password"/>
                <div className="log-reg-error-feedback">{password_error}</div>
            </div>
            <div className="log-reg-text-container">
                <input id="register-email-input" type="text" className={getClass(email_correct)} placeholder="Email"/>
                <div className="log-reg-error-feedback">{email_error}</div>
            </div>




            <div id="checkbox-register">
                <input id="reg-check" type="checkbox"/>
                <label htmlFor="reg-check">I have read and accept user terms and terms of service.</label>
            </div>
            <button className="log-reg-button" onClick={()=>{registerFunction(setLogged,register_props)}}>Sing up</button>
        </div>
    )
}
function getClass(is_correct){
    let className = "log-reg-text"
    if(!is_correct){
        className= className+" wrong"
    }
    return className
}

function registerFunction(setLogged,register_props){
    register_props.setLoginCorrect(true)
    register_props.setLoginError("")
    register_props.setPasswordCorrect(true)
    register_props.setPasswordError("")
    register_props.setEmailCorrect(true)
    register_props.setEmailError("")

    const login = document.getElementById("register-login-input").value
    const password = document.getElementById("register-password-input").value
    const match_password = document.getElementById("register-match-password-input").value
    const email = document.getElementById("register-email-input").value


    const register_func = async ()=>{
        const response = await Register(login,password,match_password,email,setLogged)
        const body = await response.json()
        if(response.ok){
            const date = new Date();
            date.setDate(new Date()+ 24*60*60*1000)
            createCookie("credentials",{token:body.token,login:login},date,"/")
            setLogged(true)
            document.location.pathname="/"
        }else{
            switch (body.code){
                case 425:
                    register_props.setLoginCorrect(false)
                    register_props.setLoginError(body.message)
                    break;
                case 426:
                    register_props.setPasswordCorrect(false)
                    register_props.setPasswordError(body.message)
                    break ;
                case 427:
                    register_props.setEmailCorrect(false)
                    register_props.setEmailError(body.message)
                    break;
            }
        }



    }
    register_func()

}