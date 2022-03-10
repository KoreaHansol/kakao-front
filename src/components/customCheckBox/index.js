import React, { useMemo } from "react"
import PropTypes from "prop-types"
import './customCheckbox.scss'

const CustomCheckbox = ( { value, readOnly, trueValue, falseValue, onChange } ) => {
  
  const isChecked = useMemo( () => {
    return value === trueValue
  }, [ value, trueValue ] )

  const changeInput = () => {
    if( readOnly ) {
      return 
    }
    isChecked ? onChange( falseValue ) : onChange( trueValue )
  }

  return (
   <div className="checkbox-wrapper" onClick={ changeInput }>
     <div className={ isChecked ? 'box checked' : 'box none' }>
      <span className="done material-icons">{ isChecked && 'done' }</span>
     </div>
   </div> 
  ) 
}

CustomCheckbox.defaultProps = {
  value: false,
  readOnly: false,
  trueValue: true,
  falseValue: false
}

CustomCheckbox.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default React.memo( CustomCheckbox )