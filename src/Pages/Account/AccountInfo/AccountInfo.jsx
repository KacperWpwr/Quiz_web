import {useEffect, useState} from "react";
import {changeDescription, changeEmail, changeLogin, getAccountInfo} from "../../../Api/Account";
import {createCookie} from "../../../Api/CookieManagement";

export default function AccountInfo(){
    const [is_edit,setIsEdit]= useState(false)
    const [login,setLogin] = useState("")
    const [email,setEmail] = useState("")
    const [description,setDescription]= useState("")
    const [temp_login,setTempLogin] = useState("")
    const [temp_email,setTempEmail] = useState("")
    const [temp_description,setTempDescription] = useState("")

    useEffect(()=>{
        const fetch = async ()=>{
            const result = await getAccountInfo()
            if(result.ok){
                const body = await result.json()
                setLogin(body.login)
                setTempLogin(body.login)
                setEmail(body.email)
                setTempEmail(body.email)
                setDescription(body.description)
                setTempDescription(body.description)

            }else{
                alert("Something went wrong")

            }
        }
        fetch()
    },[])

    const display_button_form=(
        <div className="account-info-edit-button-form">
            <button className="account-info-edit" onClick={()=>{setIsEdit(true)}}>Edit</button>
        </div>
    )
    const edit_button_form=(
        <div className="account-info-edit-button-form">
            <button className="account-info-save" onClick={()=>{save_account_info();setIsEdit(false)}}>Save</button>
            <button className="account-info-cancel" onClick={()=>{setIsEdit(false) ; reset_temps()}}>Cancel</button>
        </div>
    )
    const reset_temps=()=>{
        setTempLogin(login)
        setTempEmail(email)
        setTempDescription(brToNewline(description))
    }
    const save_account_info = ()=>{
        const save = async ()=>{
            let login_ok = true
            let login_error_code=0
            let email_ok = true
            let email_error_code=0
            let description_ok = true

            //Login change fetch
            if(temp_login!==login){
                const response =await changeLogin(temp_login)
                const body = await response.json()
                if(response.ok){
                    setLogin(body.username)
                    setTempLogin(body.username)
                    const date = new Date();
                    date.setDate(new Date()+ 24*60*60*1000)

                    createCookie("credentials",{token:body.token,login:body.username},date,"/")
                }else{
                    login_ok= false
                    login_error_code= body.code
                }
            }

            //email change fetch
            if(temp_email!==email){
                const response = await changeEmail(temp_email)
                const body = await response.json()
                if(response.ok){
                    setEmail(body.email)
                    setTempEmail(body.email)
                }else{
                    email_ok = false
                    email_error_code = body.code
                }
            }

            //description change fetch
            if(temp_description!==description){
                const response = await changeDescription(temp_description)
                const body = await response.json()
                if(response.ok){
                    setDescription(body.description)
                    setTempDescription(body.description)
                }else{
                    description_ok = false
                }
            }

            //Error check
            let message =""
            const invalid_credentials =login_error_code===429||email_error_code===429||!description_ok
            if(invalid_credentials){
                alert("Invalid credentials")
            }else{
                if(!login_ok){
                    message+="Given login is already taken\n"
                }
                if(!email_ok){
                    message+="Given email is already taken"
                }


            }
            if(message!==""){
                alert(message)
            }else{
                alert("Changes are successful")
            }
            setIsEdit(false)



        }
        save()

    }



    return(
        <div className="account-content-display-container">
            <div className="account-info-label">
                <div className="account-info-label-description">
                    Login:
                </div>
                {is_edit? getLoginTextField(temp_login,setTempLogin) : getLoginLabelContext(login)}
            </div>
            <div className="account-info-label">
                <div className="account-info-label-description">
                    Email:
                </div>
                {is_edit ? getEmailTextField(temp_email,setTempEmail) : getEmailLabelContext(email)}
            </div>
            <div className="account-info-account-description-container">
                <div className="account-info-label-description">
                    Description:
                </div>
                {is_edit ? getDescriptionTextField(temp_description,setTempDescription) : getDescription(description)}

            </div>
            {is_edit ? edit_button_form:display_button_form}
        </div>
    )
}
function getLoginLabelContext(login){
    return(
        <div className="account-info-label-context">
            {login}
        </div>
    )
}

function getLoginTextField(temp_login,setTempLogin){
    return(
        <input type="text" value={temp_login} className="account-info-text-field" onChange={(event)=>{setTempLogin(event.target.value)}}/>
    )
}
function getEmailLabelContext(email){
    return(
        <div className="account-info-label-context">
            {email}
        </div>
    )
}
function getEmailTextField(temp_email,setTempEmail){
    return(
        <input type="text" value={temp_email} className="account-info-text-field" onChange={(event)=>{setTempEmail(event.target.value)}}/>
    )

}
function getDescription(description){
    return (
        <div className="account-info-account-description">
            {description}
        </div>
    )
}
function getDescriptionTextField(temp_description,setTempDescription){
    return(
        <textarea  className="account-info-description-textarea" value={temp_description} onChange={(event)=>{setTempDescription(event.target.value)}}/>
    )
}
function newlineToBR(string){
    let splitted = string.split('\n')
    splitted=splitted.map(split=>split+" <br/>")

    let result =''
    splitted.forEach(split=>{
        result= result+split
    })
    return result
}
function brToNewline(string){
    let splitted = string.split('<br/>')
    splitted.map(split=>split+"\n")
    let result =''
    splitted.forEach(split=>{
        result= result+split
    })
    return result
}


