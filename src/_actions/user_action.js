import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types"


export const loginUser = (dataTosubmit) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('/login', dataTosubmit);
        const token = response.headers.authorization;
  
        if (token) {
          axios.defaults.headers.common['Authorization'] = token;
        }
  
        dispatch({
          type: 'LOGIN_USER',
          payload: response
        });
  
        return response; // 추가로 onSubmitHandler에서 처리하기 위해 전체 응답을 반환합니다.
      } catch (error) {
        console.error('Async Action Error:', error);
        throw error; // 추가로 onSubmitHandler에서 처리하기 위해 에러를 다시 던집니다.
      }
    };
  };


export function registerUser(dataTosubmit){
    
    const request = axios.post('/join', dataTosubmit)
    .then(response => response.data)

    return{
        type: REGISTER_USER,
        payload: request//"회원가입완료"
    }

}

export function auth(){//get메소드라서 body 필요 x
    
    const request = axios.get('/api/users/auth')
    .then(response => response.data)
    return{
        type: AUTH_USER,
        payload: request
    }
    
}