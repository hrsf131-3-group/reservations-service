import React from 'react'
import GuestPicker from './guestPicker.jsx'

function GuestDropdown(props) {
  return (
    <div
      class="guestDropdown"
      onClick={props.displayGuestPickerOnClick}
    >
      <div>GUESTS</div>
      <div>{props.guestCount.adults} guests</div>
      <GuestPicker
        guestCount={props.guestCount}
        isGuestDropdownDisplay={props.isGuestDropdownDisplay}
      />
    </div>
  )
}

export default GuestDropdown