import 'App.css'
import Routes from 'router/Routes'
import React, { useEffect, useContext } from 'react'
import { Context } from "context/context"
import socketIOClient from "socket.io-client"
import eventBus from 'eventBus'
const socket = socketIOClient( 'http://localhost:8080' )

const App = () => {
  const { user } = useContext( Context )
  useEffect( async () => { // refresh
    socket.emit( 'init', user )
    socket.on( 'chat', ( data ) => {
      eventBus.dispatch( 'fromChat', data )
    } )
    return () => eventBus.remove( 'fromChat' )
  }, [] )

  return (
    <div className="app">
      <Routes/>
    </div>
  )
}

export default App
