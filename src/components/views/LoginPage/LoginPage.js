
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';



function LoginPage() {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password,setPassword] = useState("")

    const navigate = useNavigate();

    const onEmailHandler = (e) =>{
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
       setPassword(e.currentTarget.value)
    }


    const onSubmitHandler = (e) => {
        e.preventDefault()//없으면 login클릭시 refresh됨. 원래 해야할 일들을 하지 못하고 새고해버림!
        
        let body = {
            email: Email,
            password: Password
        }
        //dispatch: action을 발생시켜주는 함수
        dispatch(loginUser(body))//loginUser라는 action
        .then(response => {
            if(response.payload.loginSucess){
                navigate('/')
            } else{
                alert('에러에용')
            }
        })

    }


  return (//form과 button에 모두 submit주는 이유는, and design때매!
    <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
    display:'flex', justifyContent:'center', alignItems:'center'}}
        >
        
        <form style={{display:"flex", flexDirection:"column"}}
        onSubmit={onSubmitHandler}>
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>

            <br/>
            <button type="submit">
                login
            </button>
        </form>   
    </div>
  )
}

export default LoginPage