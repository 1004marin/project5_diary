import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function MyinfoPage() {

const [Email, setEmail] = useState("hello")
const [Username,setUsername] = useState("")
const [Nickname,setNickname] = useState("")
const [BloodyType, setBloodyType] = useState("")
const [Motto, setMotto] = useState("")
const [Address, setAddress] = useState("")

axios.get('/user/info').then(response => {
  console.log(response.data)

  setEmail(response.data.email)
  setUsername(response.data.username)
  setNickname(response.data.nickname)
  setBloodyType(response.data.bloodyType)
  setAddress(response.data.address)
  setMotto(response.data.motto)
})
const onNicknameHandler = (e) =>{
  setNickname(e.currentTarget.value)
}

const onBloodyTypeHandler = (e) =>{
  setBloodyType(e.currentTarget.value)
}

const onMottoHandler = (e) =>{
  setMotto(e.currentTarget.value)
}
const onAddressHandler = (e) =>{
  setAddress(e.currentTarget.value)
}
//내정보를 다른 페이지에서도 접근할일이 있나?
//=>다이어리작성할때(나중에 reducer에 저장하기!)
  return (
    <form style={{height:"100vh", backgroundColor:"pink", display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center"}}>
      <label>아이디</label>
      <div style={{width:"20vh", height:"2vh", backgroundColor:"white"}}>{Email}</div>

      <label>닉네임</label>
      <input type="text" value ={Nickname} onChange={onNicknameHandler}/>

      <label>유저 이름</label>
      <div style={{width:"20vh", height:"2vh", backgroundColor:"white"}}>{Username}</div>

      <label>혈액형</label>
      <input type="text" value ={BloodyType} onChange={onBloodyTypeHandler}/>

      <label>모토</label>
      <input type="text" value ={Motto} onChange={onMottoHandler}/>

      <label>주소</label>
      <input type="text" value ={Address} onChange={onAddressHandler}/>

      <br/>
      <button type="submit">수정버튼</button>
    </form>
  )
}

export default MyinfoPage