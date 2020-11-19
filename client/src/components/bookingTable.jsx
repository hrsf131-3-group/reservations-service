import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'
import GuestDropdown from './guestDropdown.jsx'

function BookingTable(props) {
  return (
    <div id="bookingTable">
      <div className="bookingContainer">
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
      </div>
      <GuestDropdown
        guestCount={props.guestCount}
        maxGuestCount={props.maxGuestCount}
        isGuestDropdownDisplay={props.isGuestDropdownDisplay}
        displayGuestPickerOnClick={props.displayGuestPickerOnClick}
      />
    </div>
  )
}

export default BookingTable