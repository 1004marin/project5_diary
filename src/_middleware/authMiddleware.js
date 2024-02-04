
import { refreshAccessToken } from '../_actions/user_action';

// Redux 미들웨어
const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'UNAUTHORIZED_ERROR') {
    try {
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