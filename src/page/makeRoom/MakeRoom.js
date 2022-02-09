import React, { useCallback, useEffect, useState, useContext } from 'react'
import { Context } from "context/context"
import _ from 'lodash'
import req2svr from './req2svr'
import './MakeRoom.scss'
import CustomCheckBox from 'components/customCheckBox/customCheckBox'
import { useNavigate } from 'react-router'
import { useMemo } from 'react/cjs/react.development'

const MakeRoom = () => {
  const { user } = useContext( Context )
  const [ userList, setUserList ] = useState( [] )
  const [ checkList, setCheckList ] = useState( {} )
  const history = useNavigate()

  useEffect( async () => {
    const { result } = await req2svr.getuserlist()
    setUserList( result )
  }, [] )

  const checkBoxHandler = useCallback( ( id ) => {
    let newMap = { ...checkList }
    if( !_.get( newMap, id ) ) {
      newMap[id] = true
      setCheckList( newMap )
    } else {
      setCheckList( _.omit( newMap, id ) )
    }
  }, [ checkList ] )

  const makeRoom = () => {
    const userList = [ user.id, 
      ..._( checkList )
          .keys()
          .map( o => o * 1 )
          .value() 
    ]
    req2svr.makeRoom( userList )
  }

  const processedUserList = useMemo( () => {
    return _.filter( userList, usr => {
      return _.get( usr, 'id' ) !== _.get( user, 'id' )
    } )
  }, [ userList ] )

  return (
    <div className="make-room-wrapper">
      <div className="header">
        <span className="material-icons" onClick={ () => { history( -1 ) } }>chevron_left</span>
        <div className="complete" onClick={ makeRoom }>완료</div>
      </div>
      <div className="content">
        { processedUserList.map( v => {
          return (
            <div className="user-wrapper" key={ v.id }>
              <div className="user-name">{ v.name }</div>
              <CustomCheckBox value={ checkList[v.id] } onChange={ () => { checkBoxHandler( v.id ) } }/>
            </div>
          )
        } ) }
      </div>
    </div>
  )
}

export default React.memo( MakeRoom )
