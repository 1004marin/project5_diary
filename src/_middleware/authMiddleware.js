
import { logoutUser, refreshAccessToken,unauthorizedError } from '../_actions/user_action';

// Redux 미들웨어
const authMiddleware = (store) => (next) => async (action) => {
    console.log(store.getState().user.Is_logout_requested)

      // 로그아웃 요청이 들어왔을 때의 처리
  
  if (action.type === 'logout_requested_user') {
    console.log("로그아웃요청 미들웨어")

    // 액세스 토큰 갱신 로직을 수행하지 않도록 플래그를 true로 변경
    store.dispatch({ type: 'logout_flag' });
    console.log("true로바꾸기:",store.getState().user.Is_logout_requested)
    store.dispatch(logoutUser());

    return;
  }
//
  if (action.type === 'UNAUTHORIZED_ERROR'&& !store.getState().user.Is_logout_requested) {
    try {
      console.log("재발급 토큰과정")
      // 액세스 토큰이 만료되었을 때 리프레시 토큰을 사용하여 액세스 토큰 새로고침
      await store.dispatch(refreshAccessToken());

      // 리프레시 토큰이 성공적으로 사용되면 다시 시도한 액션을 디스패치
      return next(action);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // 리프레시 토큰 갱신에 실패하면 로그아웃 또는 다른 처리를 수행할 수 있습니다.
    }
  }
  

  return next(action);
};

export default authMiddleware;