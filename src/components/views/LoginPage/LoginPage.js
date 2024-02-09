
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, logoutUser,logout_requested } from '../../../_actions/user_action';
import { LOGOUT_REQUESTED } from '../../../_actions/types';
import store from '../../../_middleware/store'
import axios from 'axios';
import { Link } from 'react-router-dom';


function LoginPage() {
    const dispatch= useDispatch()
  const navigate = useNavigate();
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const onUsernameHandler = (e) =>{
        setUsername(e.currentTarget.value)
    }
    const onPasswordHandler = (e) =>{
        setPassword(e.currentTarget.value)
    }

    //로그아웃
    const onLogoutHandler = () => {
        dispatch(logout_requested())
          .then(response => {
            // 로그아웃이 성공한 경우 여기에 추가적인 처리를 할 수 있습니다.
            console.log(response);
          })
          .catch(error => {
            // 로그아웃 중 에러가 발생한 경우 여기에 처리를 할 수 있습니다.
            console.error('Logout Error:', error);
          });
      };


    const onSubmitHandler = (e) =>{
        e.preventDefault()
        console.log(Username+Password)
        if(Username === ""){
            alert("아이디를 입력해주세요")
            return;
        }
        if(Password === ""){
            alert("비밀번호를 입력해주세요")
            return;
        }
        let body = {
            username: Username,
            password: Password
        }

    // dispatch의 리턴값을 변수에 저장하지 않고 바로 사용
    dispatch(loginUser(body))
        .then(response => {
            if (response.status === 200) {
                alert('로그인 성공했습니다!');
                navigate('/');
            } 
        })
        .catch(error => {
            alert('에러에용');
            console.error('Async Action Error:', error);
        });
    }
  return (
    <form onSubmit={onSubmitHandler} style={
        { height:'100vh', display:"flex", flexDirection:"column", background:"pink", 
        justifyContent:'center', alignItems:'center'}
    }>
        <label>아이디</label>
        <input type="text" value={Username} onChange={onUsernameHandler}/>
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <br/>
        <button type="submit">
            login
        </button>
        <Link to={"/password"}>
            <button type="button">
                비번을 잊으셨나요?/ 변경하실래요
            </button>
        </Link>
        <button type="button" onClick={onLogoutHandler}>
            로그아웃
        </button>
    </form>


  
  )

}

export default LoginPage