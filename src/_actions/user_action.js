import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types"
import { useState } from "react";


export function LoginUser(dataTosubmit){


    axios.post('/login', dataTosubmit)
    .then(response => {
        const token = response.headers.authorization; // 헤더에서 토큰 추출

        if (token) {
            axios.defaults.headers.common['Authorization'] = token; // Axios 기본 헤더에 토큰 설정
        }

        return {//user_action reducer로 보내기
            type: LOGIN_USER,//type +
            payload: response.data// response data. 즉 backend가 준 정보 넣어둠
        }
    }
)
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