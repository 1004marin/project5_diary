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


  const [ConfirmPassword,setConfirmPassword] = useState("")

  const [EmailCode,setEmailCode] = useState("")//이메일 인증번호
  let [EmailCode_notice, setEmailCode_notice] = useState("")
  let [EmailCodeCheck_notice, setEmailCodeCheck_notice] = useState("")
  const [Realcode, setRealcode] = useState("")
  const [EmailCode_Check, setEmailCode_Check] = useState("")


  const [DuplicateEmail,setDuplicateEmail] = useState("")//이메일중복
  const [DuplicateUsername,setDuplicateUsername] = useState("")//닉네임중복
  const [EmailDuplicate_notice,setEmailDuplicate_notice] = useState("")//이메일중복
  const [NameDuplicate_notice,setNameDuplicate_notice] = useState("")//닉네임중복


  const navigate = useNavigate();

  const onEmailHandler = (e) =>{
      setEmail(e.currentTarget.value)
  }
  const onNameHandler = (e) => {
    setName(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
     setPassword(e.currentTarget.value)
  }
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
    }


    //이메일중복체크
    const onDuplicateEmailHandler = (e) => {
        if(Email === ""){
            alert("이메일입력해")
            return;//탈출
        }
        const jsonEmail = {"email": Email}
        axios.post('/duplicateEmail', jsonEmail)
        .then(response => {
        const emailCheck = response.data;

        console.log(emailCheck)
        if(emailCheck === "사용 가능한 이메일"){
            setEmailDuplicate_notice("추카 이메일사용가능")
            setDuplicateEmail("success")
        }
        else return alert('이메일안됨')
        })
     }
     //닉네임중복체크
     const onDuplicateUserNameHandler = (e) => {
        if(Name === ""){
            alert("닉네임을 입력하세용")
            return;//탈출
        }
        const jsonName = {"username" : Name}
        console.log(Name)

        axios.post('/duplicateUsername', jsonName)
        .then(response => {

            const nameCheck = response.data; //데이터

            if(response.status === 200){
                console.log(nameCheck)
                console.log(response.status)
                console.log("이건 가능할때요")
                setDuplicateUsername("success")
                return;
            }
            else { 
                console.log(nameCheck)
                console.log(response.status)
                console.log("이건 불 가능할때요")
                setDuplicateUsername("false")
            }
            }
        )
        .catch( err => {
            console.log(err)
        }
        )
        //console.log(Name)
    }


     //이메일인증
     const onEmailCodeHandler = (e) => {
        setEmailCode(e.currentTarget.value)
    }
    const onEmailCode_SendHandler = async(e) => {
        if(Email === ""){
            alert("이메일이나쓰삼")
        }
        else{
        const jsonSendEmail = {email: Email}

            setEmailCode_notice("전송햇으니까 확인해서입력ㄱ")
            const codeResponse = await axios.post('/mail', jsonSendEmail)
            setRealcode(codeResponse.data)
            console.log(Realcode)
        }
        }

    const onEmailCode_CheckHandler = () => {
        console.log(Realcode)
        if(EmailCode === ""){//입력 안했을때
            return alert("인증번호를 입력하세요")
        }
        if(EmailCode === Realcode){
            setEmailCodeCheck_notice("인증번호 일치하긔")
            setEmailCode_Check("success")
        }
        else{
            return setEmailCode_notice("인증번호를 다시 체크해주세요")
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
            username: Name,
            email: Email,
            passwordCheck: ConfirmPassword
        }
  
        dispatch(registerUser(body))
        .then(response => {
            console.log(response.payload)
            if(response.payload === '회원 가입 완료'){
                navigate('/home')
                console.log('회원가입성공땨')
            } else{
                alert('회원가입에러에용')
            }
        })
      }
      else(alert("다채운거맞아?>"))
  }

  return (//form과 button에 모두 submit주는 이유는, and design때매!
  <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
  display:'flex', justifyContent:'center', alignItems:'center'}}
      >
      
      <form style={{display:"flex", flexDirection:"column"}}
      onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <button type="button"onClick={onDuplicateEmailHandler}>이메일중복임?</button>
          <div>{EmailDuplicate_notice}</div>

          <label>nickName</label>
          <input type="text" value={Name} onChange={onNameHandler}/>
          <button type="button"onClick={onDuplicateUserNameHandler}>닉네임중복임?</button>
          <div>{NameDuplicate_notice}</div>

          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>

          <label>Comfirm Password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

          <label>Email Code</label>
          <input type="text" value={EmailCode} onChange={onEmailCodeHandler}/>
          <button type="button"onClick={onEmailCode_SendHandler}>인증번호 전송할게용</button>
          <button type="button"onClick={onEmailCode_CheckHandler}>인증번호 맞노체크</button>
          <div>{EmailCode_notice}</div>
          <div>{EmailCodeCheck_notice}</div>

          <br/>
          <button type="submit">
              회원 가입
          </button>
      </form>   
  </div>
)
}


export default RegisterPage