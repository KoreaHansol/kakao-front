import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Context } from "../../context"
import eventBus from '../../eventBus'
import req2svr from './req2svr'
import _ from 'lodash'
import './Chat.scss'
import '../room'
import CustomButton from '../../components/customButton'
import socket from '../../util/socket'

const Chat = () => {
  const [ chatValue, setChatValue ] = useState( '' )
  const [ userGroupString, setUserGroupString ] = useState( '' )
  const { user, contextDispatch } = useContext( Context )

  const [ chatList, setChatList ] = useState( [] )

  const contentEl = useRef()
  const textArea = useRef()

  let { state } = useLocation()
  const history = useNavigate()
  useEffect( () => {
    const roomId = _.get( state, 'roomId' )
    if( !roomId ) {
      alert( '존재하지 않는 방입니다.' )
      history( '/room' )
      return
    }
    contextDispatch( { type: 'SETROOMID', roomId } )
    initState( roomId )

    return () => {
      socket.emit( 'leave', { userId: _.get( user, 'userId' ), roomId } )
      contextDispatch( { type: 'SETROOMID', roomId: null } )
    }
  }, [] )

  const toScrollBottom = () => {
    const { scrollHeight } = contentEl.current || 0
    if( !scrollHeight ) {
      return
    }
    contentEl.current.scrollTop = scrollHeight
  }

  const initState = async ( roomId ) => {
    await refreshChatList( roomId )

    socket.emit( 'enter', { userId: _.get( user, 'userId' ), roomId } )

    const userGroupString = _.get( state, 'userGroupString' )
    setUserGroupString( userGroupString )
    notiftChattingEvent( roomId )

    toScrollBottom()
  }

  const notiftChattingEvent = ( roomId ) => {
    eventBus.on( 'fromChat', async () => {
      await refreshChatList( roomId ) 
      toScrollBottom()
    } )
  }

  const refreshChatList = async ( roomId ) => {
    const { chatList } = await req2svr.getchatlist( roomId )
    setChatList( chatList )
  }

  const inputChangeHandler = useCallback( ( e ) => {
    setChatValue( e.target.value )
  }, [] )

  const sendClickHandler = async () => {
    textArea.current.focus()
    if( !chatValue ) {
      return
    }
    const userId = _.get( user, 'userId' )
    const roomId = _.get( state, 'roomId' )
    const userName = _.get( user, 'name' )
    await req2svr.pushChat( userId, chatValue, roomId, userName )
    setChatValue( '' )
  }

  return (
    <div className="chat-room-wrapper">
      <div className='header'>
        <span className="back material-icons" onClick={ () => { history( '/room' ) } }>chevron_left</span>
        <div className='names'>{ userGroupString }</div>
      </div>
      <div className='content' ref={contentEl}>
        { chatList.map( v => {
          return (
            <div key={v.chatId}>
              { v.userId === user.userId ? 
                <div className='my-chat'>
                  <div className='time'>{ v.create_date }</div>
                  <div className='chat-box'>{ v.message }</div>
                </div> :
                <div className='another-chat'>
                  <div className='image'>
                    <span className='person material-icons'>person</span>
                  </div>
                  <div className='content-box'>
                    <div className='name'></div>
                    <div className='chat-box'>{ v.message }</div>
                  </div>
                  <div className='time'>{ v.create_date }</div>
                </div>
              }
            </div>
          )
        } ) }
      </div>
      <div className='input-area'>
        <textarea className="text-area" maxLength={ 99 } value={ chatValue } onChange={ inputChangeHandler } ref={ textArea }/>
        <div className='btn-area'>
          <CustomButton onClick={ sendClickHandler } disabled={ !chatValue }>
            <div>전송</div>
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default React.memo( Chat )
