import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Context } from "../../context"
import _ from 'lodash'
import req2svr from './req2svr'
import './MakeRoom.scss'
import CustomCheckBox from '../../components/customCheckbox'

const MakeRoom = () => {
  const { user } = useContext( Context )
  const [ userList, setUserList ] = useState( [] )
  const [ checkList, setCheckList ] = useState( {} )
  const history = useNavigate()

  useEffect( async () => {
    const { result } = await await req2svr.getuserlist()
    setUserList( result )
  }, [] )

  const checkBoxHandler = userId => {
    let newMap = { ...checkList }
    if( !_.get( newMap, userId ) ) {
      newMap[userId] = true
      setCheckList( newMap )
    } else {
      setCheckList( _.omit( newMap, userId ) )
    }
  }

  const makeRoom = async () => {
    if( _.isEmpty( checkList ) ) {
      alert( '친구를 선택해주세요' )
      return
    } 
    const userList = [ user.userId, 
      ..._( checkList )
          .keys()
          .map( o => o * 1 )
          .value() 
    ]
    const { roomId } = await req2svr.makeRoom( userList )
    if( roomId ) {
      history( '/chat', { state: { roomId } } )
    }
  }

  const processedUserList = useMemo( () => {
    return _.filter( userList, usr => {
      return _.get( usr, 'userId' ) !== _.get( user, 'userId' )
    } )
  }, [ userList ] )

  return (
    <div className="make-room-wrapper">
      <div className="header">
        <div className='header-text'>대화상대 선택</div>
        <span className="close-make material-icons" onClick={ () => { history( -1 ) } }>close</span>
      </div>
      <div className="content">
        <div className='friend'>친구 { _.get( processedUserList, 'length', 0 ) }</div>
        { processedUserList.map( v => {
          return (
            <div className="user-wrapper" key={ v.userId }>
              <div className='dummy-image-box'>
                <span className="person material-icons">person_outline</span>
              </div>
              <div className="user-name">{ v.name }</div>
              <div className='box-wrapper'>
                <CustomCheckBox value={ checkList[v.userId] } onChange={ () => { checkBoxHandler( v.userId ) } }/>
              </div>
            </div>
          )
        } ) }
      </div>

      <div className='footer'>
        <div className={ !_.isEmpty( checkList ) ? 'button-apply' : 'button-apply disabled' } onClick={ makeRoom }>
          완료
        </div>
        <div className='button-cancel' onClick={ () => { history( -1 ) } }>
          취소
        </div>
      </div>
    </div>
  )
}

export default React.memo( MakeRoom )
