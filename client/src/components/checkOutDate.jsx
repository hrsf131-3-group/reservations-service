import React from 'react'
import styled from 'styled-components'

const CheckOutTitle = styled.section`
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