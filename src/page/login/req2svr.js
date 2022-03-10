import axios from 'axios'
import _ from 'lodash'
import apiurl from '../../util/apiurl'

let checkResCode = res => {
  if( _.get( res, 'data.code' ) === 200 ) return _.get( res, 'data.payload' )
  else return Promise.reject( _.get( res, 'data' ) )
}

export default {
  registerUser( data ) {
    return axios.post( apiurl( '/registeruser' ), data ).then( x => checkResCode( x ) )
  },
  validateuser( data ) {
    return axios.post( apiurl( '/validateuser' ), data ).then( x => checkResCode( x ) )
  }
}
