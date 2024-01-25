import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types"
import { useState } from "react";


export function LoginUser(dataTosubmit){


    const request = axios.post('/login', dataTosubmit)
    .then(response => response.data
        


             // 예를 들어, Redux 액션을 디스패치하여 저장할 수 있습니다.
            // dispatch(saveTokenAction(token));
        )
        return {//user_action reducer로 보내기
            type: LOGIN_USER,//type +
            payload: request// response data. 즉 backend가 준 정보 넣어둠
        }
    //1) 서버에서 받은 데이터를 request에 저장

    //action은 type + response 형식
    //2) reducer에 보내야 함. reducer에서 preState와 action을 조합해서 다음 state를 만들어줌

    
}


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