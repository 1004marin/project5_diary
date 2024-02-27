
import {LOGIN_USER, REGISTER_USER, UNAUTHORIZED_ERROR, EXPIRED_REFRESH, LOGOUT_USER, DIARY_ID} from '../_actions/types';

const initialState = {
    loginSucess: false,
    register:null,
    username:'',
    Is_refresh_expired: false,
}
//로그인하고 재발급 된 후에도 닉네임 있는지 체크

//prevState + action을 가졌으니, nextState 돌려주기
export default function (state= initialState, action) {
    console.log('유저리듀서')
    switch (action.type) {//why 스위치문법? action의 type이Login_user만은 아니니까 타입마다 다른 조치 취하기
        case LOGIN_USER:
            return {...state, 
                    loginSucess: action.payload === 200 ? true : false,
                    username: action.payload === 200 ? action.username : "",
                    Is_refresh_expired: false}
            break;
        case LOGOUT_USER:
            return {...state, loginSucess: 'Logout'}
             break;
        case REGISTER_USER:
            return {...state, register: action.payload}
            break;
        case UNAUTHORIZED_ERROR:
                return {...state, Is_refresh_expired: true}//이거 재발급 되고 다시 false로
                break;
        case 'reAccess_success':
            return{...state, Is_refresh_expired: false}//이거 빼도 재발급 후에 로그아웃되지 않는지 체크
            break;
        case EXPIRED_REFRESH:
            return{...state, loginSucess: 'Logout', Is_refresh_expired: false}
            break;
        default:
            return state;
            
    }
}

//type만 import 해오시면 action은 리덕스 쪽에서 알아서 처리해서 보내줍니다 ^^ 
//user action을 import하지 않아도 됨