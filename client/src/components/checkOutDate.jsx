import React from 'react'
import styled from 'styled-components'

const CheckOutTitle = styled.section`
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

const CheckOutDate = (props) => {
  return (
    <section>
      <CheckOutTitle>CHECKOUT</CheckOutTitle>
      <Input
        placeholder="Add date"
        type="text"
        size="15"
        value={props.checkOutValue}
        onChange={props.checkOutChange}
        onClick={props.displayCalendar}
      />
    </section>
  )
}

export default CheckOutDate