const eventBus = {
  on( event, callback ) {
    document.addEventListener( event, e => callback( e.detail ) )
  },
  dispatch( event, data ) {
    document.dispatchEvent( new CustomEvent( event, { detail: data } ) )
  },
  remove( event ) {
    document.removeEventListener( event )
  }
}

export default eventBus