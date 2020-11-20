import React from 'react'
import GuestPicker from './guestPicker.jsx'

function GuestDropdown(props) {
  return (
    <div>
      <div
        className="guestDropdown"
        onClick={props.displayGuestPickerOnClick}>
        <section className="guestCountTitle">GUESTS</section>
        <section className="guestCountDisplay">{props.guestCount.adults} {props.guestCount.adults === 1 ? 'guest' : 'guests'}</section>
      </div>
      <div>
        <GuestPicker
          maxGuestCount={props.maxGuestCount}
          isGuestDropdownDisplay={props.isGuestDropdownDisplay}
          displayGuestPickerOnClick={props.displayGuestPickerOnClick}
        />
      </div>
    </div>
  )
}

export default GuestDropdown