import axios from 'axios';
import store from './store';
import { unauthorizedError, ExpiredRefreshError } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom'; // useHistory 추가
//http응답 모두 일괄 처리!
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const is_accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate(); 

    //로컬에 토큰이 아예 없을때, 즉 로그인 안했을때 페이지 접근시
    if(!is_accessToken){
      navigate('/login');
      alert("axiosConfig:로그인해주세요")

      return
    }

    //로그인이미 했는데 만료되었을때
    if (error.response && error.response.status === 500) {
     
      console.log("axiosConfig: 리프레시 만료됨?: ",store.getState().user.Is_refresh_expired )
      
      //리프레시 만료 시, 강제 로그아웃
      if(store.getState().user.Is_refresh_expired === true){
        store.dispatch(ExpiredRefreshError()).then(
          console.log("axiosConfig: 강제로그아웃 할게요")
        )
      }
      else{
        store.dispatch(unauthorizedError()).then(
          console.log("axiosConfig: unauthorized 디스패치")
        )
      }
    }
    return Promise.reject(error);//.catch(인터셉터에서 에러 발생시에 에러 전달)
  }
);
