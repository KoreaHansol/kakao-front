import 'App.scss'
import { useEffect, useContext } from 'react'
import Routes from 'router/Routes'
import toastManager from 'toastManager'
import eventBus from 'eventBus'
import { Context } from "context/context"

const App = () => {
  const { user, roomId } = useContext( Context )

  useEffect( () => {
    eventBus.on( 'fromChat', data => {
        toastManager.open( { message: data.message, userName: data.fromUserName } )
    } )
  }, [] )
  return (
    <>
      <div className="app">
        <Routes/>
      </div>
      <div className='toast-anchor'>
        { toastManager.Render() }
      </div>
    </>
  )
}

export default App
