import { useEffect } from 'react'
import '../src/App.scss'
import Routes from './router'
import toastManager from './toastManager'
import eventBus from './eventBus'

const App = () => {
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
