import React from 'react'

function BookingTable(props) {
  return (
    <div id="bookingTable">
      <div class="checkInDate">
        <section>checkin</section>
        <input placeholder="Add date"></input>
      </div>
      <div class='checkOutDate'>
        <section>checkout</section>
        <input placeholder="Add date"></input>
      </div>
      <div class="guestCount">
        <div>guests dropdown</div>
        <div>should be hidden until dropdown is clicked</div>
      </div>
    </div>
  )
}

export default BookingTable