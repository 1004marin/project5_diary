import axios from 'axios';
import store from './store';
import { unauthorizedError } from '../_actions/user_action';

// 모든 http 요청에 대해 중복코드 작성 x, http응답 모두 일괄 처리!
axios.interceptors.response.use(//토큰만료거하나넣기
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      // 500 status의 에러가 발생하면 UNAUTHORIZED_ERROR 액션을 디스패치
      store.dispatch(unauthorizedError()).then(
        console.log("액세스 재발급 완료: axiosConfig")
      )
      .catch(error => {
        

      }

      )
    }
    return Promise.reject(error);
  }
);
