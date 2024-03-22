
import './App.css';
import {Route, Routes} from "react-router-dom"
import axios from 'axios';
import { useEffect } from 'react';

import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MyinfoPage from './components/views/MyinfoPage/MyinfoPage';
import PasswordPage from './components/views/LoginPage/PasswordPage'

//다이어리
import DiaryListPage from './components/views/DiaryPage/DiaryListPage';
import DiaryCreatePage from './components/views/DiaryPage/DiaryCreatePage';
import DiaryContentPage from './components/views/DiaryPage/DiaryContentPage';
import DiaryWritePage from './components/views/DiaryPage/DiaryWritePage';
import DiaryInfoPage from './components/views/DiaryPage/DiaryInfoPage';
import DiaryDrawPage from './components/views/DiaryPage/DiaryDrawPage';
import DiaryPostPage from './components/views/DiaryPage/DiaryPostPage';

const is_refreshToken = localStorage.getItem("refreshToken");
const is_accessToken = localStorage.getItem("accessToken");
const is_logined = localStorage.getItem("is_logined");
    console.log("app액세스",is_accessToken)
    console.log("app리프레시",is_refreshToken)
    console.log("로긘상태",is_logined)
  

function App() {

  return(
      <Routes>
        <Route path='/navbar' element={<NavBar/>}/>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/myinfo" element={<MyinfoPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/password" element={<PasswordPage/>}/>

        <Route path="/diaryCreate" element={<DiaryCreatePage/>}/>
        <Route path="/diaryList" element={<DiaryListPage/>}/>
        <Route path="/diaryContent" element={<DiaryContentPage/>}/>
        <Route path="/diaryWrite" element={<DiaryWritePage/>}/>
        <Route path="/diaryInfo" element={<DiaryInfoPage/>}/>
        <Route path="/diaryDraw" element={<DiaryDrawPage/>}/>
        <Route path="/diaryPost" element={<DiaryPostPage/>}/>
 
       </Routes>

  )

}

export default App;
