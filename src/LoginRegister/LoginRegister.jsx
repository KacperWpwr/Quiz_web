import {useState} from "react";
import {Login, Register} from "../Api/LoginRegister";

export default function LoginRegister({setIsLogged}){
    const[is_login,setIsLogin] = useState(false)
    const setlogged = ()=>{
        console.log("user is logged")
        setIsLogged(true)
    }
    return(
        <div className="login-register-container">
            <div className="login-register-choice-container">
                <input id="register" type="radio" name="log-reg-input" className="sign-up" onClick={()=>setIsLogin(false)} defaultChecked/>
                <label htmlFor="register" className="log-reg-choice">Sing up</label>
                <input id="login" type="radio" name="log-reg-input" className="sign-in" onClick={()=>setIsLogin(true)}/>
                <label  htmlFor="login" className="log-reg-choice">Sign in</label>
            </div>
            {is_login? getLoginForm(setIsLogged):getRegisterForm(setIsLogged)}
        </div>
    )
}
function getLoginForm(setLogged){
    return(
        <div className="log-inner-container">
            <input id="login-login-input" type="text" className="log-reg-text" placeholder="Login"/>
            <input id="login-password-input" type="password" className="log-reg-text" placeholder="Password"/>
            <button className="log-reg-button" onClick={()=>{loginFunction(setLogged)}}>Sign in</button>
        </div>
    )
}


function loginFunction(setLogged){
    const login = document.getElementById("login-login-input").value
    const password = document.getElementById("login-password-input").value
    const login_func= async ()=>{
        const res = await Login(login,password)
        if(res){
            setLogged(true)
            document.location.pathname="/"
        }
    }
    login_func()

}
function getRegisterForm(setLogged){
    return(
        <div className="reg-inner-container">
            <input id="register-login-input" type="text" className="log-reg-text" placeholder="Login"/>
            <input id="register-password-input" type="password" className="log-reg-text" placeholder="Password"/>
            <input id="register-match-password-input" type="password" className="log-reg-text" placeholder="Repeat Password"/>
            <input id="register-email-input" type="text" className="log-reg-text" placeholder="Email"/>
            <div id="checkbox-register">
                <input id="reg-check" type="checkbox"/>
                <label htmlFor="reg-check">I have read and accept user terms and terms of service.</label>
            </div>
            <button className="log-reg-button" onClick={()=>{registerFunction(setLogged)}}>Sing up</button>
        </div>
    )
}
function registerFunction(setLogged){

    const login = document.getElementById("register-login-input").value
    const password = document.getElementById("register-password-input").value
    const match_password = document.getElementById("register-match-password-input").value
    const email = document.getElementById("register-email-input").value
    const register_func = async ()=>{
        const res = await Register(login,password,match_password,email,setLogged)
        if(res.value){
            setLogged(true)
            document.location.pathname="/"
        }
    }
    register_func()

}