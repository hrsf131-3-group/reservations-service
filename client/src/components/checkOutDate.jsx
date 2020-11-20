import React from 'react'
import styled from 'styled-components'

// const CheckOutTitle = styled.section`
//   padding-top: 10px;
//   padding-left: 10px;
//   font-weight: bold;
//   font-size: 8px;
// `;

const CheckOutDate = (props) => {
  return (
    <section className='checkOutDate'>
      <section className="checkOutTitle">CHECKOUT</section>
      <input
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