import React from 'react'
import GuestPicker from './guestPicker.jsx'

function GuestDropdown(props) {
  return (
    <div
      class="guestDropdown"
      onClick={props.displayGuestPickerOnClick}
    >
      <div>GUESTS</div>
      <div>{props.guestCount.adults} {props.guestCount.adults === 1 ? 'guest' : 'guests'}</div>
      <GuestPicker
        maxGuestCount={props.maxGuestCount}
        isGuestDropdownDisplay={props.isGuestDropdownDisplay}
      />
    </div>
  )
}

export default GuestDropdown