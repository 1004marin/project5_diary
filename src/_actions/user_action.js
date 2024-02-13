import axios from "axios";
import { LOGIN_USER, REGISTER_USER, UNAUTHORIZED_ERROR,LOGOUT_USER,LOGOUT_REQUESTED } from "./types"
import { useStore } from "react-redux";
import store from '../_middleware/store'
import { Navigate, useNavigate } from "react-router-dom";

//쓸지말지
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
       axios.defaults.headers.common['Authorization'] = `${accessToken}`;
       axios.defaults.headers.common['Refresh'] = `${refreshToken}`;  // 리프레시 토큰 추가 // 리프레시 토큰 추가
       // 로컬 스토리지에 액세스 토큰과 리프레시 토큰 저장
       localStorage.setItem("accessToken", accessToken);
       localStorage.setItem("refreshToken", refreshToken);

      console.log(response)
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
      console.log('재발급리프레시:',refreshToken)

      const storedAccessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;


      // 서버에 리프레시 토큰을 전송하여 새로운 액세스 토큰 받기
      const response = await axios.post('/api/v1/accessToken', null, { headers: {
        'Refresh': `${refreshToken}`,
      }});
      //경로체크
      console.log('액세스 재발급:',response)

      // 새로 받은 액세스 토큰을 로컬 스토리지와 Redux에 저장
      const newAccessToken = response.data
      localStorage.setItem('accessToken', newAccessToken);

    // 모든 axios 요청의 헤더에 새로운 액세스 토큰 추가
    /*이게 왜 작동 안할까!?
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    */

    dispatch(updateUser({ accessToken: newAccessToken }));
      
      
      if(response.status === 200){
        alert("액세스토큰재발급 완료!")
      }
      console.log("액세스토큰 갱신 완료")

    } catch (error) {
      // 리프레시 토큰이 만료되었거나 다른 이유로 갱신에 실패한 경우
      console.error('Error refreshing access token:', error);

      // 로그아웃 액션을 디스패치하여 사용자를 로그아웃 상태로 만듭니다.

        dispatch(logout_requested())
          .then(response => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
      
            // 헤더 초기화
            delete axios.defaults.headers.common['Authorization'];
            delete axios.defaults.headers.common['Refresh'];
      
            // Redux 상태 업데이트 등 추가적인 처리가 필요하다면 여기에서 수행
      
            // 로그아웃 상태로 업데이트
            dispatch({
              type: LOGOUT_USER
            });
            const navigate = useNavigate()
            navigate('/login')
            
            alert("토큰이만료되엇어용! 다시로그인 ㄱ")

          }
          )
    }
  };
}

//액세스 토큰 만료 시
export const unauthorizedError = () => ({
  type: UNAUTHORIZED_ERROR,
});

//로그아웃 요청시, 플래그 true변경용
export const logout_requested = () => ({
  type: LOGOUT_REQUESTED,
});

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // 로컬 스토리지에서 토큰 정보 가져오기
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      console.log("저장된 액세스",storedAccessToken)
      console.log("리프레시 토큰", storedRefreshToken)


      // 서버에 로그아웃 요청 (헤더에 설정된 토큰을 서버로 전송)
      const response = await axios.post('/api/v1/logout',null, { headers: {
        'Authorization': `${storedAccessToken}`,
        'Refresh': `${storedRefreshToken}`,
      }});
      console.log(response.data)
      // 로컬 스토리지에서 토큰 정보 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // 헤더 초기화
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['Refresh'];

      // Redux 상태 업데이트 등 추가적인 처리가 필요하다면 여기에서 수행

      // 로그아웃 상태로 업데이트
      dispatch({
        type: LOGOUT_USER
      });

    } catch (error) {
      console.error('Logout Error:', error);
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