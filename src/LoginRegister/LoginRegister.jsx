import {useState} from "react";

export default function LoginRegister(){
    const[is_login,setIsLogin] = useState(false)

    return(
        <div className="login-register-container">
            <div className="login-register-choice-container">
                <input id="register" type="radio" name="log-reg-input" className="sign-up" onClick={()=>setIsLogin(false)} defaultChecked/>
                <label htmlFor="register" className="log-reg-choice">Sing up</label>
                <input id="login" type="radio" name="log-reg-input" className="sign-in" onClick={()=>setIsLogin(true)}/>
                <label  htmlFor="login" className="log-reg-choice">Sign in</label>
            </div>
            {is_login? getLoginForm():getRegisterForm()}
        </div>
    )
}
function getLoginForm(){
    return(
        <div className="log-inner-container">
            <input type="text" className="log-reg-text" placeholder="Login"/>
            <input type="password" className="log-reg-text" placeholder="Password"/>
            <button className="log-reg-button">Sign in</button>
        </div>
    )
}
function getRegisterForm(){
    return(
        <div className="reg-inner-container">
            <input type="text" className="log-reg-text" placeholder="Login"/>
            <input type="password" className="log-reg-text" placeholder="Password"/>
            <input type="password" className="log-reg-text" placeholder="Repeat Password"/>
            <input type="text" className="log-reg-text" placeholder="Email"/>
            <div id="checkbox-register">
                <input id="reg-check" type="checkbox"/>
                <label htmlFor="reg-check">I have read and accept user terms and terms of service.</label>
            </div>
            <button className="log-reg-button">Sing up</button>
        </div>
    )
}