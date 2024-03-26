import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/register_complete.scss'
import NavBar from '../NavBar/NavBar';

function RegisterCompletePage() {
  return (
    <div className='registerComplete'>
      <div className='inner_navbar'>
        <NavBar/>
      </div>
      <div className='registerComplete_box'>
            <div className='complete_message'>
              <div className="complete_message_text">
              일기교환클럽의<br/>
                부원이 된 걸<br/>
                축하해요
              </div>
            </div>
            <Link to='/login'>
                <div className='complete_toLogin'>※ 부원 인증하러가기</div>
            </Link>
        </div>
      </div>
  )
}

export default RegisterCompletePage