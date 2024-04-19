import React from 'react'
import { useState, useRef,useEffect } from 'react';
import '../../../css/slidemenu.css';
import { useDispatch } from 'react-redux'
import {logoutUser } from '../../../_actions/user_action';
import { Link,useNavigate } from 'react-router-dom'

function SlideMenu() {

const dispatch= useDispatch()
const navigate = useNavigate()

//로그아웃
const onLogoutHandler = () => {
  dispatch(logoutUser())
    .then(response => {
      console.log(response);
      navigate('/')
    })
    .catch(error => {
      // 로그아웃 중 에러가 발생한 경우 여기에 처리를 할 수 있습니다.
      console.error('Logout Error:', error);
    });
};
//
const onLinkHandler1= () =>{
  if(localStorage.getItem("is_logined")){
    navigate('/myinfo')
  }
  else{
    alert("로그인 먼저 해주세요!")
    navigate('/')
  }
}
const onLinkHandler2= () =>{
  if(localStorage.getItem("is_logined")){
    navigate('/diaryList')
  }
  else{
    alert("로그인 먼저 해주세요!")
    navigate('/')
  }
}

//메뉴
const [isOpen, setIsOpen] = useState(false); // 사이드바의 열림/닫힘 상태를 관리하는 상태
const outside = useRef(null); // 외부를 클릭하는지 감지하기 위한 ref

const toggleSide = () => {    setIsOpen(true);  };
// 외부를 클릭할 때 사이드바를 닫기 위한 이벤트 핸들러
const handleClickOutside = (event) => {
    if (outside.current && !outside.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // 컴포넌트가 마운트될 때와 언마운트될 때 이벤트 리스너를 추가 및 제거
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className='mobile_navbar'>
        <div className='mobile_navbar_content'>
            <div onClick={toggleSide} className='menuButton'>목차
         {
        <div id="sidebar"
        ref={outside} className={isOpen ? 'open' : ''}>
            <div className='mobile_navbar_title'>목차...</div>
            <div className='mobile_navbar_sub'>일기교환클럽으로<br/>새로운 만남이<br/>생길지도..ww</div>

            <ul  className='mobile_navbar_menu'>
                {localStorage.getItem("is_logined") ? (
                    <li onClick={onLogoutHandler}>로그아웃...............3</li>
                    ) : (
                    <Link to='/'>
                    <li className='link'>로그인................3</li>
                    </Link>
                    )}
                    <li onClick={onLinkHandler1}>자기소개서...........12</li>
                    <li onClick={onLinkHandler2}>내 교환일기들........34</li>
            </ul>

            <div className='mobile_navbar_sub mobileRight'>오늘은 어떤 일기가<br/>기다리고 있을까</div>
        </div>
        }

        </div>
        </div>
    </div>


  )
}

export default SlideMenu