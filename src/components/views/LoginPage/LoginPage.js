
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, logoutUser,logout_requested } from '../../../_actions/user_action';
import '../../../css/login.scss'
import NavBar from '../NavBar/NavBar';
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
            alert('아디 비번 확인하세요! 에러에용');
            console.error('Async Action Error:', error);
        });
    }
  return (
    <div className='Login'>
    <div className='inner_navbar'>
        <NavBar/>
    </div>
    <div className='login_formbox'>
        <div className='login_inner_formbox'>
            <div className='inner_title'>
                <div className='title'>일기교환클럽<br/>
                                부원 확인 중...</div>
                <img className="pinkBubble"src={process.env.PUBLIC_URL + '/pink.png'} />
            </div>
    <form className='login_formbox_content' onSubmit={onSubmitHandler}>
        <div className='login_card'>
            <div className='login_card_info'>
                <div>ID card</div>
                <div>Diary Exchange<br/>Club</div>
            </div>
            <img className="profile"src={process.env.PUBLIC_URL + '/profile.png'} />
        </div>

        <label>Username</label>
        <input className="login_input"type="text" value={Username} onChange={onUsernameHandler}/>
        <label>Password</label>
        <input className="login_input"type="password" value={Password} onChange={onPasswordHandler}/>

        <div className='login_sub'>
            ※ 본인은 일기교환클럽의 부원임을 증명합니다.
            <img className="stamp"src={process.env.PUBLIC_URL + '/stamp.png'} />
        </div>

        <div className='login_sub2'>
            <Link to={"/register"}>
                ※ 클럽에 등록하고 싶어요.
            </Link>
            <span></span>
            <Link to={"/password"}>
                ※ 증명 암호를 까먹었어요/변경하고 싶어요.
            </Link>
        </div>

        
    </form>
    <button className='login_submit_button' type="submit">
            확인해주세요
    </button>
    </div>
    </div>
    </div>


  
  )

}

export default LoginPage