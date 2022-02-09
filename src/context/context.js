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

  // contextDispatch( state.user, )
  
  return (
    <Context.Provider value={ { user: state.user, contextDispatch } }>
      { children }
    </Context.Provider>
  )
}

export default ContextProvider