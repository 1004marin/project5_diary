import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types"
import { useStore } from "react-redux";

export const updateUser= (userData) =>({
  type: LOGIN_USER,
  payload: userData
})

export const loginUser = (dataTosubmit) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('/login', dataTosubmit);
        const token = response.headers.authorization;
  
        //토큰 헤더에 저장
        axios.defaults.headers.common['Authorization'] = token;

        localStorage.setItem("token", token);
        const RealToken = localStorage.getItem("token")
        
        console.log("로컬에저장한 토큰: ",RealToken)
               
       dispatch(updateUser(dataTosubmit))
        return{
          type: LOGIN_USER,
          payload: response.status
        }
        return response; // 추가로 onSubmitHandler에서 처리하기 위해 전체 응답을 반환합니다.
      } 
      catch (error) {
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
/*
export const auth = () => {
  return async (dispatch) => {
    try {
      // 로컬 스토리지나 세션 스토리지에서 토큰을 읽어옴
      const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (storedToken) {
        axios.defaults.headers.common['Authorization'] = storedToken;

        const response = await axios.get('/api/v1/user/info');
        console.log(response)
        if (response.status === 200) {
          // 유저 정보가 있다면 로그인 상태로 간주하여 Redux 상태를 업데이트
          dispatch({
            type: AUTH_USER,
            payload: {
              status: 200, // 실패 상태 코드를 적절히 설정
              data: '로그인되어잇음',
            },
          });
        }
      } else {
        // 토큰이 없으면 로그인 상태를 초기화
        dispatch({
          type: AUTH_USER,
          payload: {
            status: 400, // 실패 상태 코드를 적절히 설정
            data: null,
          },
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // 유저 정보를 가져오는 데 실패하면 로그인 상태를 초기화
      dispatch({
        type: AUTH_USER,
        payload: {
          status: 400, // 실패 상태 코드를 적절히 설정
          data: null,
        },
      });
    }
  };
};
/*
export function auth(){//get메소드라서 body 필요 x
    
    const request = axios.get('/api/users/auth')
    .then(response => response.data)
    return{
        type: AUTH_USER,
        payload: request
    }
    
}
*/