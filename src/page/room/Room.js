import React, { useCallback, useContext, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import 'page/room/Room'
import socketIOClient from "socket.io-client"
import _ from 'lodash'
import req2svr from './req2svr'
import './Room.scss'
import { Context } from "context/context"
import eventBus from 'eventBus'
import moment from 'moment'
const socket = socketIOClient( 'http://localhost:8080' )

const Room = () => {
  const history = useNavigate()
  const { user } = useContext( Context )

  const [ roomList, setRoomList ] = useState( [] )

  useEffect( async () => {
    socket.emit( 'init', user )
    socket.on( 'chat', ( data ) => {
      eventBus.dispatch( 'fromChat', data )
    } )

    await refreshRoomList()
    notiftChattingEvent()
    return () => eventBus.remove( 'fromChat' )
  }, [] )

  const refreshRoomList = async () => {
    const userId = _.get( user, 'userId' )
    const { roomList } = await req2svr.getRoomList( userId )
    setRoomList( roomList )
  }

  const makeRoom = useCallback( () => {
    history( 'makeroom' )
  }, [] )

  const joinRoom = ( roomId, userGroupString ) => {
    history( '/chat', { state: { roomId, userGroupString } } )
  }

  const notiftChattingEvent = () => {
    eventBus.on( 'fromChat', () => {
      refreshRoomList()
    } )
  }

  const dataFormat = ( value ) => {
    return moment( value * 1 ).format( 'MM-DD hh:mm:ss' )
  }

  return (
    <div className="room-wrapper">
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
        { roomList.map( v => {
          return <div className='room' key={ v.roomId } onClick={ () => { joinRoom( v.roomId, v.userGroupString ) } }>
            <div className='image-wrapper'>
              <div className='image-content'>wq</div>
            </div>
            <div className='chat-content'>
              <div className='name'>{ v.userGroupString }</div>
              <div className='last-chat'>{ v.lastChat }</div>
            </div>
            <div className='time-zone'>
              <div className='time'>{ dataFormat( v.lastChatDate ) }</div>
              { v.notRead ?
                <div className='not-read-box'>
                  <div className='not-read-text'>{ v.notRead }</div>
                </div> : 
                <div></div> }
              
            </div>
          </div>
        } ) }
      </div>
      
    </div>
  )
}

export default React.memo( Room )
