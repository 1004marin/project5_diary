
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function PasswordPage() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("이메일을입력하셔요")
    const [EmailCode, setEmailCode] = useState("")
    const [EmailCode_notice, setEmailCode_notice] = useState("")
    const [Realcode, setRealcode] = useState("")
    const [isCodeCheck, setisCodeCheck] = useState(false)

    const [newPassword,setnewPassword] = useState("")
    const [newPasswordConfirm, setnewPasswordConfirm] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    const onEmailCodeHandler = (e) => {
        setEmailCode(e.currentTarget.value)
    }
    const onNewPasswordHandler = (e) => {
        setnewPassword(e.currentTarget.value)
    }
    const onNewPasswordConfirmHandler = (e) => {
        setnewPasswordConfirm(e.currentTarget.value)
    }
    const onEmailCode_SendHandler = () =>{
        const jsonEmail = {
            email: Email
        }
        axios.post('/findPassword/mail', jsonEmail).then(
            response => {
                setRealcode(response.data)
                console.log(Realcode)

                if(Realcode === "존재하지 않는 이메일입니다."){
                    alert("이메일이 없네여")
                }
                else if(Realcode === ""){
                    setEmailCode_notice("메일보냇으니 입력하세요")
                }
            }
        )
    }
    const onEmailCode_CheckHandler = () => {
        if(EmailCode === ""){
            alert("인증번호를 입력해주세용")
        }
        if(EmailCode === Realcode){
            setEmailCode_notice("인증번호가 일치해요")
            setisCodeCheck(true)
        }
        else{
            alert("다시 입력해주세요")
        }
    }
    const onSubmitHandler = () =>{
        if(newPassword !== newPasswordConfirm){
            alert("비번이 일치하지 않네용")
            return;//탈출
        }
        const jsonNewPassword = 
        {
            password: newPassword,
            passwordCheck: newPasswordConfirm,
            email: Email
        }
        axios.post("/findPassword/newPassword", jsonNewPassword).then(
            response => {
                console.log(response.data)
                if(response.data === "비밀번호 변경 성공"){
                    navigate('/home')
                }
                else{
                    alert("동일한 비번이라 안되용")
                }
            }
        )
    }
  return (
    <div style={{backgroundColor:"pink", justifyContent:'center', alignItems:'center', height:'100vh', display: "flex", flexDirection:"column"}}>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <button onClick={onEmailCode_SendHandler}>인증번호 보내기</button>
        <div>{EmailCode_notice}</div>
        <br/>
        <input type="text" value={EmailCode} onChange={onEmailCodeHandler}/>
        <button onClick={onEmailCode_CheckHandler}>인증번호 일치 체크</button>


        <br/>
        <input type="password" value={newPassword} onChange={onNewPasswordHandler}/>
        <input type="password" value={newPasswordConfirm} onChange={onNewPasswordConfirmHandler}/>
        <button type="submit" onClick={onSubmitHandler}>비번 변경</button>

    </div>
  )
}

export default PasswordPage