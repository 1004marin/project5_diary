
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../css/password.scss'
import NavBar from '../NavBar/NavBar';

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
        axios.post('/newPassword/mail', jsonEmail).then(
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
        axios.post("/newPassword", jsonNewPassword).then(
            response => {
                //이거 수정해야함. result뭐받아오는지
                const result = response.data
                console.log(result)
                /*
                if(result.response.data.message === "비밀번호 변경 성공"){
                    navigate('/home')
                }
                else if(result.response.data.message === '동일한 비밀번호로 변경할 수 없습니다.'){
                    alert("동일한 비번이라 안되용")
                }
                */
            }
        )
    }
  return (
    <div className='Password'>
        <div className='inner_navber'>
            <NavBar/>
        </div>
        <div className='formbox'>
            <div className='inner_formbox'>
                <div className='inner_formBox_title'>
                        <div className='title'>일기교환클럽<br/>
                            암호 변경 부서...</div>
                        <img className="letter"src={process.env.PUBLIC_URL + '/letter.png'} />
                    </div>
                <div className='password_formbox'>
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler}/>
                    <button onClick={onEmailCode_SendHandler}>인증번호 보내주세요</button>
                    <div>{EmailCode_notice}보냇어용</div>

                    <label>Email Code</label>
                    <input type="text" value={EmailCode} onChange={onEmailCodeHandler}/>
                    <button onClick={onEmailCode_CheckHandler}>제가 잘 입력했나요?</button>


                    <label>Password</label>
                    <input type="password" value={newPassword} onChange={onNewPasswordHandler}/>
                    <label>Confirm Password</label>
                    <input type="password" value={newPasswordConfirm} onChange={onNewPasswordConfirmHandler}/>
                    <button type="submit" onClick={onSubmitHandler}>변경할래요</button>
                </div>
            </div>
            
        </div>



    </div>
  )
}

export default PasswordPage