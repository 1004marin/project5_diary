import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom'
import CONFIG from "./config";

import '../../../css/diary_info.scss'
import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu';

function DiaryInfoPage() {
    const navigate = useNavigate();

    const location = useLocation()
    const { Client_diaryId } = location.state || {};
    const [diaryInfo, setDiaryInfo] = useState(null);
    const [diaryIntroduce, setDiaryIntroduce] = useState("")
    const [diaryDelete_notice, setDiaryDelete_notice] = useState("")
    const [visible_yesOrNo, setVisible_yesOrNo]=useState(false)


    const onDiaryIntroduceHandler=(e)=>{
        setDiaryIntroduce(e.currentTarget.value)
    }
    const onDiaryLeaveHandler=()=>{
        axios.get(`${CONFIG.API_BASE_URL}/api/v1/diary/${Client_diaryId}/memberCount`).then(
            response=>{
                if(response.data >= 2){
                    axios.post(`${CONFIG.API_BASE_URL}/api/v1/diary/${Client_diaryId}/exit`).then(
                        response=>{
                            if(response.data === "탈퇴 완료"){
                                alert("다요리 탈퇴 완료!")
                                navigate('/diaryList')
                            }
                        }
                    ).catch(error=>{
                        alert("다요리 탈퇴 에러!")
                    }
                    )
                }
                else{//멤버1명
                    setDiaryDelete_notice("※ 해당 일기의 남은 부원이 나뿐이라, 교환일기 자체가 이 세상에서 사라져요.")
                    setVisible_yesOrNo(true)
                }
            }
        )
    }
    const onButtonHandler=(value)=>{
        if(value === 'yes'){
            axios.delete(`${CONFIG.API_BASE_URL}/api/v1/diary/${Client_diaryId}`).then(
                response=>{
                    if(response.data === '삭제 완료'){
                        alert('삭제 완료되었어요!')
                        navigate('/diaryList')
                    }
                }
            ).catch(error=>{
                //console.log("다이어리 삭제 에러:",error)
            })

        }
        if(value === 'no'){
            setVisible_yesOrNo(false)
            alert("삭제 안할게요!")
            setDiaryDelete_notice("")
        }
    }
    const onDiaryDeleteHandler=()=>{
        setDiaryDelete_notice("※ 해당 일기의 남은 부원이 나뿐이라, 교환일기 자체가 이 세상에서 사라져요.")
        setVisible_yesOrNo(true)        
    }
    const onIntroduceHandler=()=>{
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        const jsonIntroduce={
            introduce: diaryIntroduce
        }
        axios.patch(`${CONFIG.API_BASE_URL}/api/v1/diary/${Client_diaryId}/introduce`, jsonIntroduce)
        .then(response=>{
            if(response.status === 200){
                alert("소개 업뎃 완료!")
            }
            window.location.reload();//업뎃 보여주기용
        })
        .catch(error=>{
            //console.log(error)
            alert("소개 업뎃 에러")
        }

        )
    }
    useEffect(()=>{

        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        axios.get(`${CONFIG.API_BASE_URL}/api/v1/diary/${Client_diaryId}/info`)
        .then(response=>{
            setDiaryInfo(response.data);
        }
        )
        .catch(error=>{
            alert("다이어리 찾기에 실패했어요! 다시 입장해주세요!")
            navigate("/diaryList")
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
                <div className='diaryInfo_info'>
                    <label>Title</label>
                    <p>{diaryInfo.diaryInfoResponse.name}</p>
                    <label>Introduce</label>
                    <p>{diaryInfo.diaryInfoResponse.introduce}</p>
                    <label>Max</label>
                    <p>{diaryInfo.diaryInfoResponse.max}</p>

                    <div className='diaryInfo_member'>
                    <div className='diaryInfo_member_title'>부원...</div>
                    </div>

                    <ul>
                        {diaryInfo.users && diaryInfo.users.map((user, index) => (
                            <li className="diaryInfo_member_list "key={index}>
                                <label>Username</label>
                                <p>{user.username}</p>
                                <label>Email</label>
                                <p>{user.email}</p>
                                <label>Nickname</label>
                                <p>{user.nickname}</p>
                                <div className='diaryInfo_line'/>
                            </li>
                        ))}
                    </ul>


                    
                    <div className='diaryInfo_introduce'>
                        <input value={diaryIntroduce} placeholder="Introduce" onChange={onDiaryIntroduceHandler} maxLength={15}></input>
                        <button onClick={onIntroduceHandler}>소개 수정할래요</button>
                    </div>

                    <div className='diaryInfo_delete'>
                        <button onClick={onDiaryLeaveHandler}>탈퇴</button>
                        <button onClick={onDiaryDeleteHandler}>소멸</button>
                    </div>

                    <div className='diaryInfo_delete_notice'>{diaryDelete_notice}</div> 
                    { visible_yesOrNo && (<div className='diaryInfo_delete_check'>
                        <button onClick={()=>onButtonHandler('yes')}>네</button>
                        <button onClick={()=>onButtonHandler('no')}>아니오</button>
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