import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function DiaryListPage() {
  const [diaries, setDiaries] = useState([]);
  const [diaryPassword, setDiaryPassword] = useState("")
  const [is_diary_clicked, setis_diary_clicked] = useState(false)
  const [Client_diaryId, setClient_diaryId] = useState("")
  const [diaryNum, setDiaryNum] = useState("")
  const navigate = useNavigate();

  const onDiaryPasswordHandler =(e) => {
    setDiaryPassword(e.currentTarget.value)
  }

  // 서버에서 다이어리 목록을 가져오는 함수
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    const fetchDiaries = async () => {
      try {
        const response = await axios.get('/api/v1/diary');
        setDiaries(response.data)
        setDiaryNum(response.data.length)

        console.log(response.data)
        console.log(response.data.length)
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };

    // 다이어리 목록 가져오기
    fetchDiaries();
  }, []);

  const onPasswordHandler = () => {
    setis_diary_clicked(true)//비번 입력창 보이게
  };


//다이어리 입장 버튼: 1)다이어리 id가 선택되었을 때만 2) 선택했을 때만 버튼 보이게 수정
  const onDiaryEnterHandler =() => {
    console.log("다요리 enter:", Client_diaryId)
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    const jsonDiaryPassword ={
      password: diaryPassword
    }

    axios.post(`/api/v1/diary/${Client_diaryId}/password`, jsonDiaryPassword)
    .then(response=> {
      console.log(response.data)
      if(response.data === '비밀번호 일치'){
        console.log(Client_diaryId)
        setis_diary_clicked(false)//비번 입력창 보이게
        navigate('/diaryContent', { state: { Client_diaryId } })
      }})   
    .catch(error => {
      if(error.response.data.message === "비밀번호가 일치하지 않습니다"){
        console.log("다이어리 비번 에러:", error)
        alert("비번틀림")
        setis_diary_clicked(false)//비번 입력창 보이게
      }
      else{
        alert("먼가 에러 발생!")
      }
    }
    )

  }

  return (
    <div>
      <h1>다이어리 목록</h1>
      <div>{is_diary_clicked && <input onChange={onDiaryPasswordHandler}value={diaryPassword} type="password"/>}</div>
      {diaryNum !== 0 && (
      <button type="button" onClick={onDiaryEnterHandler}>다요리 입장</button>
      )}
      <ul>
        {diaries.map((diary, index) => (
          <li key={index} onClick={() => {
            setClient_diaryId(diary.diaryId);
            onPasswordHandler();
            console.log("Client_diaryId:", diary.diaryId);
          }}>
            다이어리 ID: {diary.diaryId}, 이름: {diary.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryListPage