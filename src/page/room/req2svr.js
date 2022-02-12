import axios from 'axios'
import apiurl from 'util/apiurl'
import _ from 'lodash'

let checkResCode = res => {
  if( _.get( res, 'data.code' ) === 200 ) return _.get( res, 'data.payload' )
  else return Promise.reject( _.get( res, 'data' ) )
}

export default {
  getRoomList( userId ) {
    return axios.get( apiurl( '/getroomlist' ), { params: { userId } } ).then( x => checkResCode( x ) )
  }
}
