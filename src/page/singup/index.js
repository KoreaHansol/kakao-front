import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import _ from 'lodash'
import req2svr from './req2svr'
import './SignUp.scss'
import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'

const SignUp = () => {
  const [ email, setEmail ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ passwordConfirm, setPasswordConfirm ] = useState( '' )
  const [ name, setName ] = useState( '' )
  const [ reason, setReason ] = useState( [] )
  const [ sign, setSign ] = useState( false )

  const history = useNavigate()

  const onChangeEmail = value => {
    setEmail( value )
  }

  const onChangePassword = value => {
    setPassword( value )
  }

  const onChangePasswordConfirm = value => {
    setPasswordConfirm( value )
  }

  const onChangeName = value => {
    setName( value )
  }

  const singUp = async () => {
    setSign( true )

    if( validate ) {
      try {
        const result = await req2svr.registerUser( {
          email, password, name
        } )
        console.log( 'result', result )
        if( result ) {
          history( '/' )
        }
      } catch( err ) {
        if( _.get( err, 'code' ) === 404 ) {
          alert( '이메일이 중복됩니다.' )
        }
        console.error( err )
      }
    }
  }

  const validate = useMemo( () => {
    let arr = []
    if( !email || !password || !passwordConfirm || !name ) {
      arr.push( '필요한 정보를 모두 입력해주세요' )
    }

    if( password !== passwordConfirm ) {
      arr.push( '비밀번호를 정확히 입력해주세요' )
    }

    // if( !_.includes( email, '@' ) ) {
    //   arr.push( '이메일 형식이 올바르지 않습니다' )
    // }

    setReason( arr )

    if( !arr.length ) {
      return true
    }

    return false
  }, [email ,password ,passwordConfirm ,name] )

  return (
    <div className="signup">
      <div className='header'>
        <span className="material-icons" onClick={ () => { history( -1 ) } }>chevron_left</span>
      </div>
      <div className='title-area'>
        <div className='title'>회원가입</div>
      </div>
      <div className='content'>
        <div className='id'>
          <div className='title'><span>계정</span><span className='star'>*</span></div>
          <CustomInput placeHolder={ '이메일' } value={ email } onChange={ onChangeEmail }/>
          <CustomInput placeHolder={ '비밀번호' } value={ password } onChange={ onChangePassword }/>
          <CustomInput placeHolder={ '비밀번호 확인' } value={ passwordConfirm } onChange={ onChangePasswordConfirm }/>
        </div>
        <div className='name'>
          <div className='inform'>
            <div><span>이름</span><span className='star'>*</span></div>
          </div>
          <CustomInput placeHolder={ '이름을(를) 입력하세요' } value={ name } onChange={ onChangeName }/>
        </div>

        <div className='error-reason'>
          { sign && reason && reason.map( v => {
            return <div key={ v }>{ v }</div>
          } ) }
        </div>
        
      </div>
      <div className='footer'>
        <CustomButton onClick={ singUp } disabled={ !validate }>가입하기</CustomButton>
      </div>
    </div>
  )
}

export default React.memo( SignUp )
