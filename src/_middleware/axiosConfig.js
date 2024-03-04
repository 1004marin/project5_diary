import axios from 'axios';
import store from './store';
import { unauthorizedError, ExpiredRefreshError, NotLogin} from '../_actions/user_action';

//http응답 모두 일괄 처리!
axios.interceptors.response.use(
  (response) => response,
  async (error) => {

    //로그인안하고 권한 접근 시
    if(error.response && error.response.status === 403){
      const is_accessToken = localStorage.getItem("accessToken");
    
      console.log(is_accessToken)
      if(!localStorage.getItem("is_logined")){
        store.dispatch(NotLogin())
        alert("회원 권한이 없습니다! 로그인해주셔요!")
        return
      }
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
