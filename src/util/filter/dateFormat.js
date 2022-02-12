import { useMemo } from "react"
import moment from 'moment'
const DateFormat = ( value ) => {
  const processedItem = useMemo( () => {
    return moment( value ).format( 'MM-DD hh:mm:ss' )
  }, [ value ] )

  return processedItem
}
export default DateFormat