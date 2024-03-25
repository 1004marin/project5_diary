import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function DiaryInfoPage() {
    const navigate = useNavigate();

    const location = useLocation()
    const { Client_diaryId } = location.state || {};
    const [diaryInfo, setDiaryInfo] = useState(null);
    const [diaryIntroduce, setDiaryIntroduce] = useState("")
    const [want_to_delete, setWant_to_delete] = useState("")
    const [diaryDelete_notice, setDiaryDelete_notice] = useState("")
    const [visible_yesOrNo, setVisible_yesOrNo]=useState(false)


    const onDiaryIntroduceHandler=(e)=>{
        setDiaryIntroduce(e.currentTarget.value)
    }
    const onDiaryLeaveHandler=()=>{
        console.log("핸들러")
        axios.get(`/api/v1/diary/${Client_diaryId}/memberCount`).then(
            response=>{
                if(response.data >= 2){
                    console.log("멤버2명이상")

                    axios.post(`/api/v1/diary/${Client_diaryId}/exit`).then(
                        response=>{
                            if(response.data === "탈퇴 완료"){
                                console.log("다요리 탈퇴 완료") 
                                alert("다요리 탈퇴 완료!")
                                navigate('/diaryList')
                            }
                        }
                    ).catch(error=>{
                        console.log(error)
                        alert("다요리 탈퇴 에러!")
                    }
                    )
                }
                else{
                    setDiaryDelete_notice("한명남아서 데이터 삭제되요. 괜찬아요?")
                    setVisible_yesOrNo(true)
                    console.log("멤버1명")
                }
            }
        )
    }
    const onButtonHandler=(value)=>{
        if(value === 'yes'){
            axios.delete(`/api/v1/diary/${Client_diaryId}`).then(
                response=>{
                    console.log(response)
                    if(response.data === '삭제 완료'){
                        alert('삭제 완료되었어용')
                        navigate('/diaryList')
                    }
                }
            ).catch(error=>{
                console.log("다이어리 삭제 에러:",error)
            })

        }
        if(value === 'no'){
            setVisible_yesOrNo(false)
            alert("삭제 안할게요")
            setDiaryDelete_notice("")
        }
    }
    const onDiaryDeleteHandler=()=>{
        setDiaryDelete_notice("디비에서 아예 날라가용 ㄱㅊ?")
        setVisible_yesOrNo(true)        
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
            <button onClick={onDiaryDeleteHandler}>소.멸.</button>

            <br/>
            <div>{diaryDelete_notice}</div> 
            {visible_yesOrNo && (<div>
                <button onClick={()=>onButtonHandler('yes')}>예</button>
                <button onClick={()=>onButtonHandler('no')}>아니요</button>
            </div>)}


        </div>
    );
}

export default DiaryInfoPage