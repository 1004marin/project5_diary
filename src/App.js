
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return(


      <Routes>

        <Route path="/" element={<RegisterPage/>} />


      </Routes>

    
  )

}

export default App;
