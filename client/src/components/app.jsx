import React from 'react'
import dummyDataDates from '../../dummyDataDates.js'
import Header from './header.jsx'
import BookingTable from './bookingTable.jsx'
import Calendar from './calendar.jsx'
import moment from 'moment'
import PricingTable from './pricingTable.jsx'
import axios from 'axios'
import styled from 'styled-components'

const OuterContainer = styled.div`
  display: grid;
  grid-template-columns: 67% 33%;
  width: 60%;
  margin: 10px auto;
`;
const Container = styled.div`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
  max-width: 372px;
  padding-right: 1px;
  font-size: 8px;
  text-overflow: ellipsis;
  margin-top: 8px;
  margin-right: 0;
  color: #484848;
  line-height: 1.43;
  grid-area: 1 / 2 / 5 / 2;
  @media (max-width: 1080px) {
    display: none;
  }
`;
const InnerContainer = styled.div`
  position: sticky;
  top: 80px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: lightgrey 0px 6px 16px;
  margin-bottom: ${props=>props.showPricing ? '100px' : '24px'};
`;
const CheckAvailability = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
// transition: width 0.2s ease, height 0.2s ease;
// background-image: radial-gradient(circle at center, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #ff385c 100% );
const CheckAvailabilityButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  color: white;
  padding: 13px 24px;
  position: relative;
  overflow: hidden;
  background-image: var(--dls19-brand-gradient-radial, linear-gradient(to right, #E61E4D 0%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100% ));
  &::before {
    background-position: ${props=>props.coordinateX}px ${props=>props.coordinateY}px;
    background-image: linear-gradient(to right, #FF385C 0%, #D70466 25%, #E31C5F 50%, #D70466 75%, #FF385C 100%);
    --size: 0;
    content: '';
    position: absolute;
    width: var(--size);
    height: var(--size);
    transform: translate(-50%, -50%);
  }
  outline: none;
  cursor: pointer;
  border: none;
  &: hover:before {
    --size: 400px;
  };
`;
const CheckAvailabilityButtonSpan = styled.span`;
  position: relative;
`;
const NoChargedNote = styled.div`
  cursor: default;
  font-size: 14px;
  padding-top: 10px;
`;
const Img = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;
const ImgTop = styled(Img)`
`;
const ImgBotDiv = styled.div`
  grid-area: 2 / 1 / 2 / 1;
`;
const ImgBot = styled(Img)`
`;
const ImgCalendarDiv = styled.div`
  grid-area: 3 / 1 / 3 / 1;
`;
const ImgCalendar = styled(Img)`
`;
const RareFindContainer = styled.div`
  display: ${props=>props.showPricing ? 'flex' : 'none'};
  justify-content: center;
  padding-top: 60px;
  position: sticky;
  z-index: -1;
  top: 525px;
  margin-top: -140px;
`;
const RareFind = styled.img`
  width: 95%;
  max-width: 372px;
  position: sticky;
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
        adults: 2,
        children: 0,
        infants: 0
      },
      showCalendar: false,
      showGuestPicker: false,
      showPricing: false,
      x: 0,
      y: 0
    }
    this.handleCheckInChange = this.handleCheckInChange.bind(this)
    this.handleCheckOutChange = this.handleCheckOutChange.bind(this)
    this.handleDisplayCalendarOnClick = this.handleDisplayCalendarOnClick.bind(this)
    this.handleDisplayGuestPickerOnClick = this.handleDisplayGuestPickerOnClick.bind(this)
    this.handleHidePopUpsOnClick = this.handleHidePopUpsOnClick.bind(this)
    this.handleClearInputtedDates = this.handleClearInputtedDates.bind(this)
    this.handleUpdateBookingDates = this.handleUpdateBookingDates.bind(this)
    this.handleDecrementGuestCount = this.handleDecrementGuestCount.bind(this)
    this.handleIncrementGuestCount = this.handleIncrementGuestCount.bind(this)
    this.handleMouseMoveOverCheckAvailability = this.handleMouseMoveOverCheckAvailability.bind(this)
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
    let lengthCheck = event.target.value.length;
    if (lengthCheck === 10) {
      this.setState({checkIn: event.target.value})
    }
  }
  handleCheckOutChange(event) {
    event.preventDefault();
    let lengthCheck = event.target.value.length;
    if (lengthCheck === 10) {
      this.setState({checkOut: event.target.value})
    }
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
  handleIncrementGuestCount(event) {
    if (event.target.name === 'adults' || event.target.name === 'children') {
      if (this.state.guests.adults + this.state.guests.children < this.state.availabilities[0].listing.max_guest_count) {
        let updateGuests = Object.assign({}, this.state.guests);
        updateGuests[event.target.name]++;
        this.setState({guests: updateGuests})
      }
    } else {
      if (this.state.guests.infants > 4) {
        return;
      }
      let updateGuests = Object.assign({}, this.state.guests);
        updateGuests[event.target.name]++;
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
  handleUpdateBookingDates(event, date, isAvailable, yesterdayAvailable) {
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
    if (!isAvailable && this.state.checkIn !== undefined && moment(date).isAfter(this.state.checkIn)) {
      if (!this.checkForDateConflicts(date)) {
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
  handleMouseMoveOverCheckAvailability(event) {
    const x = event.pageX - event.target.offsetLeft;
    const y = event.pageY - event.target.offsetTop;
    event.target.style.setProperty('--x', `${ x }px`)
    event.target.style.setProperty('--y', `${ y }px`)
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      <OuterContainer>
        <div><ImgTop src="https://rest-n-react.s3-us-west-1.amazonaws.com/airbnb_topshot.jpg"></ImgTop></div>
        <Container>
          <InnerContainer showPricing={this.state.showPricing}>
            <Header pricePerNight={this.state.availabilities[0].base_price_per_night}/>
            <BookingTable
              checkInValue={this.state.checkIn}
              checkOutValue={this.state.checkOut}
              checkInChange={this.handleCheckInChange}
              checkOutChange={this.handleCheckOutChange}
              displayCalendar={this.handleDisplayCalendarOnClick}
              guestCount={this.state.guests}
              maxGuestCount={this.state.availabilities[0].listing.max_guest_count}
              isGuestDropdownDisplay={this.state.showGuestPicker}
              displayGuestPickerOnClick={this.handleDisplayGuestPickerOnClick}
              minusGuest={this.handleDecrementGuestCount}
              plusGuest={this.handleIncrementGuestCount}
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
              daysSelected={this.state.numberOfSelectedDays}
            />
            <CheckAvailability>
              <CheckAvailabilityButton
                onMouseMove={this.handleMouseMoveOverCheckAvailability}
                coordinateX={this.state.x}
                coordinateY={this.state.y}
              ><CheckAvailabilityButtonSpan>{this.state.checkOut ? "Reserve" : "Check availability"}</CheckAvailabilityButtonSpan></CheckAvailabilityButton>
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
          <RareFindContainer showPricing={this.state.showPricing}>
            <RareFind src="https://rest-n-react.s3-us-west-1.amazonaws.com/rarefind.jpg"></RareFind>
          </RareFindContainer>
        </Container>
        <ImgBotDiv><ImgBot src="https://rest-n-react.s3-us-west-1.amazonaws.com/airbnb_bottomshot.jpg"></ImgBot></ImgBotDiv>
        <ImgCalendarDiv><ImgCalendar src="https://rest-n-react.s3-us-west-1.amazonaws.com/airbnb_static_calendar.jpg"></ImgCalendar></ImgCalendarDiv>
      </OuterContainer>
    )
  }
}

export default App