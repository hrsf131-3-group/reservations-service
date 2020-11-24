import React from 'react'
import dummyDataDates from '../../dummyDataDates.js'
import Header from './header.jsx'
import BookingTable from './bookingTable.jsx'
import Calendar from './calendar.jsx'
import moment from 'moment'
import PricingTable from './pricingTable.jsx'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  position: sticky;
  max-width: 400px;
  width: auto;
  z-index: 1;
  padding-right: 1px;
  font-size: 8px;
`;
const InnerContainer = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: lightgrey 0px 6px 16px;
`;
const CheckAvailability = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const CheckAvailabilityButton = styled.button`
  min-width: 200px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  color: white;
  padding: 10px 24px 10px 24px;
  background-position: calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%);
  --mouse-x: 32.8438;
  --mouse-y: 41.6667;
  background-image: var(--dls19-brand-gradient-radial, radial-gradient(circle at center, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% ));
  outline: none;
  cursor: pointer;
`;
const NoChargedNote = styled.div`
  cursor: default;
  font-size: 14px;
  padding-top: 10px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerNight: 100,
      availabilities: dummyDataDates,
      checkIn: undefined,
      checkOut: undefined,
      numberOfSelectedDays: 0,
      guests: {
        adults: 3,
        children: 2,
        infants: 2
      },
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
    this.handleDecrementGuestCount = this.handleDecrementGuestCount.bind(this)
  }

  componentDidMount() {
    axios.get('/api/homes/2/calendar')
      .then((res) => {
        this.setState({availabilities: res.data})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleCheckInChange(event) {
    event.preventDefault();
    console.log(event)
    if (event.charCode === 10) {
      this.setState({checkIn: event.target.value})

    }
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
        guests: isNaN(updateGuests) ? this.state.guests : updateGuests
      });
    } else {
      this.setState({showGuestPicker: !this.state.showGuestPicker})
    }
  }
  handleDecrementGuestCount(event) {
    if (event.target.name === 'adults') {
      if (this.state.guests.adults + this.state.guests.children > 1 && this.state.guests.adults > 1) {
        let updateGuests = Object.assign({}, this.state.guests);
        updateGuests[event.target.name]--;
        this.setState({guests: updateGuests})
      }
    } else if (event.target.name === 'children') {
      if (this.state.guests.adults + this.state.guests.children > 1 && this.state.guests.children > 0) {
        let updateGuests = Object.assign({}, this.state.guests);
        updateGuests[event.target.name]--;
        this.setState({guests: updateGuests})
      }
    } else {
      if (this.state.guests.infants === 0) {
        return;
      }
      let updateGuests = Object.assign({}, this.state.guests);
        updateGuests[event.target.name]--;
        this.setState({guests: updateGuests})
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
    if (isAvailable) {
      if (this.state.checkIn === undefined) {
        this.setState({checkIn: date})
      } else if (moment(date).isBefore(this.state.checkIn)) {
        this.setState({checkIn: date, checkOut: "", showPricing: false})
      } else if (this.checkForDateConflicts(date)) {
        this.setState({checkIn: date, checkOut: "", showPricing: false})
      } else if (moment(date).isAfter(this.state.checkIn)){
        this.setState({checkOut: date, showPricing: true, numberOfSelectedDays: this.daysSelected(date)})
      }
    }
  }
  checkForDateConflicts(date) {
    var checkIn = moment(this.state.checkIn);
    var checkInFormated = checkIn.format('YYYY-MM-DD');
    var selectDate = moment(date);
    var daysBetweenSelected = selectDate.diff(checkIn, 'days');
    var daysBetweenToday = checkIn.diff(moment(), 'days');
    for (var i = 0; i < this.state.availabilities.length; i++) {
      if (this.state.availabilities[i].date === checkInFormated) {
        for (var j = 0; j < daysBetweenSelected; i++, j++) {
          if (this.state.availabilities[i].available === false) {
            return true;
          }
        }
        break;
      }
    }
  }
  daysSelected(date) {
    var checkIn = moment(this.state.checkIn);
    var selectDate = moment(date);
    var daysBetweenSelected = selectDate.diff(checkIn, 'days');
    return daysBetweenSelected
  }

  render() {
    return (
      <Container>
        <InnerContainer>
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
            minusGuest={this.handleDecrementGuestCount}
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
          <CheckAvailability>
            <CheckAvailabilityButton>{this.state.checkOut ? "Reserve" : "Check Availability"}</CheckAvailabilityButton>
            <NoChargedNote>{this.state.checkOut ? "You won't be charged yet" : ""}</NoChargedNote>
          </CheckAvailability>
          <PricingTable
            checkInValue={this.state.checkIn}
            checkOutValue={this.state.checkOut}
            isPricingTableDisplay={this.state.showPricing}
            data={this.state.availabilities}
            daysSelected={this.state.numberOfSelectedDays}
            />
        </InnerContainer>
      </Container>
    )
  }
}

export default App