import axios from 'axios'
import apiurl from 'util/apiurl'
import _ from 'lodash'

let checkResCode = res => {
  if( _.get( res, 'data.code' ) === 200 ) return _.get( res, 'data.payload' )
  else return Promise.reject( _.get( res, 'data' ) )
}

export default {
  pushChat( userId, chatValue, roomId ) {
    return axios.post( apiurl( '/pushchat' ), {userId, chatValue, roomId} ).then( x => checkResCode( x ) )
  },
  getchatlist( roomId ) {
    return axios.get( apiurl( '/getchatlist' ), { params: { roomId } } ).then( x => checkResCode( x ) )
  }
}
