
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../../../_actions/user_action';
import axios from 'axios';


function LoginPage() {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) =>{
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) =>{
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault()
        console.log(Email+Password)
        if(Email === ""){
            alert("아이디를 입력해주세요")
            return;
        }
        if(Password === ""){
            alert("비밀번호를 입력해주세요")
            return;
        }
        let body = {
            email: Email,
            password: Password
        }

        dispatch(LoginUser(body))//loginUser라는 action
        .then(response => {

            console(response.payload.status)
            if(response.payload.status === 200){
                navigate('/home')
            } else{
                alert('에러에용')
            }
        })
    }
  return (
    <form onSubmit={onSubmitHandler} style={
        { height:'100vh', display:"flex", flexDirection:"column", background:"pink", 
        justifyContent:'center', alignItems:'center'}
    }>
        <label>아이디</label>
        <input type="text" value={Email} onChange={onEmailHandler}/>
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <br/>
        <button type="submit">
            login
        </button>

        <button type="button">
            비번을 잊으셨나요?/ 변경하실래요
        </button>
    </form>


  
  )

}

export default LoginPage