import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { registerUser } from '../../../_actions/user_action';
import '../../../css/register.scss'
import NavBar from '../NavBar/NavBar';

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
    const [isChecked, setIsChecked] = useState(false);//체크박스
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
    

    //이메일중복체크
    const onDuplicateEmailHandler = (e) => {
        if(Email === ""){
            alert("이메일입력해")
            return;
        }
        const jsonEmail = {"email": Email}
        axios.post('/duplicateEmail', jsonEmail)
        .then(response => {
        const emailCheck = response.data;

        console.log(emailCheck)
        if(emailCheck === "사용 가능한 이메일"){

            setEmailDuplicate_notice("기존 부원과 겹치지 않아요.")
            setDuplicateEmail("success")


            const codeResponse = axios.post('/mail', jsonEmail)
            setRealcode(codeResponse.data)
            setEmailCode_notice("인증 메일을 보냈어요.")

        }})
        .catch(error=>{
            console.log(error)
            if(error.response.data.message==="이미 존재하는 이메일입니다."){
                setEmailDuplicate_notice("이미 해당 메일을 가진 부원이 있어요.")
            }
            else{
                return alert('이메일 중복 체크 에러')
            }
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
                setNameDuplicate_notice("처음 온 부원이네요.")
                return;
            }
            else { 
                console.log(nameCheck)
                console.log(response.status)
                console.log("이건 불 가능할때요")
                setDuplicateUsername("false")
                setNameDuplicate_notice("이미 존재하는 부원이에요.")
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
            console.log(response)
            if(response.payload === '회원 가입 완료'){
                navigate('/')
                alert('회원가입성공땨')
            } else{
                alert('회원가입에러에용')
            }
        })
      }
      else(alert("다채운거맞아?>"))
  }

  return (//form과 button에 모두 submit주는 이유는, and design때매!
  <div className='RegisterBox'>
    <div className='inner_navbar'>
        <NavBar/>
    </div>
      <form
      onSubmit={onSubmitHandler} className='formBox'>
        <div className='inner_formBox'>
            <div className='inner_formBox_title'>
                <div className='title'>일기교환클럽<br/>
                    입부 신청서...</div>
                <img className="letter"src={process.env.PUBLIC_URL + '/letter.png'} />
            </div>
            <div className='inner_formBox_content'>

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <button type="button"onClick={onDuplicateEmailHandler}>인증번호 전송해주세요</button>
                <div className='margin_bottom'>{EmailDuplicate_notice}</div>

                <label>Email Code</label>
                <input type="text" value={EmailCode} onChange={onEmailCodeHandler}/>
                <button type="button"onClick={onEmailCode_CheckHandler}>제가 잘 입력했나요?</button>
                <div>{EmailCode_notice}</div>
                <div className='margin_bottom'>{EmailCodeCheck_notice}</div>

                <label>Username</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <button type="button"onClick={onDuplicateUserNameHandler}>이미 부원인가요?</button>
                <div className='margin_bottom'>{NameDuplicate_notice}</div>

                <label>Password</label>
                <input className='margin_bottom'type="password" value={Password} onChange={onPasswordHandler}/>

                <label>Comfirm Password</label>
                <input className='margin_bottom'type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <label className='register_agree'>
                    <input
                    className='check'
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    />
                    <span className='check_icon'></span>
                    <span className='check_text'>※ 일기교환클럽 부원이 되는 것에 맹세합니다.</span>
                </label>

            </div>
            <button type="submit" className='register_submit_button'>
                    받아주세요
            </button> 
        </div>
      </form>   
  </div>
)
}


export default RegisterPage