import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'
import GuestDropdown from './guestDropdown.jsx'
import styled from 'styled-components'

const BookingTableContainer = styled.div`
  border-radius: 8px;
  border: 1px solid darkgrey;
  margin-bottom: 16px;
`;
const BookingTableInnerContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  border-bottom: 1px solid darkgrey;
`;

const BookingTable = (props) => {
  return (
    <BookingTableContainer>
      <BookingTableInnerContainer>
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
      </BookingTableInnerContainer>
      <GuestDropdown
        guestCount={props.guestCount}
        isGuestDropdownDisplay={props.isGuestDropdownDisplay}
        displayGuestPickerOnClick={props.displayGuestPickerOnClick}
      />
    </BookingTableContainer>
  )
}

export default BookingTable