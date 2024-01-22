
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import axios from 'axios';
import { useEffect } from 'react';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MyinfoPage from './components/views/MyinfoPage/MyinfoPage';
import Auth from './hoc/auth';


function App() {

  return(

    

        <Routes>

        <Route path="/" element={<RegisterPage/>} />
        <Route path="/home" element={<LandingPage/>}/>
        <Route path="/myinfo" element={<MyinfoPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
 
 
       </Routes>

  )

}

export default App;
