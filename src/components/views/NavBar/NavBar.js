import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/navbar.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {logoutUser } from '../../../_actions/user_action';

function NavBar() {
  const dispatch= useDispatch()
      //로그아웃
      const onLogoutHandler = () => {
        dispatch(logoutUser())
          .then(response => {
            // 로그아웃이 성공한 경우 여기에 추가적인 처리를 할 수 있습니다.
            console.log(response);
          })
          .catch(error => {
            // 로그아웃 중 에러가 발생한 경우 여기에 처리를 할 수 있습니다.
            console.error('Logout Error:', error);
          });
      };
  return (
    <div className='navbar'>
      <div className='navbar_content'>
        <div className='navbar_title'>목차...</div>
        <div className='navbar_sub'>일기교환클럽으로<br/>새로운 만남이<br/>생길지도..ww</div>


        <ul className='navbar_menu'>
          {localStorage.getItem("is_logined") ? (
              <li onClick={onLogoutHandler}>로그아웃...............3</li>
            ) : (
            <Link to='/login'>
              <li className='link'>로그인................3</li>
            </Link>
            )}
              <li>자기소개서...........12</li>
              <li>내 교환일기들........34</li>
        </ul>

        <div className='navbar_sub right'>오늘은 어떤 일기가<br/>기다리고 있을까</div>
      </div>

    </div>

  )
}

export default NavBar