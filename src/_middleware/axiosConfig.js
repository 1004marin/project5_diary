import axios from 'axios';
import store from './store';
import { unauthorizedError } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

// 모든 http 요청에 대해 중복코드 작성 x, http응답 모두 일괄 처리!
axios.interceptors.response.use(//토큰만료거하나넣기
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      // 500 status의 에러가 발생하면 UNAUTHORIZED_ERROR 액션을 디스패치
      console.log("axiosConfig: 리프레시 만료됨?: ",store.getState().user.Is_refresh_expired )
      //리프레시 만료 시, 강제 로그아웃
      store.dispatch(unauthorizedError()).then(
        console.log("axiosConfig: unauthorized 디스패치")
      )
    }
    return Promise.reject(error);
  }
);

/*      if(store.getState().user.Is_refresh_expired === true){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    
        delete axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['Refresh'];
    
        alert("config: 로그인 만료! 로그인새로 하셤")
        const navigate = useNavigate
        navigate('/login')
        return;
      } */