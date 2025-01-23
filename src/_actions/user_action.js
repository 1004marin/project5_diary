import axios from "axios";
import { LOGIN_USER, REGISTER_USER, UNAUTHORIZED_ERROR,LOGOUT_USER, EXPIRED_REFRESH} from "./types"
import store from "../_middleware/store";
import CONFIG from "./config";


export const loginUser = (dataTosubmit) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}/login`, dataTosubmit);

        const accessToken =  response.headers.authorization;
        const refreshToken = response.headers.refresh;

        // 액세스 토큰을 헤더에 저장
       axios.defaults.headers.common['Authorization'] = `${accessToken}`;
       axios.defaults.headers.common['Refresh'] = `${refreshToken}`; 
       // 로컬 스토리지에 액세스 토큰과 리프레시 토큰 저장
       localStorage.setItem("accessToken", accessToken);
       localStorage.setItem("refreshToken", refreshToken);

      
      dispatch({
        type: LOGIN_USER,
        payload: response.status
      });
      localStorage.setItem("logined_user", dataTosubmit.username);
      localStorage.setItem("is_logined", "is_logined");
      return response; // 추가로 onSubmitHandler에서 처리하기 위해 전체 응답을 반환합니다.
      } 
      catch (error) {
        //console.error('Async Action Error:', error);
        throw error; // 추가로 onSubmitHandler에서 처리하기 위해 에러를 다시 던집니다.
      }
    };
  };

export const NotLogin=()=> {

  return async()=>{
    try{
      alert("권한이 없습니다. 부원 증명을 해주세요!")
    }
    catch (error){
      //console.error(error);
    }
  }
}
export const refreshAccessToken = () => {

//리프레시만! 액세스x
  return async (dispatch) => {
    try {
      axios.defaults.headers.common['Authorization'] = `${""}`;
      const refreshToken = localStorage.getItem('refreshToken');

      await axios.post(`${CONFIG.API_BASE_URL}/api/v1/accessToken`, null, { headers: {
        'Refresh': `${refreshToken}`,
      }})
      .then(response=>{

        const newAccessToken = response.data
        localStorage.setItem('accessToken', newAccessToken);

        //console.log("액세스토큰 갱신 완료")
        alert("토큰 갱신! 다시 시도해주세요!")
        window.location.reload();//업뎃 보여주기용
        return;
      })
      .catch(error=>{
        //console.log("리프레시 액션에서 에러요", error)
      })

      
    }
    catch{}
  };
}

export const unauthorizedError = () => ({
  type: UNAUTHORIZED_ERROR,
});

export const ExpiredRefreshError = () => {

  return async (dispatch) => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('logined_user');
    localStorage.removeItem('is_logined');
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Refresh'];
    dispatch({
      type: EXPIRED_REFRESH
    });
     //console.log("액세스,리프레시 만료: 로그아웃!")
     alert("토큰이 만료되었어용. 다시 부원 인증해주세요!")
  }

}

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // 로컬 스토리지에서 토큰 정보 가져오기
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");


      // 서버에 로그아웃 요청 (헤더에 설정된 토큰을 서버로 전송)
      const response = await axios.post(`${CONFIG.API_BASE_URL}/api/v1/logout`,null, { headers: {
        'Authorization': `${storedAccessToken}`,
        'Refresh': `${storedRefreshToken}`,
      }});
      // 로컬 스토리지에서 토큰 정보 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('logined_user');
      localStorage.removeItem('is_logined');
      // 헤더 초기화
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['Refresh'];

      // Redux 상태 업데이트 등 추가적인 처리가 필요하다면 여기에서 수행

      // 로그아웃 상태로 업데이트
      dispatch({
        type: LOGOUT_USER
      });
      return 'Logout requested successfully'; 

    } catch (error) {
      //console.error('Logout Error:', error);
    }
  };
};


export function registerUser(dataTosubmit){
    
    const request = axios.post(`${CONFIG.API_BASE_URL}/join`, dataTosubmit)
    .then(response => response.data
      
      )

    return{
        type: REGISTER_USER,
        payload: request//"회원가입완료"
    }

}