import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'


function DiaryInfoPage() {
    const location = useLocation()
    const { Client_diaryId } = location.state || {};
    const [diaryInfo, setDiaryInfo] = useState(null);
    const [diaryIntroduce, setDiaryIntroduce] = useState("")

    const onDiaryIntroduceHandler=(e)=>{
        setDiaryIntroduce(e.currentTarget.value)
    }
    const onDiaryLeaveHandler=()=>{
        
    }
    const onIntroduceHandler=()=>{
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        const jsonIntroduce={
            introduce: diaryIntroduce
        }
        axios.patch(`/api/v1/diary/${Client_diaryId}/introduce`, jsonIntroduce)
        .then(response=>{
            console.log(response)
            if(response.status === 200){
                alert("소개 업뎃 완료!")
            }
            window.location.reload();//업뎃 보여주기용
        })
        .catch(error=>{
            console.log(error)
            alert("소개 업뎃 에러")
        }

        )
    }
    useEffect(()=>{

        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        axios.get(`/api/v1/diary/${Client_diaryId}/info`)
        .then(response=>{
            console.log(response)
            setDiaryInfo(response.data);
        }
        )
        .catch(error=>{
            console.log(error)
        })
    },[Client_diaryId])

  return (
<div>
            <h2>다이어리 정보</h2>
            {diaryInfo && (
                <div>
                    <p>이름: {diaryInfo.diaryInfoResponse.name}</p>
                    <p>소개: {diaryInfo.diaryInfoResponse.introduce}</p>
                    <p>최대 멤버 수: {diaryInfo.diaryInfoResponse.max}</p>
                    <h3>멤버 정보</h3>
                    <ul>
                        {diaryInfo.users && diaryInfo.users.map((user, index) => (
                            <li key={index}>
                                <p>사용자 이름: {user.username}</p>
                                <p>이메일: {user.email}</p>
                                <p>닉네임: {user.nickname}</p>
                                {/* 기타 정보들도 필요에 따라 추가 */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <input value={diaryIntroduce} onChange={onDiaryIntroduceHandler}></input>
            <button onClick={onIntroduceHandler}>introduce수정</button>

            <br/>
            <button onClick={onDiaryLeaveHandler}>탈퇴</button>
            <button onClick>소.멸.</button>
        </div>
    );
}

export default DiaryInfoPage