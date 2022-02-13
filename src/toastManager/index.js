import _ from "lodash"
import { useState } from "react"
import './toastManager.scss'
let key = 0
let items
let setToastItem

export default {
  open: function( { message, userName, delay = 1000 } ) {
    const toast = {
      key: key,
      message,
      userName
    }
    setToastItem( [ ...items, toast ] )
    this.close( key, delay )

    key++
  },

  close: function( key, delay ) {
    setTimeout( () => {
      const del = _.filter( items, item => {
        return item.key !== key
      } )
      setToastItem( del )
    }, delay )
  },

  Render: function() {
    const [ list, setList ] = useState( [] )
    items = list
    setToastItem = setList

    return (
      <>
        { items.map( v => {
          return <div className="toast" key={ v.key }>
            <div className='toast-person-image'>
              <span className='toast-person material-icons'>person</span>
            </div>

            <div className="user-name">{ v.userName }</div>
            <div className="user-message">{ v.message }</div>

          </div>
        } ) }
      </>
    )
  }
}