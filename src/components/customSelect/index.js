import React, { useCallback, useMemo, useState } from "react"
import _ from 'lodash'
import './CustomSelect.scss'

const CustomSelect = ( { items, valueProp, textProp, keyProp, onSelect, disabled } ) => {
  const [ isOpen, setIsOpen ] = useState( false )
  const [ selectedText, setSelectedText ] = useState( null )

  const processedItem = useMemo( () => {
    return _.map( items, item => {
      return {
        value: _.get( item, valueProp, item ),
        text: _.get( item, textProp, item ),
        key: _.get( item, keyProp, item )
      }
    } )
  }, [ items ] )

  const switchOpener = useCallback( () => {
    setIsOpen( !isOpen )
  }, [ isOpen ] )

  const selectHandler = useCallback( item => {
    switchOpener()
    onSelect( item.value )
    setSelectedText( item.text )
  } )

  return (
   <div className="wrapper">
     { isOpen ? 
     <div className="list">{ processedItem.map( v => {
       return <div className="item" onClick={ ( e ) => { selectHandler( v, e ) } } 
            key={ v.key }>{ v.text }</div>} ) }</div> : 
     <div className="label" 
          onClick={ switchOpener }>
       { selectedText ? selectedText : '' }
     </div> }
   </div> 
  )
}

export default React.memo( CustomSelect )