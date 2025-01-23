import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu'
import '../../../css/myinfo_delete.scss'
import CONFIG from "../../../config"

function MyinfoDeletePage() {
    const navigate = useNavigate();
    const [DeletePassword,setDeletePassword] = useState("")

    const onDeletePasswordHandler = (e) =>{
        setDeletePassword(e.currentTarget.value)
    }
    //체크박스
    const [isChecked, setIsChecked] = useState(false);//체크박스
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    //탈퇴
    const onDeleteHandler = () => {
        
            if(!DeletePassword){
            alert("비번을 입력하세요")
            return
            }

            if(!isChecked){
                alert("탈퇴 약관에 동의해주세요ㅡㅡ")
                return
            }
            const storedAccessToken = localStorage.getItem("accessToken");
            axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        
            const params = {
            data: {
                password: DeletePassword
            }
            };
        
            axios.delete(`${CONFIG.API_BASE_URL}/api/v1/user`, params).then(
            response => {
                if(response.data === "회원 탈퇴 성공"){
                alert("탈퇴성공이요!")
                }
                navigate('/');
            }
            )
            .catch(error => {
            if(error.response.data.message === '비밀번호가 일치하지 않습니다.'){
                alert(error.response.data.message)
            }
            else{
                alert("탈퇴에러요!")
                console.error("탈퇴에러요:", error)
            }
            })
    }


    return (
        <div className='MyinfoDelete'>
            
            <div className='inner_navbar'>
                <NavBar/>
            </div>

            <div className='myinfoDelete_formbox'>
                <div className='moblie_menu'>
                    <SlideMenu/>
                </div>

                <div className='myinfoDelete_inner_formbox'>
                    <div className='inner_title'>
                        <div className='title'>일기교환클럽<br/>
                        자기 소개서<span>(笑)</span>
                        </div>
                        <img className="myinfo_pinkBubble"src={process.env.PUBLIC_URL + '/profile.png'} alt=""/>
                    </div>
                      <form className='myinfoDelete_formbox_content'>
        
                        <label>PasswordConfirm</label>
                        <input type="password" value={DeletePassword} onChange={onDeletePasswordHandler}></input>
        

                        <div className='delete_notice'>
                        ※ 일기교환클럽 탈퇴 시, 내 기록들은 모두 불에 태울거에요.<br/><br/>
                        ※ 뿐만 아니라, 클럽 내의 일들은 모두 비밀로 유지되어야 해요. 이 약속이 어겨질 시...
                        </div>
                        <label className='delete_agree'>
                            <input
                            className='check'
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            />
                            <span className='check_icon'></span>
                            <span className='delete_check_text'>클럽의 규칙을 맹세해요.</span>
                         </label>    
                      </form>
                      <button type="button" className='delete_submit_button' onClick={onDeleteHandler}>탈퇴할래요</button>
                    </div>
            </div>
            </div>
          )
        
          }


export default MyinfoDeletePage