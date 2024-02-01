import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function MyinfoPage() {

  const [Email, setEmail] = useState("")
  const [Username,setUsername] = useState("")
  const [Nickname,setNickname] = useState("")
  const [BloodType, setBloodType] = useState("")
  const [Motto, setMotto] = useState("")
  const [Address, setAddress] = useState("")

//내 정보 뿌리기
/*
  useEffect(() => {
    axios.get('/api/v1/info')
      .then(response => {
        setEmail(response.data.email);
        setUsername(response.data.username);
        setMotto(response.data.motto);
        setBloodType(response.data.bloodType);
        setAddress(response.data.address);
        setNickname(response.data.nickname);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 호출되도록 설정
*/
const onNicknameHandler = (e) =>{
  setNickname(e.currentTarget.value)
}
const onBloodTypeHandler = (e) =>{
  setBloodType(e.currentTarget.value)
}
const onMottoHandler = (e) =>{
  setMotto(e.currentTarget.value)
}
const onAddressHandler = (e) =>{
  setAddress(e.currentTarget.value)
}

const onSubmitHandler = (e) => {
  e.preventDefault(); // 새로 고침 방지

  let body = {
    nickname: Nickname,
    motto: Motto,
    address: Address,
    bloodType: BloodType,
  };

  // url 체크하기
  axios.post("/api/v1/update", body)
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
      
      
    </form>
  )

  }
export default MyinfoPage