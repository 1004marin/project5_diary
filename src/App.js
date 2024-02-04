
import './App.css';
import {Route, Routes} from "react-router-dom"
import axios from 'axios';
import { useEffect } from 'react';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MyinfoPage from './components/views/MyinfoPage/MyinfoPage';
import PasswordPage from './components/views/LoginPage/PasswordPage'
import DiaryWrite from './components/views/DiaryWritePage/DiaryWrite';
import Auth from './hoc/auth';







  const is_accessToken = localStorage.getItem("accessToken");
  if(is_accessToken){
    axios.defaults.headers.common['Authorization'] = is_accessToken;
    console.log("로그인유지중:",is_accessToken)
  }
  else{
    console.log("로그아웃됨!")
  }
function App() {

  return(
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<LandingPage/>}/>
        <Route path="/myinfo" element={<MyinfoPage/>}/>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/password" element={<PasswordPage/>}/>

        <Route path="/diaryWrite" element={<DiaryWrite/>}/>
 
 
       </Routes>

  )

}

export default App;
