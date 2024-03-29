import React from 'react'
import { useState, useRef,useEffect } from 'react';
import '../../../css/slidemenu.css';


function SlideMenu() {
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
    <div onClick={toggleSide} className='menuButton'>목차
         {
        <div id="sidebar" isOpen={isOpen} setIsOpen={setIsOpen}
        ref={outside} className={isOpen ? 'open' : ''}>
            <div id='closeSlideMenu'  onClick={toggleSide} onKeyDown={toggleSide}>닫기</div>
            <ul>
                <li>슬라이드 메뉴1</li>
                <li>슬라이드 메뉴2</li>
                <li>슬라이드 메뉴3</li>
            </ul>
        </div>
    }
    </div>

  )
}

export default SlideMenu