import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import store from '../../../_middleware/store'
import moment from 'moment'
import '../../../css/diary_post.scss'
import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu';


import stamp_good from './good.png';
import stamp_great from './great.png';
import stamp_bad from './bad.png';





function DiaryPostPage() {
    const location = useLocation();
    const navigate = useNavigate()
    const { Client_postId } = location.state || {};
    const { Client_diaryId } = location.state || {};
    const { post_writer} = location.state || {};
    const now_username = localStorage.getItem("logined_user");

    const [DiaryTitle, setDiaryTitle] = useState("")
    const [DiaryWeather, setDiaryWeather] = useState("")
    const [DiaryMood, setDiaryMood] = useState("")
    const [DiaryContent, setDiaryContent] = useState("")
    const [DiaryDate, setDiaryDate] = useState("")
    const [DiaryImage, setDiaryImage] = useState("")
    
    const logined_username = localStorage.getItem("logined_user");
    const [Stamp, setStamp] = useState("")
    const [Stamp_route, setStamp_route] = useState("")
    const [StampList, setStampList] = useState([])
    const [already_Stamped, setAlready_Stamped] = useState(false)
    
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
    //반응
    const getImageForStamp = (Stamp) => {
      if (Stamp === 'GOOD') {
        return stamp_good;
      } else if (Stamp === 'GREAT') {
        return stamp_great;
      } else if (Stamp === 'BAD') {
        return stamp_bad;
      } else {
        // 예외 처리: 다른 값이 들어온 경우
        return null;
      }
    };
    const onStampHandler=(e)=>{
      setStamp(e.currentTarget.value)
    }
    const onStampSubmitHandler=()=>{
      if(Stamp ===""){
        alert("도장을 고르셨나요?")
        return;
      }
      const jsonStamp = {stamp: Stamp}

      const storedAccessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

      axios.post(`/api/v1/diary/${Client_diaryId}/${Client_postId}/react`, jsonStamp)
      .then(response => {
        alert("도장을 찍었어요!")
        window.location.reload();//업뎃 보여주기용
      })
      .catch(error=>{
        console.log(error)
        alert("스탬프 셍성 에러!")
      })
    }

    //일기 삭제
    const onDiaryDeleteHandler = ()=>{
      if( post_writer !==now_username ){
        alert("내가 쓴 일기가 아니에요! 삭제금지!ㅡㅡ")
        return;
      }
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
          alert("에러 발생! 돌아가주세요!")
          navigate('/diaryList')
        })

    }
    
    useEffect(()=> {
      if(StampList){
        StampList.forEach(item => {
          if(item.username === logined_username){
            setAlready_Stamped(true)
          }
        });
      } 
    },[logined_username, StampList])
    
    useEffect(()=>{
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        

        axios.get(`/api/v1/diary/${Client_diaryId}/post/${Client_postId}`)
        .then(response => {

            const Post = response.data
            setDiaryTitle(Post.title)
            setDiaryDate(Post.date)
            setDiaryMood(Post.mood)
            setDiaryContent(Post.body)
            setDiaryImage(Post.imageData)
            setDiaryWeather(Post.weather)
        })
        .catch(error =>{
          console.log(error)
          alert("에러 발생! 돌아가주세요!")
          navigate("/diaryList")
        }
        )


        axios.get(`/api/v1/diary/${Client_diaryId}/${Client_postId}/react`)
        .then(response=>{
          setStampList(response.data)

        })
        .catch(error=>{
            console.log(error)
        })
    },[])

  return (
    <div className='DiaryPost'>
        <div className='inner_navbar'>
            <NavBar/>
        </div>    
        <div className='diaryPost_formbox'>
        <div className='moblie_menu'>
            <SlideMenu/>
        </div>
        <div className='diaryPost_inner_formbox'>
            <div className='inner_title'>
                <div className='title'>쉿! 교환일기<br/>읽는 중...<span>☞☜</span></div>
                <img className="diaryPost_pinkBubble"src={process.env.PUBLIC_URL + '/diary.png'} />
            </div>
        <div className='diaryPost_formbox_content'>
            <label>Title</label>
            <div  className='diaryPost_data'>{DiaryTitle}</div>

            <label>Date</label>
            <div  className='diaryPost_data'>{moment(DiaryDate).format("YYYY年 MM月 DD日")}</div>

            <label>Weather</label>
            <div className="radio-container">
                  <label>
                    <input type="radio" name="option1" value="SUNNY" checked={DiaryWeather === "SUNNY"} onChange={onDiaryWeatherHandler} disabled />
                    <span className='radio_icon'></span>
                    <div className='weather_icon_1'/>
                  </label>

                  <label>
                    <input type="radio" name="option1" value="CLOUDY" checked={DiaryWeather === "CLOUDY"} onChange={onDiaryWeatherHandler}disabled />
                    <span className='radio_icon'></span>
                    <div className='weather_icon_2'/>
                  </label>

                  <label>
                    <input type="radio" name="option1" value="SNOWY" checked={DiaryWeather === "SNOWY"} onChange={onDiaryWeatherHandler} disabled/>
                    <span className='radio_icon'></span>
                    <div className='weather_icon_3'/>
                  </label>

                  <label>
                    <input type="radio" name="option1" value="RAINY" checked={DiaryWeather === "RAINY"} onChange={onDiaryWeatherHandler} disabled/>
                    <span className='radio_icon'></span>
                    <div className='weather_icon_4'/>

                  </label>
                </div>
            <label>Mood</label>
            <div className='diaryPost_data'>{DiaryMood}</div>

            <label>Content</label>
            <div className='write_text'>{DiaryContent}</div>

            {DiaryImage &&(<label className='diaryPost_img_title'>Draw</label>)}
            <div className='diaryPost_img-wrapper'>
              {DiaryImage && (<img className="diaryPost_img" src={`data:image/png;base64,${DiaryImage}`}  alt="image"/>)}
            </div>
           
            
            <label>Stamp</label>
            <div>
              {/* */}
              {StampList.length > 0 ? (
                StampList.map((data, index) => (
                  <div className="diaryPost_react_box"key={index}>
                    <div className='react_username'><div>유저네임</div>{data.username}</div>
                    <img src={getImageForStamp(data.stamp)} alt={`Stamp ${data.stamp}`} />
                  </div>
                ))
              ) : (
                <div>아직 부원이 남긴 반응이 업서요...</div>
              )}
            </div>


            
            <div className='diaryPost_line'></div>
            <div className="react_radio-container">
                  <label>
                    <input type="radio" name="option2" value="GOOD" checked={Stamp === "GOOD"} onChange={onStampHandler} />
                    <span className='react_icon'></span>
                    <div className='react_icon_1'/>
                  </label>

                  <label>
                    <input type="radio" name="option2" value="GREAT" checked={Stamp === "GREAT"} onChange={onStampHandler} />
                    <span className='react_icon'></span>
                    <div className='react_icon_2'/>
                  </label>

                  <label>
                    <input type="radio" name="option2" value="BAD" checked={Stamp === "BAD"} onChange={onStampHandler} />
                    <span className='react_icon'></span>
                    <div className='react_icon_3'/>
                  </label>
              </div>

            {!already_Stamped && <button className='diaryPost_submit_react' onClick={onStampSubmitHandler}>도장 찍기</button> }

            
    </div>
    <button type='button' className='diaryPost_submit_button' onClick={onDiaryDeleteHandler}>삭제</button>
    </div>
    </div>
    </div>
  )
}

export default DiaryPostPage