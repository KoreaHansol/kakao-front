import React, { useCallback, useEffect, useState } from 'react'
import './MakeRoom.scss'
import _ from 'lodash'
import req2svr from './req2svr'




const MakeRoom = () => {
  const [ userList, setUserList ] = useState( [] )

  useEffect( async () => {
    const result = await req2svr.getuserlist()
    console.log( 'result', result )
  }, [] )


  return (
    <div>makeRoom</div>
  )
}

export default React.memo( MakeRoom )
