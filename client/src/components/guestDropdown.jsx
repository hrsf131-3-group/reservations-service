import React from 'react'
import GuestPicker from './guestPicker.jsx'

function GuestDropdown(props) {
  return (
    <div
      name="guestDropdown"
      className="guestDropdown"
      onClick={props.displayGuestPickerOnClick}>
      <section className="guestCountTitle">GUESTS</section>
      <section className="guestCountDisplay">{props.guestCount.adults} {props.guestCount.adults === 1 ? 'guest' : 'guests'}</section>
      <GuestPicker
        maxGuestCount={props.maxGuestCount}
        isGuestDropdownDisplay={props.isGuestDropdownDisplay}
      />
    </div>
  )
}

export default GuestDropdown