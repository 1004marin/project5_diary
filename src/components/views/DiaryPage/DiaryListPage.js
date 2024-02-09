import React from 'react'
import axios from 'axios'
import { useState } from 'react'


function DiaryListPage() {
    const storedAccessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common['Authorization'] = `${storedAccessToken}`;

    axios.get('/api/v1/diary').then(
        response =>{
            console.log(response)
        }
    )
  return (
    <div>DiaryListPage</div>
  )
}

export default DiaryListPage