import _ from "lodash"
import React, { useReducer, createContext } from "react"

export const Context = createContext()

const initialState = {
  user: {}
}

const reducer = ( state, action ) => {
  switch ( action.type ) {
    case "SETUSER" :
      return {
        ...state,
        user: action.user,
      }
    
    default:
      throw new Error();
  }
}

const ContextProvider = ( { children } ) => {
  const [ state, contextDispatch ] = useReducer( reducer, initialState )
  try { // refresh
    const localUser = JSON.parse( window.localStorage.getItem( 'user' ) )
    if( !_.isEmpty( localUser ) && _.isEmpty( state.user ) ) {
      state.user = localUser
    }
  } catch( err ) {
    console.error( err )
  }
  return (
    <Context.Provider value={ { user: state.user, contextDispatch } }>
      { children }
    </Context.Provider>
  )
}

export default ContextProvider