import React from 'react'
import dummyDataDates from '../../dummyDataDates.js'
import Header from './header.jsx'
import BookingTable from './bookingTable.jsx'
import Calendar from './calendar.jsx'
import moment from 'moment'
import PricingTable from './pricingTable.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerNight: 100,
      availabilities: dummyDataDates,
      checkIn: undefined,
      checkOut: undefined,
      numberOfSelectedDays: undefined,
      guests: {
        adults: 2,
        children: 0,
        infants: 0
      },
      maxGuestCount: dummyDataDates[0].listing.max_guest_count,
      showCalendar: false,
      showGuestPicker: false,
      showPricing: false
    }
    this.handleCheckInChange = this.handleCheckInChange.bind(this)
    this.handleCheckOutChange = this.handleCheckOutChange.bind(this)
    this.handleDisplayCalendarOnClick = this.handleDisplayCalendarOnClick.bind(this)
    this.handleDisplayGuestPickerOnClick = this.handleDisplayGuestPickerOnClick.bind(this)
    this.handleHidePopUpsOnClick = this.handleHidePopUpsOnClick.bind(this)
    this.handleClearInputtedDates = this.handleClearInputtedDates.bind(this)
    this.handleUpdateBookingDates = this.handleUpdateBookingDates.bind(this)
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
      checkOut: undefined,
      showPricing: false
    })
  }
  handleUpdateBookingDates(event, date, isAvailable) {
    if (isAvailable === "calendar-day dateAvailable") {
      if (this.state.checkIn === undefined) {
        this.setState({checkIn: date})
      } else if (moment(date).isBefore(this.state.checkIn)) {
        this.setState({checkIn: date, checkOut: undefined})
      } else if (this.checkForDateConflicts(date)) {
        this.setState({checkIn: date, checkOut: undefined})
      } else if (moment(date).isAfter(this.state.checkIn)){
        this.setState({checkOut: date, showPricing: true
          ,numberOfSelectedDays: this.daysSelected(date)
        })
      }
    }
  }
  checkForDateConflicts(date) {
    var checkIn = moment(this.state.checkIn);
    var selectDate = moment(date);
    var daysBetweenSelected = selectDate.diff(checkIn, 'days');
    var daysBetweenToday = checkIn.diff(moment(), 'days');
    console.log('conflict check', daysBetweenSelected, daysBetweenToday)
    for (var i = 0, j = daysBetweenToday + 1; i <= daysBetweenSelected - 2; i++) {
      if (this.state.availabilities[j].available === false) {
        return true
      }
      j++;
      console.log(this.state.availabilities[j].available)
    }
  }
  daysSelected(date) {
    var checkIn = moment(this.state.checkIn);
    var selectDate = moment(date);
    var daysBetweenSelected = selectDate.diff(checkIn, 'days');
    console.log('hits days selected', daysBetweenSelected, checkIn, selectDate, this.state.checkIn, this.state.checkOut)
    return daysBetweenSelected
  }

  render() {
    return (
      <div className="container">
        <div id="reservations">
          <Header pricePerNight={this.state.availabilities[0].base_price_per_night}/>
          <BookingTable
            checkInValue={this.state.checkIn}
            checkOutValue={this.state.checkOut}
            checkInChange={this.handleCheckInChange}
            checkOutChange={this.handleCheckOutChange}
            displayCalendar={this.handleDisplayCalendarOnClick}
            guestCount={this.state.guests}
            maxGuestCount={this.state.maxGuestCount}
            isGuestDropdownDisplay={this.state.showGuestPicker}
            displayGuestPickerOnClick={this.handleDisplayGuestPickerOnClick}
          />
          <Calendar
            checkInValue={this.state.checkIn}
            checkOutValue={this.state.checkOut}
            checkInChange={this.handleCheckInChange}
            checkOutChange={this.handleCheckOutChange}
            isCalendarDisplay={this.state.showCalendar}
            hidePopUps={this.handleHidePopUpsOnClick}
            clearDates={this.handleClearInputtedDates}
            updateBookingDates={this.handleUpdateBookingDates}
            datesData={this.state.availabilities}
            currentCheckInInput={this.state.checkIn}
            currentCheckOutInput={this.state.checkOut}
          />
          <div className="checkAvailability">
            <button className="checkAvailabilityButton">{this.state.checkOut ? "Reserve" : "Check Availability"}</button>
          </div>
          <PricingTable
            checkInValue={this.state.checkIn}
            checkOutValue={this.state.checkOut}
            isPricingTableDisplay={this.state.showPricing}
            data={this.state.availabilities}
            daysSelected={this.state.numberOfSelectedDays}
            />
        </div>
      </div>
    )
  }
}

export default App