import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import SlideMenu from '../NavBar/SlideMenu';
import '../../../css/diary_content.scss';

import Calendar from 'react-calendar';
import moment from "moment";
import 'react-calendar/dist/Calendar.css';
import './DiaryCalender.css'



function DiaryContentPage() {
    const navigate = useNavigate()
    const location = useLocation();

    const { Client_diaryId } = location.state || {};

    const [post_writer, setPost_writer] = useState("")
    const [member_to_add,setMember_to_add] = useState("")
    const [Client_postId, setClient_PostId] = useState("")

    const onPostIdHandler =(postId, postWriter)=>{
        setClient_PostId(postId)
        setPost_writer(postWriter)
        navigate('/diaryPost', {
            state: { 
                Client_postId: postId,
                Client_diaryId,
                post_writer
              }
        })
    }
    const onDiaryWriteHandler=()=>{
        navigate('/diaryWrite', {state: {Client_diaryId}})
    }
    //달력
    const [date, setDate] = useState(new Date());
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    useEffect(() => {
        fetchPosts();
    }, [date]); 
    


    const handleActiveStartDateChange = ({ activeStartDate }) => {
        // 달력의 활성 시작 날짜 변경 이벤트 처리
        setDate(activeStartDate); // 달력의 달 변경 시 상태 업데이트
      };
    const fetchPosts = async() =>{

        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        // 서버에서 해당 월에 있는 포스트를 가져오는 API를 호출합니다.
            try {
                console.log('실행')
                setLoading(true); // 데이터 가져오는 중 로딩 시작
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
                const response =await axios.get(`/api/v1/diary/${Client_diaryId}`, { params: { yearMonth: formattedDate } });
                setPosts(response.data)

                //setSelectedPost([]);
                //1)달 바꾸고 [빈배열]=> 2) post있는 날짜 클릭[selected]  => 3)2)로 인해 컴포넌트 마운트되면서 다시 
            } catch (error) {
                console.error('Error getting posts:', error);
            } finally {
                setLoading(false); // 데이터 가져오기 완료 후 로딩 종료
                console.log('실행ㅇㄹ')
            }
            

    }

    const handleTileClick = (date) => {
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const selectedPosts = posts.filter((post) => post.date === formattedDate);
        setSelectedPost(selectedPosts);
    };
    // 달력의 날짜에 포스트가 있는 경우 해당 날짜를 반환하는 함수
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          
            const hasPost = posts.find((post) => post.date === formattedDate);
            return hasPost ? <div className="post-marker"></div> : null;  
        }
    };


//멤버추가
    const onMember_to_addHandler=(e)=>{
        setMember_to_add(e.currentTarget.value)
    }
    const onDiaryInfoHandler=()=>{
        navigate('/diaryInfo', { state: { Client_diaryId } })
    }
    const onMemberInviteHandler=()=>{

        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

        const jsonAddMem = {
            username : member_to_add
        }
        axios.post(`/api/v1/diary/${Client_diaryId}/member`, jsonAddMem)
        .then(response=>{
            console.log(response.data)

            if(response.data === "멤버 추가 완료"){
                alert("멤버 추가 성공!")
            }
        })
        .catch(error=>{
            console.log(error)
            if(error.response.data.message === 'Diary member limit exceeded'){
                alert("멤버제한 초과에요!")
                return;
            }
            if(error.response.data.message === '존재하지 않는 회원입니다.'){
                alert("존재하지 않는 부원이에용!")
                return;
            }
            else{
                alert("멤버 추가 에러!")
            }
        })
    }
    return (
        <div className='diaryContent'>       
            <div className='inner_navbar'>
                <NavBar/>
            </div>    

            <div className='diaryContent_formbox'>

                <div className='moblie_menu'>
                    <SlideMenu/>
                </div>
                <div className='diaryContent_inner_formbox'>
                    <div className='inner_title'>
                        <div className='title'>일기교환클럽<br/>먼슬리...</div>
                    </div>


                        <div className='calendar'>
                            <div className='pc_1'>
                                <Calendar className="calendar_custom"
                                    onChange={setDate}
                                    value={date}
                                    tileContent={tileContent}
                                    formatDay={(locale, date) => moment(date).format("DD")} /* 일 빼기 */
                                    onClickDay={(date) => handleTileClick(date)}
                                    onActiveStartDateChange={handleActiveStartDateChange} 
                                />
                                <div className='diaryContent_formbox_content'>
                                    <div>
                                    {loading && <div>Loading...</div>} {/* 로딩 상태에 따라 로딩 UI 표시 */}
                                        {selectedPost.map((post, index) => (
                                            <div key={index}>
                                                <p onClick={()=>{
                                                    onPostIdHandler(post.id, post.writer.username)
                                                    
                                                }}>
                                                    <label>Title</label>
                                                    <div className='diaryContent_post'>{post.title}</div>
                                                </p>

                                                    <label>Writer</label>
                                                    <div className='diaryContent_post'>{post.writer.username}</div>
                                                    <span className='diaryContent_line'></span>
                                            </div>
                                        ))} 
                                    </div>
                                </div>
                            </div>
                            <div className='pc_2'>
                                <div className='diaryContent_invite_member'>
                                    <input value={member_to_add} placeholder="멤버 이름"onChange={onMember_to_addHandler}></input>
                                    <button onClick={onMemberInviteHandler}>초대</button>
                                </div>

                                <div className='diaryContent_button'>
                                    <button onClick={onDiaryInfoHandler}>정보</button>
                                    <button type="button" onClick={onDiaryWriteHandler}>쓰기</button>
                                </div>
                        </div>

                    



        </div>
        </div>        
        </div>
        </div>

    );
}
export default DiaryContentPage