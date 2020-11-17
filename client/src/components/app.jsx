import React from 'react'
import dummyDataDates from '../../dummyDataDates.js'
import Header from './header.jsx'
import BookingTable from './bookingTable.jsx'
import Calendar from './calendar.jsx'

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
      bookingInfoEntered: false,
      showCalendar: false
    }
    this.handleCheckInChange = this.handleCheckInChange.bind(this)
    this.handleCheckOutChange = this.handleCheckOutChange.bind(this)
    this.handleCalendarOnClick = this.handleCalendarOnClick.bind(this)
  }

  handleCheckInChange(event) {
    event.preventDefault();
    this.setState({checkIn: event.target.value})
  }
  handleCheckOutChange(event) {
    event.preventDefault();
    this.setState({checkOut: event.target.value})
  }
  handleCalendarOnClick(event) {
    console.log('click')
    this.setState({showCalendar: true})
  }

  // defaultPricePerNight() {
  //   let min = Infinity;
  //   for (let i = 0; i < dummyDataDates.length; i++) {
  //     if (dummyDataDates[i].base_price_per_night < min) {
  //       this.setState({minPricePerNight: dummyDataDates[i].base_price_per_night})
  //     }
  //   }
  // }

  render() {
    return (
      <div id="reservations">
        <Header pricePerNight={this.state.pricePerNight}/>
        <BookingTable
          checkInValue={this.state.checkIn}
          checkInChange={this.handleCheckInChange}
          checkOutValue={this.state.checkOut}
          checkOutChange={this.handleCheckOutChange}
          displayCalendar={this.handleCalendarOnClick}
        />
        <Calendar
          checkInValue={this.state.checkIn}
          checkInChange={this.handleCheckInChange}
          checkOutValue={this.state.checkOut}
          checkOutChange={this.handleCheckOutChange}
          isCalendarDisplay={this.state.showCalendar}
        />
        <button>check availability / reserve</button>
      </div>
    )
  }
}

export default App