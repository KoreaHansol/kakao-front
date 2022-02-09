import React, { useCallback, useContext, useEffect, useState } from 'react'
import req2svr from './req2svr'
import _ from 'lodash'
import 'page/login/Login.scss'
import KakaoImage from 'static/image/kakao.jpeg'
import CustomInput from 'components/customInput/CustomInput'
import CustomInputSelector from 'components/customInputSelector/CustomInputSelector'
import CustomButton from 'components/customButton/CustomButton'
import { useNavigate } from 'react-router'
import { Context } from "context/context"

const Login = () => {
  const [ idList, setIdList ] = useState( [] )
  const [ idValue, setIdValue ] = useState( '' )
  const [ passValue, setPassValue ] = useState( '' )
  const { contextDispatch } = useContext( Context )

  const history = useNavigate()

  useEffect( () => {
    // 로컬스토리지
    const dummyDataList = [
      { userId: 'hansol1992', userName: '김한솔1' },
      { userId: '01039307860', userName: '김한솔2' }
    ]
    setIdList( dummyDataList )
  }, [] )

  const onChangeInput = useCallback( ( value ) => {
    setIdValue( value )
  }, [] )

  const onSelectHandler = useCallback( ( value ) => {
    setIdValue( value )
  }, [] )

  const onChangePasswordHandler = useCallback( ( value ) => {
    setPassValue( value )
  }, [] )

  const onDeleteHandler = useCallback( ( value ) => {
    const list = _.filter( idList, id => id.userId !== value )
    setIdList( list )
  }, [ idList ] )

  const onLoginClick = useCallback(  async () => {
    const data = { email: idValue, password: passValue }
    const { result } = await req2svr.validateuser( data )
    if( result.length ) {
      const user = {
        ..._.get( result, '0' )
      }
      contextDispatch( { type: 'SETUSER', user } )
      window.localStorage.setItem( 'user', JSON.stringify( user ) )
      history( 'room' )
    }
  }, [ idValue, passValue ] )

  const onClickSingUp = useCallback( () => {
    history( 'signup' )
  } )

  return (
    <div className="login">
      <div className="header">
        <span className="icon material-icons">settings</span>
      </div>
      <div className="content">
        <img alt="kakao" className="kakao-image" src={ KakaoImage }/>
        <div className="input-area">
          <CustomInputSelector onChange={ onChangeInput }
                              items={ idList } 
                              value={ idValue }
                              valueProp='userId'
                              textProp='userId'
                              keyProp='userId'
                              placeHolder='카카오계정 (이메일 또는 전화번호)'
                              onSelect={ onSelectHandler }
                              onDelete={ onDeleteHandler }/>
          <CustomInput value={ passValue }
                        placeHolder='비밀번호'
                        onChange={ onChangePasswordHandler }/>

          <CustomButton disabled={ !idValue || !passValue }
                        onClick={ onLoginClick }>
            <div className='text-log-in'>로그인</div>
          </CustomButton>
        </div>
      </div>
      <div className='footer'>
        <div className='singup' onClick={ onClickSingUp }>회원가입</div>
        <div className='reset-pass'>비밀번호 재설정</div>
      </div>
    </div>
  )
}

export default React.memo( Login )
