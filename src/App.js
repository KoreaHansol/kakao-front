import 'App.css'
import Routes from 'router/Routes'
import React, { useEffect, useContext } from 'react'
import { Context } from "context/context"
import socketIOClient from "socket.io-client"
const socket = socketIOClient( 'http://localhost:8080' )

const App = () => {
  const { user } = useContext( Context )
  console.log( 'user', user )
  useEffect( async () => { // refresh
    socket.emit( 'init', user )
  }, [] )

  return (
    <div className="app">
      <Routes/>
    </div>
  )
}

export default App
