import axios from 'axios'
import apiurl from 'util/apiurl'
import _ from 'lodash'

let checkResCode = res => {
  if( _.get( res, 'data.code' ) === 200 ) return _.get( res, 'data.payload' )
  else return Promise.reject( _.get( res, 'data' ) )
}

export default {
  getuserlist() {
    return axios.get( apiurl( '/getuserlist' ) ).then( x => checkResCode( x ) )
  },
  registerUser( data ) {
    return axios.post( apiurl( '/registeruser' ), data ).then( x => checkResCode( x ) )
  },
  makeRoom( userList ) {
    return axios.post( apiurl( '/makeroom' ), userList ).then( x => checkResCode( x ) )
  }
}
