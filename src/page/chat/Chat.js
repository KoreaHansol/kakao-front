import React, { useCallback, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import 'page/room/Room'
import socketIOClient from "socket.io-client"
import _ from 'lodash'
import req2svr from './req2svr'
import './Chat.scss'
const socket = socketIOClient( 'http://localhost:8080' )

const Chat = () => {
  let { state } = useLocation()
  const history = useNavigate()
  useEffect( () => {
    const roomId = _.get( state, 'roomId' )
    console.log( 'roomId', roomId ) 
    if( !roomId ) {
      alert( '존재하지 않는 방입니다.' )
      history( '/room' )
      return
    }

  }, [] )
  return (
    <div className="chat-room-wrapper">
      <div className='header'>
        <div className='names'>이름,이름,이름</div>
      </div>
      <div className='content'>
        {/* anotherchat */}
        <div className='another-chat'>
          <div className='image'>
            <span className='person material-icons'>person</span>
          </div>
          <div className='chat-box'>
          sadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasd
          </div>
          <div className='time'>오전 9:30</div>
        </div>
        {/* mychat */}
        <div className='my-chat'>
          <div className='time'>오전 9:30</div>
          <div className='chat-box'>
          sadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasdsadasdasdasd
          </div>
        </div>


      </div>
      <div className='input-area'>

      </div>
    </div>
  )
}

export default React.memo( Chat )
