import React from 'react'
import 'page/room/Room'
import _ from 'lodash'
import req2svr from './req2svr'
import './Room.scss'

const Room = () => {

  return (
    <div className="room">
      <div className='header'>
        <div className='title'>채팅</div>
        <div className='icon-area'>
          <span className="material-icons search">
            search
          </span>
          <span class="material-icons plus">
            playlist_add
          </span>
        </div>
      </div>
      <div className='content'>
        <div className='room'>
          <div className='user-image'>
            image
          </div>
          <div className='user-info'>
            <div className='top'>
              <div className='name'>name</div>
              <div className='time'>03:00:00</div>
            </div>
            <div className='content'>
              asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
            </div>
          </div>
        </div>
     
      </div>
      
    </div>
  )
}

export default React.memo( Room )
