import React from 'react'
import moment from 'moment'

class CalendarTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObject: moment(),
      dateObjectNext: moment().add(1, "month"),
      // isUnavailable: false
    }
  }
  // to get all the days in the month
  daysInMonth(month) {
    return month.daysInMonth();
  }
  // get month
  month(month) {
    return month.format("MMMM");
  }
  // get year
  year(year) {
    return year.format("Y");
  }
  // get the first day of the month
  firstDayOfMonth(month) {
    let dateObject = month;
    let firstDay = moment(dateObject).startOf('month').format('d');
    return firstDay;
  }
  // on click event to go back 1 month
  onPrev() {
    this.setState({
      dateObject: this.state.dateObject.subtract(1, "month"),
      dateObjectNext: this.state.dateObjectNext.subtract(1, "month")
    })
  }
  // on click event to go up 1 month
  onNext() {
    this.setState({
      dateObject: this.state.dateObject.add(1, "month"),
      dateObjectNext: this.state.dateObjectNext.add(1, "month")
    })
  }
  isDateAvailable(date) {
    for (let i = 0; i < this.props.datesData.length; i++) {
      // if (this.state.isUnavailable) {
      //   return "calendar-day dateUnavailable"
      // }
      if (this.props.datesData[i].date === date) {
        if (this.props.datesData[i].available === false) {
          // if (moment(date).isAfter(this.props.currentCheckInInput)) {
          //   console.log('this hit', date, this.state.isUnavailable)
          //   this.setState({isUnavailable: true})
          // }
          return "calendar-day dateUnavailable"
        }
        // let minStay = moment(this.props.currentCheckInInput).add(this.props.datesData[0].listing.minimum_stay, 'day');
        // if (moment(date).isBetween(this.props.currentCheckInInput, minStay)) {
        //   return
        // }
      }
    }
    return "calendar-day dateAvailable"
  }
  // series of processes to fill up days of the given month
  populateCalendar(month) {
    // fills in any blanks before first day
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(month); i++) {
    blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    // adds table columns with or without entries
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(month); d++) {
      if (d < 10) {
        var dateDashFormat = month.format(`YYYY-MM-0${d}`)
      } else {
        var dateDashFormat = month.format(`YYYY-MM-${d}`)
      }
      let date = month.format(`MM/${d}/YYYY`);
      let isAvailable = moment().isBefore(date) ? this.isDateAvailable(dateDashFormat) : "calendar-day dateUnavailable";
      let isCheckInDate = (moment(this.props.currentCheckInInput).isSame(date)) ? "selectedCheckInDate" : "";
      let isCheckOutDate = (moment(this.props.currentCheckOutInput).isSame(date)) ? "selectedCheckOutDate" : "";
      let isBetweenDates = moment(date).isBetween(this.props.currentCheckInInput, this.props.currentCheckOutInput) ? "inDateRange" : "";
      daysInMonth.push(<td
          key={d}
          className={`${isAvailable} ${isCheckInDate} ${isCheckOutDate} ${isBetweenDates}`}
        ><span onClick={(event)=>{this.onDateClick(event, date, isAvailable)}}>{d}</span></td>);
    }
    // play to populate each day
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    // iteration to build calendar
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    // adds day to calendar
    let daysOfMonth = rows.map((day, index) => {
      return <tr>{day}</tr>;
    })
    return daysOfMonth;
  }
  // get date
  onDateClick(event, date, isAvailable) {
    this.props.updateBookingDates(event, date, isAvailable);
  }

  render() {
    let weekdayShortName = moment.weekdaysShort().map(day => {
      return (
        <th key={day} className="week-day">{day.slice(0, -1)}</th>
      );
    });

    return (
      <div className="calendars">
        <div class="leftCalendar">
          <div class="leftCalendarHeader">
            <button class={this.state.dateObject.isBefore('2020-11-30') ? 'disableMonthButton' : "changeMonthButton"} onClick={this.state.dateObject.isBefore('2020-11-30') ? '' : event=>{this.onPrev()}}>{`<`}</button>
            {this.month(this.state.dateObject)} {this.year(this.state.dateObject)}
          </div>
          <table className="calendar-table">
            <thead>
              <tr>
                {weekdayShortName}
              </tr>
            </thead>
            <tbody>
              {this.populateCalendar(this.state.dateObject)}
            </tbody>
          </table>
        </div>
        <div class="rightCalendar">
          <div class="rightCalendarHeader">
            {this.month(this.state.dateObjectNext)} {this.year(this.state.dateObjectNext)}
            <button class="changeMonthButton" onClick={event=>{this.onNext()}}>{`>`}</button>
          </div>
          <table className="calendar-table">
            <thead>
              <tr>
                {weekdayShortName}
              </tr>
            </thead>
            <tbody>
              {this.populateCalendar(this.state.dateObjectNext)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default CalendarTable