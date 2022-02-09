import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router'
import 'page/room/Room'
import socketIOClient from "socket.io-client";
import _ from 'lodash'
import req2svr from './req2svr'
import './Room.scss'
import { useEffect } from 'react/cjs/react.development';
import { Context } from "context/context"
const socket = socketIOClient( 'http://localhost:8080' )

const Room = () => {
  const history = useNavigate()
  const { user } = useContext( Context )

  useEffect( () => {
    socket.emit( 'init', user )
  }, [ user ] )

  const makeRoom = useCallback( () => {
    history( 'makeroom' )
  }, [] )

  return (
    <div className="room">
      <div className='header'>
        <div className='title'>채팅</div>
        <div className='icon-area'>
          <span className="material-icons search">
            search
          </span>
          <span className="material-icons plus" onClick={makeRoom}>
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
