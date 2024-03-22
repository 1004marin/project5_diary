import React from 'react'
import '../../../css/navbar.scss'

function NavBar() {
  return (
    <div className='navbar'>
      <div className='navbar_content'>
        <div className='navbar_title'>목차...</div>
        <br/>
        <div className='navbar_sub'>일기교환클럽으로<br/>새로운 만남이 생길지도..</div>
        <li className='navbar_menu'>
            <ul>로그인...........3</ul>
            <ul>자기소개서...........12</ul>
            <ul>내 교환일기들.......34</ul>
        </li>

        <div className='navbar_sub'>오늘은 어떤 일기가<br/>기다리고 있을까</div>
      </div>

    </div>

  )
}

export default NavBar