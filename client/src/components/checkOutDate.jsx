import React from 'react'
import styled from 'styled-components'

const CheckOutTitle = styled.section`
  padding-top: 10px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 8px;
`;
const Input = styled.input`
  outline: none;
  border-radius: 12px;
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