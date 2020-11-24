import React from 'react'
import GuestPicker from './guestPicker.jsx'
import styled from 'styled-components'

const GuestDropdownStyle = styled.div`
  cursor: pointer;
  justify-content: flex-end;
`;
const GuestCountTitle = styled.section`
  padding-top: 10px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 8px;
`;
const GuestCountDisplay = styled.section`
  border-style: none;
  padding-left: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  background: transparent;
  border: none;
  font-weight: 300;
`;

const GuestDropdown = (props) => {
  return (
    <div>
      <GuestDropdownStyle
        onClick={props.displayGuestPickerOnClick}>
        <GuestCountTitle>GUESTS</GuestCountTitle>
        <GuestCountDisplay>{props.guestCount.adults + props.guestCount.children} {props.guestCount.adults === 1 ? 'guest' : 'guests'}</GuestCountDisplay>
      </GuestDropdownStyle>
      <GuestPicker
        guestCount={props.guestCount}
        maxGuestCount={props.maxGuestCount}
        minusGuest={props.minusGuest}
        isGuestDropdownDisplay={props.isGuestDropdownDisplay}
        displayGuestPickerOnClick={props.displayGuestPickerOnClick}
      />
    </div>
  )
}

export default GuestDropdown