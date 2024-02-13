import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function DiaryCreatePage() {

const navigate = useNavigate();

const [DiaryName, setDiaryName] = useState("")
const [DiaryIntroduce,setDiaryIntroduce] = useState("")
const [DiaryPassword, setDiaryPassword] = useState("")
const [DiaryMax, setDiaryMax] = useState("")

const onDiaryNameHandler = (e) =>{
    setDiaryName(e.currentTarget.value)
}
const onDiaryIntroduceHandler = (e) =>{
    setDiaryIntroduce(e.currentTarget.value)
}
const onDiaryPasswordHandler = (e) =>{
    setDiaryPassword(e.currentTarget.value)
}
const onDiaryMaxHandler = (e) =>{
    setDiaryMax(e.currentTarget.value)
}

const onSubmitHandler = (e) =>{
    e.preventDefault();
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    const jsonDiaryCreate = {
        name: DiaryName,
        introduce: DiaryIntroduce,
        password: DiaryPassword,
        max: DiaryMax
    }
    axios.post('/api/v1/diary', jsonDiaryCreate)
    .then(
        response => {
            if(response.status === 200){
                alert("다요리 생성!")
                console.log(response)//data 31받음
            }
            
            const Client_diaryId = response.data
            navigate('/diaryContent', { state: { Client_diaryId } });

        }
    ).catch( error => {
        {console.log("다이어리 생성에러:", error)}
        alert("다이어리 생성 에러!")
    }
    )

}


  return (
    <div style={
        { height:'100vh', display:"flex", flexDirection:"column", background:"#D2E1FF", 
        justifyContent:'center', alignItems:'center'}}>

        <label>다요리</label>
        <br/>
        <label>이름</label>
        <input type="text" value={DiaryName} onChange={onDiaryNameHandler}></input>

        <label>소개</label>
        <input type="text" value={DiaryIntroduce} onChange={onDiaryIntroduceHandler}></input>

        <label>비번</label>
        <input type="password" value={DiaryPassword} onChange={onDiaryPasswordHandler}></input>

        <label>최대 인원</label>
        <select value={DiaryMax} onChange={onDiaryMaxHandler}>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            {/* 다른 옵션들 추가 */}
        </select>

        <br/>
        <button type="submit" onClick={onSubmitHandler}>생성</button>

        
    </div>
  )
}

export default DiaryCreatePage