import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DiaryDrawPage from './DiaryDrawPage'

export default function DiaryWritePage() {
    const navigate = useNavigate();

    const [drawingData, setDrawingData] = useState(null);//props

    const [DiaryTitle, setDiaryTitle] = useState("")
    //그림으로 선택해서 값 CLOUDY 등 지정해두기
    const [DiaryWeather, setDiaryWeather] = useState("")
    const [DiaryMood, setDiaryMood] = useState("")
    const [DiaryContent, setDiaryContent] = useState("")
    const [DiaryDate, setDiaryDate] = useState("")
    //const [json_diary, setjson_diary] = useState("")

    const diaryId = 44

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
    
  

    const onSubmit = (e) => {
        e.preventDefault();
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        
                console.log(drawingData)
           
                const json_diary = {
                    title: DiaryTitle,
                    weather: DiaryWeather,
                    mood: DiaryMood,
                    body: DiaryContent,
                    date: DiaryDate,
                    imageData:drawingData
                }
                

                axios.post(`/api/v1/diary/44/post`, json_diary)
                .then(response => {
                    console.log(response)
        
                    if(response.status === "200"){
                        alert("일기 작성 완료")
                        navigate("/diary")
                    }
                })
                .catch(error =>{
                    alert("다요리 쓰기 에러 발생")
                    navigate("/diary")
                    console.log(error)
                })
            
            /*
            else if(drawingData === null){
                json_diary = {
                    title: DiaryTitle,
                    weather: DiaryWeather,
                    mood: DiaryMood,
                    body: DiaryContent,
                    date: DiaryDate,
                    //imageData:""
                }
                console.log("2")
            }
            */
        




        }


  return (
    <div style={
        { height:'100vh', display:"flex", flexDirection:"column", background:"#D2E1FF", 
        justifyContent:'center', alignItems:'center'}}>
        <form onSubmit={onSubmit}>
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

            <label>그림일기</label>
            <DiaryDrawPage onSaveDrawing={setDrawingData} />

            <br/>
            <br/>
            <button type='submit'>
                일기 제출
            </button>
        </form>
    </div>
  )
}