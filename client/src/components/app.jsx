import React from 'react'
import dummyDataDates from '../../dummyDataDates.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availabilities: dummyDataDates,
      checkIn: undefined,
      checkOut: undefined,
      guests: {
        adults: 2,
        children: 0,
        infants: 0
      },
      maxGuestCount: 16,
      canReserve: false
    }
  }

  render() {
    return (
      <div>
        <h1>Header with total price per night</h1>
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
        <button>check availability / reserve</button>
      </div>
    )
  }
}

export default App