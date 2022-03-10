import React, { useCallback } from "react"
import './CustomInput.scss'

const CustomInput = ( { value, placeHolder, onChange, disabled } ) => {
  const onChangeHandler = useCallback( ( event ) => {
    onChange( event.target.value )
  } )

  return (
   <div className="wrapper">
    <input className="pure-input"
      value={ value }
      placeholder={ placeHolder }
      onChange={ onChangeHandler }/>
   </div> 
  ) 
}

export default React.memo( CustomInput )