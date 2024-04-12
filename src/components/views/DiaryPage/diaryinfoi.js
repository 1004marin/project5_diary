import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom'

import '../../../css/diary_post.scss'
import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu';

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
    <div className='DiaryInfo'>
    <div className='inner_navbar'>
        <NavBar/>
    </div>    
    <div className='diaryInfo_formbox'>
    <div className='moblie_menu'>
        <SlideMenu/>
    </div>
    <div className='diaryInfo_inner_formbox'>
        <div className='inner_title'>
            <div className='title'>일기교환클럽<br/>내 일기 정보...</div>
        </div>
    <div className='diaryInfo_formbox_content'>
            {diaryInfo && (
                <div>
                    <label>Title</label>
                    <p>{diaryInfo.diaryInfoResponse.name}</p>
                    <label>Introduce</label>
                    <p>{diaryInfo.diaryInfoResponse.introduce}</p>
                    <label>Max</label>
                    <p>{diaryInfo.diaryInfoResponse.max}</p>

                    <div className='diaryInfo_member_title'>부원...</div>
                    <ul>
                        {diaryInfo.users && diaryInfo.users.map((user, index) => (
                            <li key={index}>
                                <label>Username</label>
                                <p>{user.username}</p>
                                <label>Email</label>
                                <p>이메일: {user.email}</p>
                                <label>Nickname</label>
                                <p>닉네임: {user.nickname}</p>
                            </li>
                        ))}
                    </ul>

                    <div className='diaryPost_line'/>
                    
                    <input value={diaryIntroduce} onChange={onDiaryIntroduceHandler}></input>
                    <button onClick={onIntroduceHandler}>소개 수정할래요</button>

                    <button onClick={onDiaryLeaveHandler}>탈퇴</button>
                    <button onClick={onDiaryDeleteHandler}>소.멸.</button>

                    <div>{diaryDelete_notice}</div> 
                    {visible_yesOrNo && (<div className='diaryInfo_button'>
                        <button onClick={()=>onButtonHandler('yes')}>네</button>
                        <button onClick={()=>onButtonHandler('no')}>아니요</button>
                    </div>)}
                </div>
            )}




        </div>
        </div>
        </div>
        </div>
    );
}

export default DiaryInfoPage