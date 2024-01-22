import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { registerUser } from '../../../_actions/user_action';


function RegisterPage() {

  const dispatch = useDispatch()
  const [Email, setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [Name,setName] = useState("")
  const [UserName,setUserName] = useState("")

  const [ConfirmPassword,setConfirmPassword] = useState("")

  const [EmailCode,setEmailCode] = useState("")//이메일 인증번호
  let [EmailCode_notice, setEmailCode_notice] = useState("")
  const [EmailCode_Send, setEmailCode_Send] = useState("")
  const [EmailCode_Check, setEmailCode_Check] = useState("")


  const [DuplicateEmail,setDuplicateEmail] = useState("")//이메일중복
  const [DuplicateUsername,setDuplicateUsername] = useState("")//닉네임중복


  const navigate = useNavigate();

  const onEmailHandler = (e) =>{
      setEmail(e.currentTarget.value)
  }
  const onNameHandler = (e) => {
    setName(e.currentTarget.value)
  }
  const onUserNameHandler = (e) => {
    setUserName(e.currentTarget.value)
  }
  const onPasswordHandler = (e) => {
     setPassword(e.currentTarget.value)
  }
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
    }


    //중복체크
    const onDuplicateEmailHandler = (e) => {

        const jsonEmail = {"email": Email}
        const emailCheck = axios.post('/join/checkDuplicateEmail', jsonEmail)
        .then(response => response.data)
        console.log(Email)
        console.log(emailCheck)

        if(emailCheck !== "사용 가능한 이메일"){
            return alert('이메일안됨')
        }
     }
     const onDuplicateUserNameHandler = (e) => {
        const usernameCheck = axios.post('/join/checkDuplicateUsername', Name)
        .then(response => response.data)
        console.log(Name)

        if(usernameCheck !== '사용 가능한 닉네임'){
            return alert('중복된 닉네임입니당')
        }
        setDuplicateUsername("success")
     }
     //이메일인증
     const onEmailCodeHandler = (e) => {
        setEmailCode(e.currentTarget.value)
        console.log(EmailCode)
    }
    let Realcode = ""
    const onEmailCode_SendHandler = (e) => {
        if(Email === ""){
            alert("이메일이나쓰삼")
        }
        const sendEmail = {
            email: Email
        }
        setEmailCode_notice("전송햇으니까 확인해서입력ㄱ")
        Realcode = axios.post('/join/mail', sendEmail)
        .then(response => response.data)
        console.log(Realcode)
    }
    const onEmailCode_CheckHandler = (e) => {
        if(EmailCode === ""){//입력 안했을때
            return alert("인증번호를 입력하세요")
        }
        if(EmailCode === Realcode){
            setEmailCode_notice("인증번호 일치하긔")
            setEmailCode_Check("success")
        }
    }


  const onSubmitHandler = (e) => {
      e.preventDefault()
      
      if(Password !== ConfirmPassword){
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
      }//틀리면 아래 진입 불가
      /*
      if(!EmailCode_Check){
        return alert('이메일인증햇어?')
      }
      */
      if(EmailCode_Check && DuplicateUsername && DuplicateEmail === "success" ){
        let body = {
            password: Password,
            nickname: Name,
            email: Email,
            passwordCheck: ConfirmPassword,
            username: UserName
        }
  
        dispatch(registerUser(body))
        .then(response => {
            if(response.payload === '회원가입완료'){
                navigate('/home')
                console.log('회원가입성공땨')
            } else{
                alert('회원가입에러에용')
            }
        })
      }
      else
        return alert("정보다체크해")
  }

  return (//form과 button에 모두 submit주는 이유는, and design때매!
  <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
  display:'flex', justifyContent:'center', alignItems:'center'}}
      >
      
      <form style={{display:"flex", flexDirection:"column"}}
      onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <button onClick={onDuplicateEmailHandler}>이메일중복임?</button>

          <label>nickName</label>
          <input type="text" value={Name} onChange={onNameHandler}/>
          <button onClick={onDuplicateUserNameHandler}>닉네임중복임?</button>

          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>

          <label>Comfirm Password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

          <label>userName</label>
          <input type="text" value={UserName} onChange={onUserNameHandler}/>

          <label>Email Code</label>
          <input type="text" value={EmailCode} onChange={onEmailCodeHandler}/>
          <button onClick={onEmailCode_SendHandler}>인증번호 전송할게용</button>
          <button onClick={onEmailCode_CheckHandler}>인증번호 맞노체크</button>
          <div>{EmailCode_notice}</div>

          <br/>
          <button type="submit">
              회원 가입
          </button>
      </form>   
  </div>
)
}


export default RegisterPage