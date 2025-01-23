import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Navigate, useNavigate, Link} from 'react-router-dom'

import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu'
import CONFIG from "./config";
import '../../../css/myinfo.scss'
function MyinfoPage() {

  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Username,setUsername] = useState("")
  const [Nickname,setNickname] = useState("")
  const [BloodType, setBloodType] = useState("")
  const [Motto, setMotto] = useState("")
  const [Address, setAddress] = useState("")

//내 정보 뿌리기

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    axios.get(`${CONFIG.API_BASE_URL}/api/v1/user`)
      .then(response => {
        setEmail(response.data.email);
        setUsername(response.data.username);
        setMotto(response.data.motto);
        setBloodType(response.data.bloodType || null); // null 처리
        setAddress(response.data.address);
        setNickname(response.data.nickname);
      })
      .catch(error => {
        alert("권한이 없습니다. 부원 인증을 해주세요!")
        navigate('/')
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 호출되도록 설정

const onNicknameHandler = (e) =>{
  const updatedNickname = e.currentTarget.value//동기비동기문제
  setNickname(updatedNickname)
}
const onBloodTypeHandler = (e) =>{
  setBloodType(e.currentTarget.value);
}



const onMottoHandler = (e) => {
  const updatedMotto = e.currentTarget.value;
  setMotto(updatedMotto);
};
const onAddressHandler = (e) =>{
  setAddress(e.currentTarget.value)

}

const onSubmitHandler = (e) => {
  e.preventDefault(); // 새로 고침 방지
  const body = {
    "address": Address,
    "motto": Motto,
    "nickname": Nickname,
  };
  if (BloodType === null) {
    body.bloodType = "NONE";
  }
  else{
    body.bloodType = BloodType;
  }
  const storedAccessToken = localStorage.getItem("accessToken");
  const storedRefreshToken = localStorage.getItem("refreshToken");

  axios.patch(`${CONFIG.API_BASE_URL}/api/v1/user`, body)
    .then(response => {
      const update = response.data;

      if (update === "업데이트 성공") {
        alert("내 정보 업데이트에 성공하였습니다!");
      } else {
        // 서버로부터 다른 응답이 온 경우에 대한 처리 추가
        alert("업데이트에 실패하였습니다. 다시 시도해주세요ㅜ^ㅜ");
      }
    })
    .catch(error => {
      console.log(body)
      console.log("업뎃실패에요", error)
      // 서버로의 요청에서 오류가 발생한 경우 콘솔에 오류 메시지 출력
      alert("서버 오류가 발생하였습니다ㅜ^ㅜ");

    });
};



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
                <div className='myinfo_fixed_input'>{Email}</div>

                <label>Username</label>
                <div className='myinfo_fixed_input'>{Username}</div>

                <label>Nickname</label>
                <input type="text" value ={Nickname} onChange={onNicknameHandler} maxLength={10}/>

                <div className="radio-container">
                  <label>
                    <input type="radio" name="option" value="A" checked={BloodType === "A"} onChange={onBloodTypeHandler} />
                    <span className='radio_icon'></span>
                    A형
                  </label>

                  <label>

                    <input type="radio" name="option" value="B" checked={BloodType === "B"} onChange={onBloodTypeHandler} />
                    <span className='radio_icon'></span>
                    B형
                  </label>

                  <label>
                    <input type="radio" name="option" value="O" checked={BloodType === "O"} onChange={onBloodTypeHandler} />
                    <span className='radio_icon'></span>
                    O형
                  </label>


                  <label>
                    <input type="radio" name="option" value="AB" checked={BloodType === "AB"} onChange={onBloodTypeHandler} />
                    <span className='radio_icon'></span>
                    AB형
                  </label>
                </div>
                
                
                <label>Motto</label>
                <input type="text" value ={Motto} onChange={onMottoHandler} maxLength={25}/>

                <label>Address</label>
                <input type="text" value ={Address} onChange={onAddressHandler} maxLength={35}/>

                <Link to='/myinfoDelete'>
                  <div className='quit'>※ 클럽을 그만둘래요</div>
                </Link>
              </form>
              <button className="myinfo_submit_button" type="submit" onClick={onSubmitHandler}>수정할래요</button>
            </div>
    </div>
    </div>
  )

  }
export default MyinfoPage