import api_path from "./Path";
import {createCookie} from "./CookieManagement";

const login_path="/user/auth/login"
const register_path="/user/auth/register"
export  const  Login = async (login, password)  =>{
    const credentials={
        login:login,
        password:password
    }
    const path=api_path.api_path+login_path
    console.log("path: "+path)
    return await fetch(path,{
        mode:"cors",
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(credentials)
    }).then(response=>{
        if(response.ok){
            return response.json()
        }else{
            console.log(response)
            return false;
        }
    }).then(data=>{
        if(data!==false){
            const date = new Date();
            date.setDate(new Date()+ 24*60*60*1000)
            console.log(credentials)
            createCookie("credentials",data.token,date,"/")
            return true;
        }
        return false;
    })
}
export const Register = async (login,password,match_password,email)=>{
    const register_request = {
        login:login,
        password:password,
        match_password:match_password,
        email:email
    }
    console.log(register_request)
    const path = api_path.api_path+register_path
    return await fetch(path,{
        mode:"cors",
        method:'POST',
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(register_request)
    }).then((response)=>{
        if(response.ok){
            console.log(response)
            return response.json()

        }else{
            return false
        }
    }).then((data)=>{
        if(data!==false) {
            const date = new Date();
            date.setDate(new Date()+ 24*60*60*1000)

            createCookie("credentials",data.token,date,"/")
            document.location.pathname="/"
            return true;

        }else{
            console.log("Failure")
            return false;
        }
    })
}