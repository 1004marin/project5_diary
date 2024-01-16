import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types';

//prevState + action을 가졌으니, nextState 돌려주기
export default function (state={}, action) {
    console.log('유저리듀서에용',action.payload)
    switch (action.type) {//why 스위치문법? action의 type이Login_user만은 아니니까 타입마다 다른 조치 취하기
        case LOGIN_USER:
            return {...state, loginSucess: action.payload}//...위를 그대로 가져옴. 빈상태
            break;
        case REGISTER_USER:
            return {...state, register: action.payload}
            break;
        case AUTH_USER:
            return {...state, userData: action.payload}//action.payload에 백에서 보내는 유저 모든 데이터 있음
            break;
        default:
            return state;
            
    }
}
//type만 import 해오시면 action은 리덕스 쪽에서 알아서 처리해서 보내줍니다 ^^ 
//user action을 import하지 않아도 됨