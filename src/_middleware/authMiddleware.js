
import { refreshAccessToken} from '../_actions/user_action';
import store from './store';
// Redux 미들웨어
const authMiddleware = (store) => (next) => async (action) => {

  if (action.type === 'UNAUTHORIZED_ERROR') {
    try {
      console.log("재발급 토큰과정")
      await store.dispatch(refreshAccessToken())
      .then(
        console.log("미들웨어에서 디스패치햇구요")
        
      )
      
      .catch(error=>{
        console.log("미들웨어 토큰 재발급 에러", error)
      })
      return next(action);


      // !!!!!!!!!!!!!!!!!!!이거 테스트!!!!!!!!리프레시 토큰이 성공적으로 사용되면 다시 시도한 액션을 디스패치
    } 
    catch (error) {
       console.log("미들웨어 리프레시 에러")
    }
  }

  //만료 안되었을 땐, 그냥 action바로
  return next(action);
};

export default authMiddleware;