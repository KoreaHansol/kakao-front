import React, { useEffect, useRef, useMemo, useState } from 'react'
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
  }, [] )

  const outSideClickEvent = ( event ) => {
    if( btnEl.current !== event.target && !selectEl.current.contains( event.target ) ) {
      setIsOpen( false )
    }
  }

  const inputChangeHandler = event => {
    onChange( event.target.value )
  }

  const selectHandler = v => {
    onSelect( v.value )
    setIsOpen( false )
  }

  const deleteHandler = ( v, e ) => {
    e.stopPropagation()
    onDelete( v.value )
  }
  
  const switchIsOpen = () => {
    setIsOpen( !isOpen )
  }

  const processedItem = useMemo( () => {
    return _.map( items, item => {
      return {
        value: _.get( item, valueProp, item ),
        text: _.get( item, textProp, item ),
        key: _.get( item, keyProp, item )
      }
    } )
  }, [ items, valueProp, textProp, keyProp ] )

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
