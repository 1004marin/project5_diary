
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu';
import '../../../css/password.scss'
import CONFIG from "./config";

function PasswordPage() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("")
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
    const validateEmail = (Email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(Email);
      };

    const onEmailCode_SendHandler = () =>{
        //이메일형식
         if (!validateEmail(Email)) {
            alert('올바른 이메일 형식이 아니에요.');
            return;
        } 
        const jsonEmail = {
            email: Email
        }
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        axios.post(`${CONFIG.API_BASE_URL}/newPassword/mail`, jsonEmail)
        .then(
            response => {
                setRealcode(response.data)
                console.log(Realcode)

                setEmailCode_notice("메일 보냈으니 입력하세요")
            })
        .catch(error=>{
            if(error.response.data.message === "존재하지 않는 이메일입니다."){
                alert("존재하지 않는 이메일이에요")
            }
            else{
                alert('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
            }
        })

            
        
    }
    const onEmailCode_CheckHandler = () => {
        if(EmailCode === ""){
            alert("인증번호를 입력해주세요")
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
        if(!newPassword || !newPasswordConfirm){
            alert("비번을 입력해주세요!")
            return;//탈출
        }
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
        axios.post(`${CONFIG.API_BASE_URL}/newPassword`, jsonNewPassword)
        .then(
            response => {
                console.log(response)
                
                if(response.data === "비밀번호 변경 성공"){
                    navigate('/diaryList')
                }
            }
        ).catch(
            error => {
                if(error.response.data.message === "동일한 비밀번호로 변경할 수 없습니다."){
                    alert("동일한 비번이라 변경이 불가능해요")
                }
                else{
                    alert("서버에 에러가 발생했어요")
                    //console.log(error)
                }
            }
        )
    }
  return (
    <div className='Password'>
        <div className='inner_navbar'>
            <NavBar/>
        </div>
        <div className='password_formbox'>
        <div className='moblie_menu'>
            <SlideMenu/>
        </div>
            <div className='password_inner_formbox'>
                <div className='inner_title'>
                        <div className='title'>일기교환클럽<br/>
                            암호 변경 부서...</div>
                        <img className="password_pinkBubble"src={process.env.PUBLIC_URL + '/pink.png'} />
                </div>
                <div className='password_formbox_content'>
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler}/>
                    <button  onClick={onEmailCode_SendHandler}>인증번호 보내주세요</button>
                    <div className="margin_bottom">{EmailCode_notice}</div>

                    <label>Email Code</label>
                    <input type="text" value={EmailCode} onChange={onEmailCodeHandler}/>
                    <button className="margin_bottom"onClick={onEmailCode_CheckHandler}>제가 잘 입력했나요?</button>


                    <label>Password</label>
                    <input className="margin_bottom" type="password" value={newPassword} onChange={onNewPasswordHandler}/>
                    <label>Confirm Password</label>
                    <input className="margin_bottom" type="password" value={newPasswordConfirm} onChange={onNewPasswordConfirmHandler}/>
                </div>
                <button className="submit_button" type="submit" onClick={onSubmitHandler}>변경할래요</button>
            </div>
            
        </div>



    </div>
  )
}

export default PasswordPage