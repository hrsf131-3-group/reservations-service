import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'

function Calendar(props) {
  return (
    <div>
      <div>
        <div class="headerCalendar">
          header
        </div>
        <div class="dateRangeDisplayCalendar">
          range of date
        </div>
      </div>
      <CheckInDate
        checkInValue={props.checkInValue}
        checkInChange={props.checkInChange}
      />
      <CheckOutDate
        checkOutValue={props.checkOutValue}
        checkOutChange={props.checkOutChange}
      />
    </div>
  )
}

export default Calendar