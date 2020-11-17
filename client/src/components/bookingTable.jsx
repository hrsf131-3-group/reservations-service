import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'

function BookingTable(props) {
  return (
    <div id="bookingTable">
      <CheckInDate
        checkInValue={props.checkInValue}
        checkInChange={props.checkInChange}
        displayCalendar={props.displayCalendar}
      />
      <CheckOutDate
        checkOutValue={props.checkOutValue}
        checkOutChange={props.checkOutChange}
        displayCalendar={props.displayCalendar}
      />
      <div class="guestCount">
        <div>guests dropdown</div>
        <div>should be hidden until dropdown is clicked</div>
      </div>
    </div>
  )
}

export default BookingTable