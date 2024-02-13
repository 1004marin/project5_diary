import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
function DiaryContentPage() {
    const location = useLocation();
    //const [diaryId, setDiaryId]
    const { Client_diaryId } = location.state || {};
    const [member_to_add,setMember_to_add] = useState("멤버")
    const navigate = useNavigate()

    const YearMonth = {
        yearMonth: "2023-02-01"
    }
    const onMember_to_addHandler=(e)=>{
        setMember_to_add(e.currentTarget.value)
    }
    const onDiaryInfoHandler=()=>{
        navigate('/diaryInfo', { state: { Client_diaryId } })
    }
    const onMemberInviteHandler=()=>{

        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        const jsonAddMem = {
            username : member_to_add
        }
        axios.post(`/api/v1/diary/${Client_diaryId}/member`, jsonAddMem)
        .then(response=>{
            console.log(response.data)

            if(response.data === "멤버 추가 완료"){
                alert("멤버 추가 성공!")
            }
        })
        .catch(error=>{
            console.log(error)
            if(error.response.data.message === 'Diary member limit exceeded'){
                alert("멤버제한 초과에요!")
            }
            if(error.response.data.message === '존재하지 않는 회원입니다.'){
                alert("없는 회원이에용!")
            }
            else{
                alert("멤버 추가 에러!")
            }
        })
    }

    useEffect(() => {
        if(Client_diaryId) {
            const storedAccessToken = localStorage.getItem("accessToken");
            axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
            console.log(Client_diaryId)
            // diaryId를 사용하여 axios를 통해 요청을 보냄
            axios.get(`/api/v1/diary/${Client_diaryId}`, { params: { yearMonth: '2024-02-01' } })
                .then(response => {
                    // 요청 성공 시 처리할 로직
                    console.log('다이어리 내용:', response);
                })
                .catch(error => {
                    // 요청 실패 시 처리할 로직
                    console.error('다이어리 내용을 불러오는 중 오류 발생:', error);
                });
        }
    }, [Client_diaryId]); // diaryId가 변경될 때마다 useEffect가 호출되도록 설정

    return (
        <div style={
            { height:'100vh', display:"flex", flexDirection:"column", background:"#D2E1FF", 
            justifyContent:'center', alignItems:'center'}}>       
            <label>다이어리 내부입니당</label>
            <button onClick={onMemberInviteHandler}>멤버 초대</button>
            <input value={member_to_add} onChange={onMember_to_addHandler}></input>

            <br/>
            <button onClick={onDiaryInfoHandler}>다요리 정보</button>
        </div>

    );
}
export default DiaryContentPage