import React from 'react'

function CheckOutDate(props) {
  return (
    <div class='checkOutDate'>
      <section>checkout</section>
      <input
        placeholder="Add date"
        type="text"
        value={props.checkOutValue}
        onChange={props.checkOutChange}
        onClick={props.displayCalendar}
      />
    </div>
  )
}

export default CheckOutDate