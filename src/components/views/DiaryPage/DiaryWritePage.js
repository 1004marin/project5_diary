import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function DiaryWritePage() {
    const navigate = useNavigate();

    const [DiaryTitle, setDiaryTitle] = useState("")
    const [DiaryWeather, setDiaryWeather] = useState("")
    const [DiaryMood, setDiaryMood] = useState("")
    const [DiaryContent, setDiaryContent] = useState("")
    const [DiaryDate, setDiaryDate] = useState("")
    const [DiaryImage, setDiaryImage] = useState("")

    const onDiaryTitleHandler =(e) => {
        setDiaryTitle(e.currentTarget.value)
    }
    const onDiaryWeatherHandler =(e) => {
        setDiaryWeather(e.currentTarget.value)
    }
    const onDiaryMoodHandler =(e) => {
        setDiaryMood(e.currentTarget.value)
    }
    const onDiaryContentHandler =(e) => {
        setDiaryContent(e.currentTarget.value)
    }
    const onDiaryDateHandler =(e) => {
        setDiaryDate(e.currentTarget.value)
    }
    //파일 선택
    const onDiaryImageHandler = (e) => {
        setDiaryImage(e.currentTarget.files[0])
    }
  

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        const formData = new FormData();
        formData.append('file', DiaryImage)

        //FileReader 객체를 사용하여 이미지 파일 Base64문자열로 변환
        const reader = new FileReader()
        reader.onload =() => {
            const Base64_imageData = reader.result

            const jsonDiaryData = {
                title: DiaryTitle,
                weather: DiaryWeather,
                mood: DiaryMood,
                body: DiaryContent,
                date: DiaryDate,
                ImageData: Base64_imageData      
            }
            reader.readAsDataURL(DiaryImage); // DiaryImage 파일을 Base64로 읽기
            
            axios.post('/api/v1/diary/44/post', jsonDiaryData)
            .then(response => {
                console.log(response)
    
                if(response.data === "일기 작성 완료"){
                    alert("일기 작성 완료")
                    navigate("/diary")
                }
            })



        }}


  return (
    <div style={
        { height:'100vh', display:"flex", flexDirection:"column", background:"#D2E1FF", 
        justifyContent:'center', alignItems:'center'}}>
        <form onSubmit={onSubmitHandler}>
            <label>제목</label>
            <input type='text' value={DiaryTitle} onChange={onDiaryTitleHandler}></input>
            
            <label>날씨</label>
            <input type='text' value={DiaryWeather} onChange={onDiaryWeatherHandler}></input>

            <label>기분</label>
            <input type='text' value={DiaryMood} onChange={onDiaryMoodHandler}></input>

            <label>내용</label>
            <input type='text' value={DiaryContent} onChange={onDiaryContentHandler}></input>

            <label>날짜</label>
            <input type='text' value={DiaryDate} onChange={onDiaryDateHandler}></input>

            <br/>
            <label>사진 첨부</label>
            <input type="file" onChange={onDiaryImageHandler}/>

            <br/>
            <br/>
            <button type='submit' onClick={onSubmitHandler}>
                일기 제출
            </button>
        </form>
    </div>
  )
}