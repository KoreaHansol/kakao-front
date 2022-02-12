import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import 'page/room/Room'
import socketIOClient from "socket.io-client"
import _, { initial } from 'lodash'
import req2svr from './req2svr'
import './Chat.scss'
import { Context } from "context/context"
import CustomInput from 'components/customInput/CustomInput'
import CustomButton from 'components/customButton/CustomButton'
import eventBus from 'eventBus'
const socket = socketIOClient( 'http://localhost:8080' )

const Chat = () => {
  const [ chatValue, setChatValue ] = useState( '' )
  const [ userGroupString, setUserGroupString ] = useState( '' )
  const { user } = useContext( Context )

  const [ chatList, setChatList ] = useState( [] )

  const contentEl = useRef()

  let { state } = useLocation()
  const history = useNavigate()
  useEffect( () => {
    const roomId = _.get( state, 'roomId' )
    if( !roomId ) {
      alert( '존재하지 않는 방입니다.' )
      history( '/room' )
      return
    }
    initState( roomId )
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
    if( !chatValue ) {
      return
    }
    const userId = _.get( user, 'userId' )
    const roomId = _.get( state, 'roomId' )
    await req2svr.pushChat( userId, chatValue, roomId )
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
        <textarea className="text-area" maxLength={ 99 } value={ chatValue } onChange={ inputChangeHandler }/>
        <div className='btn-area'>
        {/* onClick, children, disabled */}
          <CustomButton onClick={ sendClickHandler } disabled={ !chatValue }>
            <div>전송</div>
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default React.memo( Chat )
