import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
function MyinfoPage() {

  const [Email, setEmail] = useState("")
  const [Username,setUsername] = useState("")
  const [Nickname,setNickname] = useState("")
  const [BloodType, setBloodType] = useState("")
  const [Motto, setMotto] = useState("")
  const [Address, setAddress] = useState("")
  const [DeletePassword,setDeletePassword] = useState("")

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
        navigate('/login')
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 호출되도록 설정

const onNicknameHandler = (e) =>{
  const updatedNickname = e.currentTarget.value//동기비동기문제
  setNickname(updatedNickname)
  console.log(Nickname)
}
const onBloodTypeHandler = (e) =>{
  setBloodType(e.currentTarget.value)
}
const onMottoHandler = (e) => {
  const updatedMotto = e.currentTarget.value;
  setMotto(updatedMotto);
  console.log(Motto)
};
const onAddressHandler = (e) =>{
  setAddress(e.currentTarget.value)

}
const onDeletePasswordHandler = (e) =>{
  setDeletePassword(e.currentTarget.value)

}


//탈퇴
const onDeleteHandler = () => {

  if(!DeletePassword){
    alert("비번을 입력하세요")

    return
  }
  const storedAccessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

  const params = {
    data: {
      password: DeletePassword
    }
  };

  axios.delete('/api/v1/user', params).then(
    response => {
      console.log(response)
      if(response.data === "회원 탈퇴 성공"){
        alert("탈퇴성공이요")
      }
      navigate('/');
    }
  )
  .catch(error => {
    if(error.response.data.message === '비밀번호가 일치하지 않습니다.'){
      alert(error.response.data.message)
      return
    }
    else{
      alert("탈퇴에러요!")
      console.error("탈퇴에러요:", error)
    }
  })
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


//내정보를 다른 페이지에서도 접근할일이 있나?
//=>다이어리작성할때(나중에 reducer에 저장하기!)
  return (
    <form style={{height:"100vh", backgroundColor:"pink", display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center"}}>
      <label>이메일</label>
      <div style={{width:"20vh", height:"2vh", backgroundColor:"gray"}}>{Email}</div>

      <label>닉네임</label>
      <input type="text" value ={Nickname} onChange={onNicknameHandler}/>

      <label>유저 이름</label>
      <div style={{width:"20vh", height:"2vh", backgroundColor:"gray"}}>{Username}</div>

      <label>혈액형</label>
      <input type="text" value ={BloodType} onChange={onBloodTypeHandler}/>

      <label>모토</label>
      <input type="text" value ={Motto} onChange={onMottoHandler}/>

      <label>주소</label>
      <input type="text" value ={Address} onChange={onAddressHandler}/>

      <br/>
      <button type="submit" onClick={onSubmitHandler}>수정버튼</button>

      <br/>
      <button type="button" onClick={onDeleteHandler}>탈퇴버튼</button>
      <input type="password" value={DeletePassword} onChange={onDeletePasswordHandler}></input>
      
    </form>
  )

  }
export default MyinfoPage