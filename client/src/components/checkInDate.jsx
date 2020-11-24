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
  cursor: default;
`;
const Input = styled.input`
  outline: none;
  border-radius: 12px;
  cursor: pointer;
  border-style: none;
  padding-left: 10px;
  padding-bottom: 10px;
  font-weight: 300;
`;

const CheckInDate = (props) => {
  return (
    <CheckInDateStyle>
      <CheckInTitle>CHECK-IN</CheckInTitle>
      <Input
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