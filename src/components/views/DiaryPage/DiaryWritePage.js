import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DiaryDrawPage from './DiaryDrawPage'
import { useLocation } from 'react-router-dom'

import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu';
import '../../../css/diary_write.scss'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DiaryWritePage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { Client_diaryId } = location.state || {};
    const [drawingData, setDrawingData] = useState(null);//props

    const [DiaryTitle, setDiaryTitle] = useState("")
    //그림으로 선택해서 값 CLOUDY 등 지정해두기
    const [DiaryWeather, setDiaryWeather] = useState("")
    const [DiaryMood, setDiaryMood] = useState("")
    const [DiaryContent, setDiaryContent] = useState("")
    const [DiaryDate, setDiaryDate] = useState("")

    //
    const [startDate, setStartDate] = useState(new Date());

  
    const handleClick = () => {
      // 달력 표시
      setStartDate(new Date());
    };

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
                

                axios.post(`/api/v1/diary/${Client_diaryId}/post`, json_diary)
                .then(response => {
                    console.log(response)
        
                    if(response.status === 200){
                        alert("일기 작성 완료")
                        navigate("/diaryContent", {state: {Client_diaryId}})
                    }
                })
                .catch(error =>{
                    alert("다요리 쓰기 에러 발생")
                    navigate("/diaryContent", {state: {Client_diaryId}})
                    console.log(error)
                })
        }


  return (
    <div className='DiaryWrite'>
        <div className='inner_navbar'>
            <NavBar/>
        </div>    
        <div className='diaryWrite_formbox'>
        <div className='moblie_menu'>
            <SlideMenu/>
        </div>
        <div className='diaryWrite_inner_formbox'>
            <div className='inner_title'>
                <div className='title'>쉿! 교환일기<br/>쓰는 중...<span>☞☜</span></div>
                <img className="diaryWrite_pinkBubble"src={process.env.PUBLIC_URL + '/diary.png'} />
            </div>
        <form className='diaryWrite_formbox_content' onSubmit={onSubmit}>
            <label>Title</label>
            <input type='text' value={DiaryTitle} onChange={onDiaryTitleHandler}></input>

            <DatePicker dateFormat='yyyyMM.dd'selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                  readOnly // 키보드 입력 비활성화
                  onClick={handleClick} // 클릭시 달력 표시
            >
            <div style={{ color: "red" }}>Don't forget to check the weather!</div>
            </DatePicker>

            <label>Date</label>
            <input type='text' value={DiaryDate} onChange={onDiaryDateHandler}></input>

            <label>Weather</label>
            <input type='text' value={DiaryWeather} onChange={onDiaryWeatherHandler}></input>

            <label>Mood</label>
            <input type='text' value={DiaryMood} onChange={onDiaryMoodHandler}></input>

            <label>Content</label>
            <input type='text' value={DiaryContent} onChange={onDiaryContentHandler}></input>

            

            <label>Draw</label>
            <DiaryDrawPage onSaveDrawing={setDrawingData} />
            <button className='diaryWrite_submit_button'type='submit'>
                제출할래요
            </button>
        </form>
        </div>
        </div>
        </div>
  )
}