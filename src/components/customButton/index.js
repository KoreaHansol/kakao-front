import React from "react"
import './CustomButton.scss'

const CustomButton = ( { onClick, children, disabled } ) => {

  return (
   <div className="custom-button" onClick={ ( e ) => { onClick( e ) } } style={ disabled ? { backgroundColor: '#f6f6f6', color: '#ACACAC' } : {} }>
     { children }
   </div> 
  )
}

export default React.memo( CustomButton )