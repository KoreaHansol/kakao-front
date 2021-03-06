import axios from 'axios'
import _ from 'lodash'
import apiurl from '../../util/apiurl'

let checkResCode = res => {
  if( _.get( res, 'data.code' ) === 200 ) return _.get( res, 'data.payload' )
  else return Promise.reject( _.get( res, 'data' ) )
}

export default {
  pushChat( userId, chatValue, roomId, userName ) {
    return axios.post( apiurl( '/pushchat' ), {userId, chatValue, roomId, userName} ).then( x => checkResCode( x ) )
  },
  getchatlist( roomId ) {
    return axios.get( apiurl( '/getchatlist' ), { params: { roomId } } ).then( x => checkResCode( x ) )
  }
}
