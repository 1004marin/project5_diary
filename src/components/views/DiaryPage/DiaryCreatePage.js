import React from 'react'
import { useState, useRef,  useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu';
import '../../../css/diary_create.scss'
import CONFIG from "../../../config"

function DiaryCreatePage() {

const navigate = useNavigate();

const [DiaryName, setDiaryName] = useState("")
const [DiaryIntroduce,setDiaryIntroduce] = useState("")
const [DiaryPassword, setDiaryPassword] = useState("")
const [DiaryMax, setDiaryMax] = useState("")

// 기존 다이어리 이름 목록 저장
const [existingDiaryNames, setExistingDiaryNames] = useState([]); 

const onDiaryNameHandler = (e) =>{
    setDiaryName(e.currentTarget.value)
}
const onDiaryIntroduceHandler = (e) =>{
    setDiaryIntroduce(e.currentTarget.value)
}
const onDiaryPasswordHandler = (e) =>{
    setDiaryPassword(e.currentTarget.value)
}
const onDiaryMaxHandler = (e) =>{
    setDiaryMax(e.currentTarget.value)
}


  // 서버에서 다이어리 리스트 가져오기
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        const response = await axios.get(`${CONFIG.API_BASE_URL}/api/v1/diary`);
        const diaryTitles = response.data.map((diary) => diary.name); // 다이어리 이름만 추출
        setExistingDiaryNames(diaryTitles); // 저장
      } catch (error) {
        console.error('다이어리 목록 불러오기 실패:', error);
        alert('다이어리 목록을 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchDiaries();
  }, []); // 컴포넌트 마운트 시 한 번 실행




const onSubmitHandler = (e) =>{
    e.preventDefault();

    if(!DiaryName || !DiaryPassword || !DiaryMax){
        alert("다이어리 신청에 필수 정보를 작성해주세요!")
        return;
    }

    // 중복 확인
    if (existingDiaryNames.includes(DiaryName)) {
        alert('이미 존재하는 일기 이름이에요. 다른 제목을 사용해주세요!');
        return;
    }

    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    const jsonDiaryCreate = {
        name: DiaryName,
        introduce: DiaryIntroduce,
        password: DiaryPassword,
        max: DiaryMax.replace(/\D/g, '')// '1'
    }
    axios.post(`${CONFIG.API_BASE_URL}/api/v1/diary`, jsonDiaryCreate)
    .then(
        response => {
            if(response.status === 200){
                alert("다요리 생성!")
                //console.log(response)//data 31받음
            }
            
            const Client_diaryId = response.data
            navigate('/diaryContent', { state: { Client_diaryId } });

        }
    ).catch( error => {
        {console.log("다이어리 생성에러:", error)}
        alert("다이어리 생성 에러!")
    }
    )

}
//드롭박스
const [isListOpen, setListOpen] = useState(false);

const handleButtonClick = () => {
  setListOpen(!isListOpen);
};

const handleOptionClick = (option) => {
    setDiaryMax(option);
  setListOpen(false);
};

  return (
<div className='DiaryCreate'>
    
    <div className='inner_navbar'>
        <NavBar/>
    </div>
    <div className='diaryCreate_formbox'>
        <div className='moblie_menu'>
            <SlideMenu/>
        </div>
        <div className='diaryCreate_inner_formbox'>
            <div className='inner_title'>
                <div className='title'>교환일기장<br/>
                                신청서...</div>
            </div>
            <div className='diaryCreate_formbox_content'>
                <label>Name</label>
                <input type="text" value={DiaryName} onChange={onDiaryNameHandler} maxLength={10}></input>

                <label>Introduce</label>
                <input type="text" value={DiaryIntroduce} onChange={onDiaryIntroduceHandler} maxLength={15}></input>

                <label>Password</label>
                <input type="password" value={DiaryPassword} onChange={onDiaryPasswordHandler} maxLength={8}></input>

                <label>Max</label>
                <button className="btn-select" onClick={handleButtonClick}>
                    {DiaryMax || '최대 부원 인원을 정해주세요.'}
                </button>
                        {isListOpen && (
                            <ul className="list-member">
                            <li>
                                <button onClick={() => handleOptionClick('1명')}>1명</button>
                            </li>
                            <li>
                                <button onClick={() => handleOptionClick('2명')}>2명</button>
                            </li>
                            <li>
                                <button onClick={() => handleOptionClick('3명')}>3명</button>
                            </li>
                            </ul>
                        )}

                <div className='diaryCreate_sub'>
                ※ 교환일기장 이름, 암호, 최대 모집원 수는 신청이 접수되면 변경이 불가능해요
                </div>
            </div>
            <button className="diaryCreate_submit_button" type='submit' onClick={onSubmitHandler}>받아주세요</button>
            </div>
            </div>
    </div>
  )
}

export default DiaryCreatePage