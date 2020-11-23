import React from 'react'
import styled from 'styled-components'

const CheckInDateStyle = styled.section`
  border-right: 1px solid darkgrey;
`;
const CheckInTitle = styled.section`
  padding-top: 10px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 8px;
`;

const CheckInDate = (props) => {
  return (
    <CheckInDateStyle>
      <CheckInTitle>CHECK-IN</CheckInTitle>
      <input
        placeholder="Add date"
        type="text"
        size="15"
        value={props.checkInValue}
        onChange={props.checkInChange}
        onClick={props.displayCalendar}
      />
    </CheckInDateStyle>
  )
}

export default CheckInDate