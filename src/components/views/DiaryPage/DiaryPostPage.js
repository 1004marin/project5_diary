import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function DiaryPostPage() {
    const location = useLocation();

    const { Client_postId } = location.state || {};
    const { Client_diaryId } = location.state || {};
    const [DiaryTitle, setDiaryTitle] = useState("")
    const [DiaryWeather, setDiaryWeather] = useState("")
    const [DiaryMood, setDiaryMood] = useState("")
    const [DiaryContent, setDiaryContent] = useState("")
    const [DiaryDate, setDiaryDate] = useState("")
    const [DiaryImage, setDiaryImage] = useState("")
    
    useEffect(()=>{
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        axios.get(`/api/v1/diary/${Client_diaryId}/post/${Client_postId}`)
        .then(response => {
            console.log(response.data)

            const Post = response.data

        })
    },[])
  return (
    <div style={
        { height:'100vh', display:"flex", flexDirection:"column", background:"#D2E1FF", 
        justifyContent:'center', alignItems:'center'}}>

            <label>제목</label>
            <div>{DiaryTitle}</div>

            <label>날짜</label>
            <div>{DiaryDate}</div>
            
            <label>날씨</label>
            <div>{DiaryWeather}</div>

            <label>기분</label>
            <div>{DiaryMood}</div>

            <label>내용</label>
            <div>{DiaryContent}</div>

            <label>그림일기</label>
            <div>{DiaryImage}</div>



    </div>
  )
}

export default DiaryPostPage