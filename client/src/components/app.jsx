import React from 'react'
import dummyDataDates from '../../dummyDataDates.js'
import Header from './header.jsx'
import BookingTable from './bookingTable.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerNight: 100,
      availabilities: dummyDataDates,
      checkIn: undefined,
      checkOut: undefined,
      guests: {
        adults: 2,
        children: 0,
        infants: 0
      },
      maxGuestCount: dummyDataDates[0].listing.max_guest_count,
      bookingInfoEntered: false
    }
    this.handleCheckInChange = this.handleCheckInChange.bind(this)
    this.handleCheckOutChange = this.handleCheckOutChange.bind(this)
  }

  handleCheckInChange(event) {
    event.preventDefault();
    this.setState({checkIn: event.target.value})
  }
  handleCheckOutChange(event) {
    event.preventDefault();
    this.setState({checkOut: event.target.value})
  }

  defaultPricePerNight() {
    let min = Infinity;
    for (let i = 0; i < dummyDataDates.length; i++) {
      if (dummyDataDates[i].base_price_per_night < min) {
        this.setState({minPricePerNight: dummyDataDates[i].base_price_per_night})
      }
    }
  }

  render() {
    return (
      <div>
        <Header pricePerNight={this.state.pricePerNight}/>
        <BookingTable
          checkInValue={this.state.checkIn}
          checkInChange={this.handleCheckInChange}
          checkOutvale={this.state.checkOut}
          checkOutChange={this.handleCheckOutChange}
        />
        <button>check availability / reserve</button>
      </div>
    )
  }
}

export default App