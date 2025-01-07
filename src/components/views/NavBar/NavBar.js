import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/navbar.scss'

import { useDispatch } from 'react-redux'
import {logoutUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()
  const dispatch= useDispatch()
      //로그아웃
      const onLogoutHandler = () => {
        dispatch(logoutUser())
          .then(response => {
            // 로그아웃이 성공한 경우 여기에 추가적인 처리를 할 수 있습니다.
            navigate('/')

          })
          .catch(error => {
            // 로그아웃 중 에러가 발생한 경우 여기에 처리를 할 수 있습니다.
            //console.error('Logout Error:', error);
          });
      };

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
  return (
    <div className='navbar'>
      <div className='navbar_content'>
        <div className='navbar_title'>목차...</div>
        <div className='navbar_sub'>일기교환클럽으로<br/>새로운 추억이<br/>생길지도..ww</div>


        <ul className='navbar_menu'>
          {localStorage.getItem("is_logined") ? (
                    <li onClick={onLogoutHandler}><span>로그아웃</span><span>. . . 3</span></li>
                  ) : (
                  <Link to='/'>
                  <li className='link'><span>로그인</span><span>. . . 3</span></li>
                  </Link>
                  )}
                  <li onClick={onLinkHandler1}><span>자기소개서</span><span>. . . 12</span></li>
                  <li onClick={onLinkHandler2}><span>내 교환일기들</span><span>. . . 34</span></li>
        </ul>

        <div className='navbar_sub right'>오늘은 어떤 일기가<br/>기다리고 있을까</div>
      </div>

    </div>

  )
}

export default NavBar