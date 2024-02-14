import {React, useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { refreshAccessToken } from '../../../_actions/user_action';

function LandingPage() {
  const dispatch = useDispatch()
  const onTokenHandler=()=>{
    dispatch(refreshAccessToken()).then(
      response => {
        console.log("리프레시 새로 발급")
      }
    )
  }
  return (
    <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
    display:'flex', justifyContent:'center', alignItems:'center'}}>
        LandingPage.입니다용

          <Link to='/myinfo'>
          <button >
          내정보로 이동
          </button>
          </Link>

          <button onClick={onTokenHandler}>토큰재발급</button>

    </div>


  )
}

export default LandingPage