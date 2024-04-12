import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu'
import '../../../css/diary_list.scss'

import { useDispatch } from 'react-redux'
import {logoutUser } from '../../../_actions/user_action';
function DiaryListPage() {
  const navigate = useNavigate();
  const dispatch= useDispatch()

  const [diaries, setDiaries] = useState([]);
  const [diaryPassword, setDiaryPassword] = useState("")
  const [is_diary_clicked, setis_diary_clicked] = useState(false)
  const [Client_diaryId, setClient_diaryId] = useState("")
  const [diaryNum, setDiaryNum] = useState("")
  //비번페이지
  const [showPasswordPage, setshowPasswordPage] = useState(false);
  const handlePasswordPage = () => {
    setshowPasswordPage(!showPasswordPage);
  };

  const onDiaryPasswordHandler =(e) => {
    setDiaryPassword(e.currentTarget.value)
  }

//로그아웃
const onLogoutHandler = () => {
  dispatch(logoutUser())
    .then(response => {
      console.log(response);
      navigate('/login')
    })
    .catch(error => {
      // 로그아웃 중 에러가 발생한 경우 여기에 처리를 할 수 있습니다.
      console.error('Logout Error:', error);
    });
};

  // 서버에서 다이어리 목록을 가져오는 함수
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    const fetchDiaries = async () => {
      try {
        const response = await axios.get('/api/v1/diary');
        setDiaries(response.data)
        setDiaryNum(response.data.length)

        console.log(response.data)
        console.log(response.data.length)
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };

    // 다이어리 목록 가져오기
    fetchDiaries();
  }, []);

  const onPasswordHandler = () => {
    setis_diary_clicked(true)//비번 입력창 보이게
  };


//다이어리 입장 버튼: 1)다이어리 id가 선택되었을 때만 2) 선택했을 때만 버튼 보이게 수정
  const onDiaryEnterHandler =() => {
    console.log("다요리 enter:", Client_diaryId)
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    const jsonDiaryPassword ={
      password: diaryPassword
    }

    axios.post(`/api/v1/diary/${Client_diaryId}/password`, jsonDiaryPassword)
    .then(response=> {
      console.log(response.data)
      if(response.data === '비밀번호 일치'){
        console.log(Client_diaryId)
        setis_diary_clicked(false)//비번 입력창 보이게
        navigate('/diaryContent', { state: { Client_diaryId } })
      }})   
    .catch(error => {
      if(error.response.data.message === "비밀번호가 일치하지 않습니다"){
        console.log("다이어리 비번 에러:", error)
        alert("비번틀림")
      }
      else{
        alert("에러가 발생했어요! 다시 돌아가주세요!")
        navigate('/diaryList')
      }
    }
    )

  }

  return (
    <div className='diaryList'>
      <div className='inner_navbar'>
        <NavBar/>
      </div>

      <div className={showPasswordPage ? 'diaryList_password_formbox' : 'diaryList_formbox'}>
      <div className='moblie_menu'>
            <SlideMenu/>
      </div>

           {/* 클릭 시, 다이어리 비번*/}
           {showPasswordPage ? (
            <div className='diaryList_password_inner_formbox'>
              <div className='close_password' onClick={handlePasswordPage}>닫기</div>

              <div className='password_box'>
                <div className='password_box1'>Notice</div>
                <div className='password_box2'>
                  <div>암호를 입력하세요.</div>
                  {is_diary_clicked && <input onChange={onDiaryPasswordHandler}value={diaryPassword} type="password"/>}
                  
                </div>
              </div>

              
              {diaryNum !== 0 && (
              <button className="diaryList_submit_button" type="button" onClick={onDiaryEnterHandler}>입장할래요</button>
              )}
            </div>
          ) : (
            <div className='diaryList_inner_formbox'>
                <div className='inner_title'>
                  <div className='title'>일기교환클럽<br/>
                  내 일기들...
                  </div>
                  <div className='diaryList_logout'onClick={onLogoutHandler}>※ 로그아웃</div>
                </div>
                <div className='diaryList_formbox_content'>
                  <div className='diaryList_guide'>※ 일기를 열기 위해선 암호를 알아야해요.</div>
                  <div className='diaryList_underline'>.</div>
                  <ul>
                    {diaries.map((diary, index) => (
                      <li className="diaryList_icon"key={index} onClick={() => {
                        setClient_diaryId(diary.diaryId);
                        onPasswordHandler();
                        handlePasswordPage();
                        console.log("Client_diaryId:", diary.diaryId);
                      }}>
                        {diary.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to='/diaryCreate'>
                    <div className='diaryList_create'>교환일기장 신청</div>
                </Link>
            </div>
          )}
            <div>

    </div>
    </div>
    </div>
    

  );
};

export default DiaryListPage