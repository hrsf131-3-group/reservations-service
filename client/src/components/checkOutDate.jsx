import React from 'react'

function CheckOutDate(props) {
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