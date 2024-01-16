import {React, useEffect} from "react";
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

const AuthFunction =(SpecifiComponent, option, adminRoute = null) => {
    //옵션의 종류
    //null  =>  아무나 출입이 가능한 페이지
    //true  => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    //관계자 페이지 필요 없음 null이라고 해두기. es6문법

        function AuthenticationCheck(props){

            const dispatch = useDispatch();

            useEffect( () => {
                dispatch(auth()).then(reponse => {
                    console.log(reponse)
                })
            }, [])

            return(
                <SpecifiComponent />
            )
        }

    return <AuthenticationCheck/>;
}

export default AuthFunction;