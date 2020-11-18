import React from 'react'
import moment from 'moment'

class CalendarTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObject: moment(),
      dateObjectNext: moment().add(1, "month"),
      allmonths: moment.months()
    }
    this.weekdayShort = moment.weekdaysShort();
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
  // get all the months
  // monthList(props) {
  //   let months = [];
  //   props.data.map(data => {
  //     months.push(<td><span>{data}</span></td>)
  //   });
  //   let rows = [];
  //   let cells = [];
  //   months.forEach((row, index) => {
  //     if (index % 3 !== 0 || index === 0) {
  //       cells.push(row);
  //     } else {
  //       rows.push(cells);
  //       cells = [];
  //       cells.push(row);
  //     }
  //   });
  //   rows.push(cells);
  //   let monthlist = rows.map((d, i) => {
  //     return <tr>{d}</tr>;
  //   })
  //   return (
  //     <table>
  //       <tbody>{monthlist}</tbody>
  //     </table>
  //   )
  // }
  onPrev() {
    this.setState({
      dateObject: this.state.dateObject.subtract(1, "month"),
      dateObjectNext: this.state.dateObjectNext.subtract(1, "month")
    })
  }
  onNext() {
    this.setState({
      dateObject: this.state.dateObject.add(1, "month"),
      dateObjectNext: this.state.dateObjectNext.add(1, "month")
    })
  }
  populateCalendar(month) {
    // fills in any blanks before first day
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(month); i++) {
    blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    // adds table columns with or without entries
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(month); d++) {
      daysInMonth.push(<td key={d} className="calendar-day">{d}</td>);
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
  render() {
    // get the days of the week w/ shorthand spelling
    let weekdayShortName = this.weekdayShort.map(day => {
      return (
        <th key={day} className="week-day">{day}</th>
      );
    });

    return (
      <div className="calendars">
        {this.month(this.state.dateObject)} {this.year(this.state.dateObject)}
        <table className="calendar-day">
          <thead>
            <tr>
              {weekdayShortName}
            </tr>
          </thead>
          <tbody>
            {this.populateCalendar(this.state.dateObject)}
          </tbody>
        </table>
        {this.month(this.state.dateObjectNext)} {this.year(this.state.dateObjectNext)}
        <table className="calendar-day">
          <thead>
            <tr>
              {weekdayShortName}
            </tr>
          </thead>
          <tbody>
            {this.populateCalendar(this.state.dateObjectNext)}
          </tbody>
        </table>
        <button onClick={event=>{this.onPrev()}}>Last month</button>
        <button onClick={event=>{this.onNext()}}>Next month</button>
      </div>
    )
  }
}



export default CalendarTable