import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {

  const dispatch = useDispatch()
  const [Email, setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [Name,setName] = useState("")
  const [ConfirmPassword,setConfirmPassword] = useState("")

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



  const onSubmitHandler = (e) => {
      e.preventDefault()
      
      if(Password !== ConfirmPassword){
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
      }//틀리면 아래 진입 불가
    

      let body = {
          email: Email,
          password: Password,
          name: Name
      }

      dispatch(registerUser(body))
      .then(response => {
          if(response.payload.success){
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
          <input type="email" value={Email} onChange={onEmailHandler} />

          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler}/>

          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>

          <label>Comfirm Password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

          <br/>
          <button type="submit">
              회원 가입
          </button>
      </form>   
  </div>
)
}


export default RegisterPage