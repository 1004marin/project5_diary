import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import store from '../../../_middleware/store'

function DiaryPostPage() {
    const location = useLocation();
    const navigate = useNavigate()
    const { Client_postId } = location.state || {};
    const { Client_diaryId } = location.state || {};
    const [DiaryTitle, setDiaryTitle] = useState("")
    const [DiaryWeather, setDiaryWeather] = useState("")
    const [DiaryMood, setDiaryMood] = useState("")
    const [DiaryContent, setDiaryContent] = useState("")
    const [DiaryDate, setDiaryDate] = useState("")
    const [DiaryImage, setDiaryImage] = useState("")
    
    const logined_username = localStorage.getItem("logined_user");
    const [Stamp, setStamp] = useState("")
    const [StampList, setStampList] = useState("")
    const [already_Stamped, setAlready_Stamped] = useState(false)
    
    //반응
    const onStampHandler =(e)=>{
      setStamp(e.currentTarget.value)
    }
    const onStampSubmitHandler=()=>{
      console.log(Stamp)
      const jsonStamp = {stamp: Stamp}
      axios.post(`/api/v1/diary/${Client_diaryId}/post/${Client_postId}/react`, jsonStamp)
      .then(response => {
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
        alert("스탬프 셍성 에러!")
      })
    }

    //일기 삭제
    const onDiaryDeleteHandler = ()=>{
      const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        axios.delete(`/api/v1/diary/${Client_diaryId}/post/${Client_postId}`)
        .then(response=>{
          if(response.data === '일기 삭제 완료'){
            alert("일기 삭제됨~")
            navigate('/diaryContent', {state: {Client_diaryId} })//이거체크 변수잘담겨잇는지. 이거할지 이전페이지이동할지
          }
        })
        .catch(error=>{
          console.log("포스트 삭제 에러", error)
        })

    }
    useEffect(()=> {
      if(StampList){
        StampList.array.forEach(element => {
          if(element.username === logined_username){
            setAlready_Stamped(true)
          }
        });
      }   
    },[logined_username, StampList])
    useEffect(()=>{
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        console.log(Client_diaryId, Client_postId)
        axios.get(`/api/v1/diary/${Client_diaryId}/post/${Client_postId}`)
        .then(response => {
            console.log(response.data)

            const Post = response.data
            setDiaryTitle(Post.title)
            setDiaryDate(Post.date)
            setDiaryMood(Post.mood)
            setDiaryContent(Post.body)
            setDiaryImage(Post.imageData)
            setDiaryWeather(Post.weather)
        })
        
        axios.get(`/api/v1/diary/${Client_diaryId}/post/${Client_postId}/react`)
        .then(response=>{
          console.log(response)
          setStampList(response.data)
        })
        .catch(error=>{
          if(error.response.status === 404){
            console.log("반응 없ㅇ믐")
            setStampList("없긔영")
          }
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
            {DiaryImage && (<img style={{width: 400, height: 250}}src={`data:image/png;base64,${DiaryImage}`}  alt="image"/>)}


            <button onClick={onDiaryDeleteHandler}>일기 삭제</button>
            <br/>
            
            <label>반응 목록</label>
            <div>{StampList}</div>


            <label>반응 남기기</label>
            <select onChange={(value)=>onStampHandler(value)}>
              <option value="GREAT">그렛</option>
              <option value="GOOD">귯</option>
              <option value="BAD">밷</option>
            {/* 다른 옵션들 추가 */}
            {!already_Stamped && <button onClick={onStampSubmitHandler}>반응 전송</button> }
        </select>
    </div>
  )
}

export default DiaryPostPage