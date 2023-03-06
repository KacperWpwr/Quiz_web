import {useEffect, useState} from "react";
import {Login, Register} from "../Api/LoginRegister";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function LoginRegister({setIsLogged}){
    const[is_login,setIsLogin] = useState(false)
    useEffect(()=>{
        document.title=is_login? "Sign in":"Sign up"
    },[is_login])
    return(
        <div className="login-register-container">
            <div className="login-register-choice-container">
                <input id="register" type="radio" name="log-reg-input" className="sign-up" onClick={()=>setIsLogin(false)} defaultChecked/>
                <label htmlFor="register" className="log-reg-choice">Sing up</label>
                <input id="login" type="radio" name="log-reg-input" className="sign-in" onClick={()=>setIsLogin(true)}/>
                <label  htmlFor="login" className="log-reg-choice">Sign in</label>
            </div>
            {is_login? <LoginForm setLogged={setIsLogged}/>: <RegisterForm setLogged={setIsLogged}/>}
        </div>
    )
}

