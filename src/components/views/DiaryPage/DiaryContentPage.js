import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function DiaryContentPage() {
    const location = useLocation();
    const { diaryId } = location.state || {};
    console.log("다이어리 id는:", diaryId)

    const YearMonth = {
        yearMonth: "2023-02-01"
    }
    useEffect(() => {
        if(diaryId) {
            // diaryId를 사용하여 axios를 통해 요청을 보냄
            axios.get(`/api/v1/diary/${diaryId}`, { params: { yearMonth: '2024-02-01' } })
                .then(response => {
                    // 요청 성공 시 처리할 로직
                    console.log('다이어리 내용:', response);
                })
                .catch(error => {
                    // 요청 실패 시 처리할 로직
                    console.error('다이어리 내용을 불러오는 중 오류 발생:', error);
                });
        }
    }, [diaryId]); // diaryId가 변경될 때마다 useEffect가 호출되도록 설정

    return (
        <div>DiaryContentPage</div>
    );
}
export default DiaryContentPage