import React from 'react'
import GuestPicker from './guestPicker.jsx'

function GuestDropdown(props) {
  return (
    <div
      name="guestDropdown"
      class="guestDropdown"
      onClick={props.displayGuestPickerOnClick}>
      <section class="guestCountTitle">GUESTS</section>
      <section class="guestCountDisplay">{props.guestCount.adults} {props.guestCount.adults === 1 ? 'guest' : 'guests'}</section>
      <GuestPicker
        maxGuestCount={props.maxGuestCount}
        isGuestDropdownDisplay={props.isGuestDropdownDisplay}
      />
    </div>
  )
}

export default GuestDropdown