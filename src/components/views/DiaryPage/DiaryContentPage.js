import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiaryCalender.css'


function DiaryContentPage() {
    const navigate = useNavigate()
    const location = useLocation();

    const { Client_diaryId } = location.state || {};
    const [member_to_add,setMember_to_add] = useState("멤버")
    const [Client_postId, setClient_PostId] = useState("")
    const onPostIdHandler =()=>{
        navigate('/diaryPost', { state: { Client_postId} },{ state: { Client_diaryId} })
    }
    //달력
    const [date, setDate] = useState(new Date());
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);

    useEffect(() => {
        fetchPosts();

    }, [date]);


    const fetchPosts = async() =>{
        const storedAccessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;
        // 서버에서 해당 월에 있는 포스트를 가져오는 API를 호출합니다.
            try {
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
                const response = await axios.get(`/api/v1/diary/${Client_diaryId}`, { params: { yearMonth: formattedDate } });
                setPosts(response.data);
                setSelectedPost([]);
            } catch (error) {
                console.error('Error getting posts:', error);
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
/*
    const formatDate = (date) => {
        // 날짜를 "YYYY-MM-DD" 형식으로 포맷합니다.
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };
*/
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
            }
            if(error.response.data.message === '존재하지 않는 회원입니다.'){
                alert("없는 회원이에용!")
            }
            else{
                alert("멤버 추가 에러!")
            }
        })
    }

    return (
        <div style={
            { height:'100vh', display:"flex", flexDirection:"column", background:"#D2E1FF", 
            justifyContent:'center', alignItems:'center'}}>       


            <label>다이어리입니당</label>
            <div>
            <Calendar
                onChange={setDate}
                value={date}
                tileContent={tileContent}
                onClickDay={(date) => handleTileClick(date)}
            />
            <div>
                {selectedPost.map((post, index) => (
                    <div key={index}>
                        <p onClick={()=>{
                            setClient_PostId(post.id)
                            onPostIdHandler()
                        }}>{post.title}</p>
                        <p>{post.writer.username}</p>
                        <p>{post.id}</p>
                    </div>
                ))}
            </div>
            </div>



            <br/>
            <button onClick={onMemberInviteHandler}>멤버 초대</button>
            <input value={member_to_add} onChange={onMember_to_addHandler}></input>

            <br/>
            <button onClick={onDiaryInfoHandler}>다요리 정보</button>
            <Link to="/diaryWrite">
                <button type="button">일기 쓰기</button>
            </Link>
        </div>

    );
}
export default DiaryContentPage