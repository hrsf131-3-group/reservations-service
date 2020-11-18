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
      showCalendar: false,
      showGuestPicker: false
    }
    this.handleCheckInChange = this.handleCheckInChange.bind(this)
    this.handleCheckOutChange = this.handleCheckOutChange.bind(this)
    this.handleDisplayCalendarOnClick = this.handleDisplayCalendarOnClick.bind(this)
    this.handleDisplayGuestPickerOnClick = this.handleDisplayGuestPickerOnClick.bind(this)
    this.handleHidePopUpsOnClick = this.handleHidePopUpsOnClick.bind(this)
    this.handleClearInputtedDates = this.handleClearInputtedDates.bind(this)
  }

  handleCheckInChange(event) {
    event.preventDefault();
    this.setState({checkIn: event.target.value})
  }
  handleCheckOutChange(event) {
    event.preventDefault();
    this.setState({checkOut: event.target.value})
  }
  handleDisplayCalendarOnClick(event) {
    this.setState({showCalendar: true})
  }
  handleDisplayGuestPickerOnClick(event) {
    if (event.target.name !== undefined) {
      let updateGuests = Object.assign({}, this.state.guests);
      updateGuests.adults = Number(event.target.name[event.target.name.length - 1]);
      this.setState({
        showGuestPicker: !this.state.showGuestPicker,
        guests: updateGuests
      });
    } else {
      this.setState({showGuestPicker: !this.state.showGuestPicker})
    }
  }
  handleHidePopUpsOnClick(event) {
    event.preventDefault();
    this.setState({showCalendar: false})
  }
  handleClearInputtedDates(event) {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = '')
    );
    this.setState({
      checkIn: undefined,
      checkOut: undefined
    })
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
          displayCalendar={this.handleDisplayCalendarOnClick}
          guestCount={this.state.guests}
          maxGuestCount={this.state.maxGuestCount}
          isGuestDropdownDisplay={this.state.showGuestPicker}
          displayGuestPickerOnClick={this.handleDisplayGuestPickerOnClick}
        />
        <Calendar
          checkInValue={this.state.checkIn}
          checkInChange={this.handleCheckInChange}
          checkOutValue={this.state.checkOut}
          checkOutChange={this.handleCheckOutChange}
          isCalendarDisplay={this.state.showCalendar}
          hidePopUps={this.handleHidePopUpsOnClick}
          clearDates={this.handleClearInputtedDates}
        />
        <button>check availability / reserve</button>
      </div>
    )
  }
}

export default App