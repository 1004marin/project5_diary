import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DiaryDrawPage from './DiaryDrawPage'
import { useLocation } from 'react-router-dom'
import CONFIG from "../../../config"

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
    const [DiaryWeather, setDiaryWeather] = useState("")
    const [DiaryMood, setDiaryMood] = useState("")
    const [DiaryContent, setDiaryContent] = useState("")

    //
    const [startDate, setStartDate] = useState(new Date());

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

    
  

    const onSubmit = (e) => {
        e.preventDefault();
        if(!DiaryTitle || !DiaryWeather || !DiaryContent){
            alert("다이어리 필수 정보를 입력해주세요!ㅡㅡ")
            return
        }
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        const diary_formattedDate = startDate.toISOString().split('T')[0];
           
                const json_diary = {
                    title: DiaryTitle,
                    weather: DiaryWeather,
                    mood: DiaryMood,
                    body: DiaryContent,
                    date: diary_formattedDate,
                    imageData:drawingData
                }
                

                axios.post(`${CONFIG.API_BASE_URL}/api/v1/diary/${Client_diaryId}/post`, json_diary)
                .then(response => {
                    if(response.status === 200){
                        alert("일기 작성 완료")
                        navigate("/diaryContent", {state: {Client_diaryId}})
                    }
                })
                .catch(error =>{
                    alert("다요리 쓰기 에러 발생")
                    navigate("/diaryList")
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
                <img className="diaryWrite_pinkBubble"src={process.env.PUBLIC_URL + '/diary.png'}alt="" />
            </div>
        <form className='diaryWrite_formbox_content' onSubmit={onSubmit}>
            <label>Title</label>
            <input type='text' value={DiaryTitle} onChange={onDiaryTitleHandler} maxLength={25}></input>

            <label>Date</label>
            <DatePicker dateFormat='yyyy年 MM月 dd日'
            selected={startDate}
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            onChange={(date) => setStartDate(date)}
            maxDate={new Date()} // 오늘 날짜까지만 선택 가능
            >

            <div className='monthly_guide'style={{ }}>교환일기의 날짜 구다사이!!~</div>
            </DatePicker>

            <label>Weather</label>
            <div className="radio-container">
                  <label>
                    <input type="radio" name="option" value="SUNNY" checked={DiaryWeather === "SUNNY"} onChange={onDiaryWeatherHandler} />
                    <span className='radio_icon'></span>
                    <div className='weather_icon_1'/>
                  </label>

                  <label>
                    <input type="radio" name="option" value="CLOUDY" checked={DiaryWeather === "CLOUDY"} onChange={onDiaryWeatherHandler} />
                    <span className='radio_icon'></span>
                    <div className='weather_icon_2'/>
                  </label>

                  <label>
                    <input type="radio" name="option" value="SNOWY" checked={DiaryWeather === "SNOWY"} onChange={onDiaryWeatherHandler} />
                    <span className='radio_icon'></span>
                    <div className='weather_icon_3'/>
                  </label>

                  <label>
                    <input type="radio" name="option" value="RAINY" checked={DiaryWeather === "RAINY"} onChange={onDiaryWeatherHandler} />
                    <span className='radio_icon'></span>
                    <div className='weather_icon_4'/>

                  </label>
                </div>

            <label>Mood</label>
            <input type='text' value={DiaryMood} onChange={onDiaryMoodHandler}maxLength={30}></input>

            <label>Content</label>
            <textarea className="write_text" value={DiaryContent} onChange={onDiaryContentHandler} maxLength={300}/>
            

            <label>Draw</label>
            <DiaryDrawPage onSaveDrawing={setDrawingData} />
        </form>
        <button className='diaryWrite_submit_button'type='submit' onClick={onSubmit}>
                제출할래요
        </button>
        </div>
        </div>
        </div>
  )
}