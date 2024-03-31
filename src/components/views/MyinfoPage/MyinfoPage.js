import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Navigate, useNavigate, Link} from 'react-router-dom'

import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu'

import '../../../css/myinfo.scss'
function MyinfoPage() {

  const [Email, setEmail] = useState("")
  const [Username,setUsername] = useState("")
  const [Nickname,setNickname] = useState("")
  const [BloodType, setBloodType] = useState("")
  const [Motto, setMotto] = useState("")
  const [Address, setAddress] = useState("")


  const [isChecked, setIsChecked] = useState(false);//체크박스
  const navigate = useNavigate();
//내 정보 뿌리기

  useEffect(() => {
    //체크
  
    console.log("데이터불러올게요")
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    axios.get('/api/v1/user')
      .then(response => {
        setEmail(response.data.email);
        setUsername(response.data.username);
        setMotto(response.data.motto);
        setBloodType(response.data.bloodType);
        setAddress(response.data.address);
        setNickname(response.data.nickname);
      })
      .catch(error => {
        console.log(error);
        alert("회원 권한이 없슴니당 로그인하셔요")
        //navigate('/login')
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 호출되도록 설정

const onNicknameHandler = (e) =>{
  const updatedNickname = e.currentTarget.value//동기비동기문제
  setNickname(updatedNickname)
  console.log(Nickname)
}
const onBloodTypeHandler = (e) =>{
  setBloodType(e.currentTarget.value);
}



const onMottoHandler = (e) => {
  const updatedMotto = e.currentTarget.value;
  setMotto(updatedMotto);
  console.log(Motto)
};
const onAddressHandler = (e) =>{
  setAddress(e.currentTarget.value)

}

const onSubmitHandler = (e) => {
  e.preventDefault(); // 새로 고침 방지
  console.log("데이터보낼게요")
    const body = {
    "address": Address,
    "bloodType": BloodType,
    "motto": Motto,
    "nickname": Nickname
  };
  const storedAccessToken = localStorage.getItem("accessToken");
  const storedRefreshToken = localStorage.getItem("refreshToken");
  
  console.log(storedAccessToken)
  console.log(storedRefreshToken)
  console.log(body)

  axios.patch("/api/v1/user", body)
    .then(response => {
      const update = response.data;
      console.log(update);

      if (update === "업데이트 성공") {
        alert("업데이트에 성공하였습니다.");
      } else {
        // 서버로부터 다른 응답이 온 경우에 대한 처리 추가
        alert("업데이트에 실패하였습니다. 다시 시도해주세요.");
      }
    })
    .catch(error => {
      console.error('Error from server:', error);
      // 서버로의 요청에서 오류가 발생한 경우 콘솔에 오류 메시지 출력
      alert("서버 오류가 발생하였습니다.");
    });
};
const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
};


//내정보를 다른 페이지에서도 접근할일이 있나?
//=>다이어리작성할때(나중에 reducer에 저장하기!)
  return (
<div className='Myinfo'>
    
    <div className='inner_navbar'>
        <NavBar/>
    </div>
    <div className='myinfo_formbox'>
        <div className='moblie_menu'>
            <SlideMenu/>
        </div>
        <div className='myinfo_inner_formbox'>
            <div className='inner_title'>
                <div className='title'>일기교환클럽<br/>
                자기 소개서<span>(笑)</span>
                </div>
                <img className="myinfo_pinkBubble"src={process.env.PUBLIC_URL + '/profile.png'} />
            </div>
              <form className='myinfo_formbox_content'>
                <label>Email</label>
                <div className='myinfo_fixed_input'>{Email}하이</div>

                <label>Username</label>
                <div className='myinfo_fixed_input'>{Username}gd하이</div>

                <label>Nickname</label>
                <input type="text" value ={Nickname} onChange={onNicknameHandler}/>



                <label>BloodType</label>
                <input type="text" value ={BloodType} onChange={onBloodTypeHandler}/>
                <div className="radio-container">
                  <label style={{display:"flex"}}>
                  <span className='radio_icon'></span>
                    <input type="radio" name="option" value="A" checked={BloodType === "A"} onChange={onBloodTypeHandler} />
                    A형
                  </label>
                  <span className='radio_icon'></span>
                  <label>
                    <input type="radio" name="option" value="B" checked={BloodType === "B"} onChange={onBloodTypeHandler} />
                    B형
                  </label>
                  <span className='radio_icon'></span>
                  <label>
                    <input type="radio" name="option" value="O" checked={BloodType === "O"} onChange={onBloodTypeHandler} />
                    O형
                  </label>
                  <span className='radio_icon'></span>
                  <label>
                    <input type="radio" name="option" value="AB" checked={BloodType === "AB"} onChange={onBloodTypeHandler} />
                    AB형
                  </label>
                </div>
                <label>Motto</label>
                <input type="text" value ={Motto} onChange={onMottoHandler}/>

                <label>Address</label>
                <input type="text" value ={Address} onChange={onAddressHandler}/>

                <Link to='/myinfoDelete'>
                  <div className='quit'>※ 클럽을 그만둘래요</div>
                </Link>

                <button className="myinfo_submit_button"type="submit" onClick={onSubmitHandler}>수정버튼</button>



              </form>
            </div>
    </div>
    </div>
  )

  }
export default MyinfoPage