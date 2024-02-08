
import './App.css';
import {Route, Routes} from "react-router-dom"
import axios from 'axios';
import { useEffect } from 'react';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MyinfoPage from './components/views/MyinfoPage/MyinfoPage';
import PasswordPage from './components/views/LoginPage/PasswordPage'





  const is_accessToken = localStorage.getItem("accessToken");
    //axios.defaults.headers.common['Authorization'] = {is_accessToken};
    console.log("app액세스",is_accessToken)

  

function App() {

  return(
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<LandingPage/>}/>
        <Route path="/myinfo" element={<MyinfoPage/>}/>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/password" element={<PasswordPage/>}/>
        
 
 
       </Routes>

  )

}

export default App;
