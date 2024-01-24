
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../../_actions/user_action';


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

        let body = {
            email: Email,
            Password: Password
        }

        dispatch(loginUser(body))//loginUser라는 action
        .then(response => {
            if(response.payload.loginSucess){
                navigate('/')
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
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <br/>
        <button type="submit">
            login
        </button>
    </form>


  
  )

}

export default LoginPage