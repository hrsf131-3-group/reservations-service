import React from 'react'
import styled from 'styled-components'

const CheckInDateStyle = styled.section`
  border-right: 1px solid darkgrey;
  width: 50%;
`;
const CheckInTitle = styled.section`
  padding-top: 10px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 10px;
  cursor: default;
`;
const Input = styled.input`
  outline: none;
  border-radius: 12px;
  cursor: pointer;
  border-style: none;
  padding-left: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  padding-top: 4px;
  color: rgb(34, 34, 34);
  background: none;
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