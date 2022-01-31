import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import _ from 'lodash'
import './CustomInputSelector.scss'

const CustomInputSelector = ( { value, onChange, items , placeHolder, valueProp ,textProp ,keyProp ,onSelect, onDelete } ) => {
  const [ isOpen, setIsOpen ] = useState( false )
  const selectEl = useRef( null )
  const btnEl = useRef( null )


  useEffect( () => {
    document.addEventListener( 'mousedown', outSideClickEvent )
    // update되기전 cleanUp
    return () => document.removeEventListener( 'mousedown', outSideClickEvent )
  }, [ isOpen ] )

  const outSideClickEvent = ( event ) => {
    if( !isOpen ) {
      return
    }
    if( btnEl.current !== event.target && !selectEl.current.contains( event.target ) ) {
      setIsOpen( false )
    }
  }

  const inputChangeHandler = useCallback( ( event ) => {
    onChange( event.target.value )
  }, [ onChange ] )

  const selectHandler = useCallback( ( v ) => {
    onSelect( v.value )
    setIsOpen( false )
  }, [ isOpen, onSelect ] )

  const deleteHandler = useCallback( ( v, e ) => {
    e.stopPropagation()
    onDelete( v.value )
  }, [ items ] )
  
  const switchIsOpen = useCallback( () => {
    setIsOpen( !isOpen )
  }, [ isOpen ] )

  const processedItem = useMemo( () => {
    return _.map( items, item => {
      return {
        value: _.get( item, valueProp, item ),
        text: _.get( item, textProp, item ),
        key: _.get( item, keyProp, item )
      }
    } )
  }, [ items ] )

  return (
    <div className="select-input">
      <input className="pure-input"
              value={ value } placeholder={ placeHolder } onChange={ inputChangeHandler }
      />
      <div onClick={ switchIsOpen } className="select-btn">
        <span className="material-icons" ref={ btnEl }>{ isOpen ? 'arrow_drop_up' : 'arrow_drop_down' }</span>
      </div>

      { isOpen && <div className='list-box' ref={ selectEl }>
        { processedItem.map( v => {
         return <div className="item" 
                      onClick={ ( e ) => { selectHandler( v, e ) } } 
                      key={ v.key }>{ v.text }
                  <div className='close material-icons' onClick={ ( e ) => { deleteHandler( v, e ) } }>close</div>
                </div>} ) }
      </div> }
    </div>
  )
}

export default React.memo( CustomInputSelector )
