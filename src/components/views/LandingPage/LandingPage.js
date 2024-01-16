import {React, useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
    //landing page에 들어오자마자 아래를 실행
    useEffect(()=> {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    },[])
    const navigate = useNavigate();
    const onClickHandler = ()=>{
      axios.get('/api/users/logout')
      .then(response => {
        console.log(response.data)
        if(response.data.sucess){
          navigate('/login')
        }
        else
        alert('로그아웃 못함')
      })
    }

  return (
    <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
    display:'flex', justifyContent:'center', alignItems:'center'}}>
        LandingPage.입니다용

        <button onClick={onClickHandler}>
          로그아웃
          </button>
    </div>


  )
}

export default LandingPage