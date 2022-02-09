import React, { useCallback } from "react"
import _ from 'lodash'
import './customCheckBox.scss'
import { useMemo } from "react/cjs/react.development"
import PropTypes from "prop-types"

const CustomCheckBox = ( { value, readOnly, trueValue, falseValue, onChange } ) => {
  
  const isChecked = useMemo( () => {
    return value === trueValue
  }, [ value ] )

  const changeInput = () => {
    if( readOnly ) {
      return 
    }
    isChecked ? onChange( falseValue ) : onChange( trueValue )
  }

  return (
   <div className="checkbox-wrapper" onClick={ changeInput }>
     <div className={ isChecked ? 'box checked' : 'box none' }>
      <span className="material-icons">{ isChecked && 'done' }</span>
     </div>
   </div> 
  ) 
}

CustomCheckBox.defaultProps = {
  value: false,
  readOnly: false,
  trueValue: true,
  falseValue: false
}

CustomCheckBox.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default React.memo( CustomCheckBox )