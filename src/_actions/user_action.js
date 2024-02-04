import axios from "axios";
import { LOGIN_USER, REGISTER_USER, UNAUTHORIZED_ERROR } from "./types"
import { useStore } from "react-redux";

export const updateUser= (userData) =>({
  type: LOGIN_USER,
  payload: userData
})

export const loginUser = (dataTosubmit) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('/login', dataTosubmit);

        const accessToken =  response.headers.authorization;
        const refreshToken = response.headers.refresh;

        // 액세스 토큰을 헤더에 저장
       axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

       // 로컬 스토리지에 액세스 토큰과 리프레시 토큰 저장
       localStorage.setItem("accessToken", accessToken);
       localStorage.setItem("refreshToken", refreshToken);
        
      console.log("로컬에저장한 액세스토큰: ",accessToken, "리프레시",refreshToken)
      
      // 로컬 스토리지에서 토큰을 가져와서 Redux 상태 업데이트
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      dispatch(updateUser({ accessToken: storedAccessToken, refreshToken: storedRefreshToken }));
    
      dispatch({
        type: LOGIN_USER,
        payload: response.status
      });

      return response; // 추가로 onSubmitHandler에서 처리하기 위해 전체 응답을 반환합니다.
      } 
      catch (error) {
        console.error('Async Action Error:', error);
        throw error; // 추가로 onSubmitHandler에서 처리하기 위해 에러를 다시 던집니다.
      }
    };
  };

export const refreshAccessToken = () => {
  return async (dispatch) => {
    try {
      // 로컬 스토리지에서 리프레시 토큰 가져오기
      const refreshToken = localStorage.getItem('refreshToken');

      // 서버에 리프레시 토큰을 전송하여 새로운 액세스 토큰 받기
      const response = await axios.post('/refresh-token', { refreshToken });

      // 새로 받은 액세스 토큰을 로컬 스토리지와 Redux에 저장
      const newAccessToken = response.data.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      dispatch(updateUser({ accessToken: newAccessToken }));
      
      // 성공적으로 액세스 토큰을 갱신했을 때 추가적으로 처리할 로직
      console.log("액세스토큰 갱신 완료")

    } catch (error) {
      // 리프레시 토큰이 만료되었거나 다른 이유로 갱신에 실패한 경우
      console.error('Error refreshing access token:', error);

      // 로그아웃 액션을 디스패치하여 사용자를 로그아웃 상태로 만듭니다.
      //dispatch(logoutUser());
    }
  };
}
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