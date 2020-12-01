import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const Calendars = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 20px;
  text-align: center;
`;
const LeftCalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 85px;
  font-weight: 600;
  padding-bottom: 12px;
`;
const RightCalenderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 85px;
  font-weight: 600;
  padding-bottom: 12px;
`;
const DisableMonthButton = styled.button`
  color: ${(props) => props.disable ? 'lightgrey' : 'default'};
  background: none;
  border: none;
  cursor: ${(props) => props.disable ? 'default' : 'pointer'};
  outline: none;
`;
const ChangeMonthButton = styled.button`
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
`;
const CalendarTables = styled.table`
  table-layout: fixed;
  border-spacing: 0px 1px;
`;
const CalendarDay = styled.td`
  width: 20px;
  height: 30px;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid white;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    border: 1px solid black;
    border-width: thin;
    border-radius: 50%;
  }
`;
const CheckOutOnly = styled(CalendarDay)`
  text-decoration-color: rgb(145, 143, 143);
  color: rgb(141, 139, 139);
  cursor: pointer;
  font-weight: bold;
  background: white;
  &:hover {
    border: 1px solid rgb(141, 139, 139);
  }
`;
const DateUnavailable = styled(CalendarDay)`
  text-decoration: line-through;
  text-decoration-color: rgb(145, 143, 143);
  color: rgb(141, 139, 139);
  cursor: default;
  font-weight: 200;
  background: white;
  &:hover {
    border: none;
  }
`;
const SelectedCheckInDate = styled(CalendarDay)`
  border: none;
  background: black;
  color: white;
  border-radius: 50%;
`;
const SelectedCheckOutDate = styled(CalendarDay)`
  border: none;
  background: black;
  color: white;
  border-radius: 50%;
`;
const InDateRange = styled(CalendarDay)`
  background: #f7f7f7;
  border: 1px solid #f7f7f7
`;
const WeekDay = styled.th`
  font-weight: 300;
`;
const LeftArrow = styled.svg`
  height: 12px;
  width: 12px;
  display: block;
  fill: currentcolor;
`;
const RightArrow = styled.svg`
  height: 12px;
  width: 12px;
  display: block;
  fill: rgb(34, 34, 34);
`;

class CalendarTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObject: moment(),
      dateObjectNext: moment().add(1, "month")
    }
  }
  daysInMonth(month) {
    return month.daysInMonth();
  }
  month(month) {
    return month.format("MMMM");
  }
  year(year) {
    return year.format("Y");
  }
  firstDayOfMonth(month) {
    let firstDay = moment(month).startOf('month').format('d');
    return firstDay;
  }
  onPrev() {
    if (moment().format('MMYY') !== this.state.dateObject.format('MMYY')) {
      this.setState({
        dateObject: this.state.dateObject.subtract(1, "month"),
        dateObjectNext: this.state.dateObjectNext.subtract(1, "month")
      })
    }
  }
  onNext() {
    this.setState({
      dateObject: this.state.dateObject.add(1, "month"),
      dateObjectNext: this.state.dateObjectNext.add(1, "month")
    })
  }
  isDateAvailable(date) {
    for (let i = 0; i < this.props.datesData.length; i++) {
      if (this.props.datesData[i].date === date) {
        if (this.props.datesData[i].available === false) {
          return false
        }
      }
    }
    return true
  }
  // get date
  onDateClick(event, date, isAvailable) {
    this.props.updateBookingDates(event, date, isAvailable);
  }
  // series of processes to fill up days of the given month
  populateCalendar(month) {
    // fills in any blanks before first day
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(month); i++) {
    blanks.push(<td>{""}</td>);
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
      let yesterday = moment(dateDashFormat).subtract(1, 'day').format(`YYYY-MM-DD`);
      let yesterdayAvailable = this.isDateAvailable(yesterday);
      let postSixMonths = moment().add(6, 'months');
      let isAvailable = (moment().isBefore(dateDashFormat)) ? this.isDateAvailable(dateDashFormat) : false;
      let isCheckInDate = (moment(this.props.currentCheckInInput).isSame(date)) ? true : false;
      let isCheckOutDate = (moment(this.props.currentCheckOutInput).isSame(date)) ? true : false;
      let isBetweenDates = moment(date).isBetween(this.props.currentCheckInInput, this.props.currentCheckOutInput) ? true : false;

      if (moment(dateDashFormat).isAfter(postSixMonths)) {
        daysInMonth.push(
          <DateUnavailable
            onClick={(event)=>{this.onDateClick(event, date, isAvailable, yesterdayAvailable)}}
            ><span>{d}</span>
          </DateUnavailable>
        );
      } else if (isCheckOutDate) {
        daysInMonth.push(
          <SelectedCheckOutDate
            onClick={(event)=>{this.onDateClick(event, date, isAvailable, yesterdayAvailable)}}
            ><span>{d}</span>
          </SelectedCheckOutDate>
        );
      } else if (isCheckInDate) {
        daysInMonth.push(
          <SelectedCheckInDate
            onClick={(event)=>{this.onDateClick(event, date, isAvailable, yesterdayAvailable)}}
            ><span>{d}</span>
          </SelectedCheckInDate>
        );
      } else if (isBetweenDates) {
        daysInMonth.push(
          <InDateRange
            onClick={(event)=>{this.onDateClick(event, date, isAvailable, yesterdayAvailable)}}
            ><span>{d}</span>
          </InDateRange>
        );
      } else if (isAvailable) {
        daysInMonth.push(
          <CalendarDay
            onClick={(event)=>{this.onDateClick(event, date, isAvailable, yesterdayAvailable)}}
            ><span>{d}</span>
          </CalendarDay>
        );
      } else if ((!isAvailable) && yesterdayAvailable && moment().isBefore(date)) {
        daysInMonth.push(
          <CheckOutOnly
          onClick={(event)=>{this.onDateClick(event, date, isAvailable, yesterdayAvailable)}}
          ><span>{d}</span>
        </CheckOutOnly>
        );
      }
      else {
        daysInMonth.push(
          <DateUnavailable
            onClick={(event)=>{this.onDateClick(event, date, isAvailable, yesterdayAvailable)}}
            ><span>{d}</span>
          </DateUnavailable>
        );
      }
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
    let weekdayShortName = moment.weekdaysShort().map(day => {
      return (
        <WeekDay key={day}>{day.slice(0, -1)}</WeekDay>
      );
    });

    return (
      <Calendars>
        <div>
          <LeftCalendarHeader>
            <DisableMonthButton disable={this.state.dateObject.isBefore(moment())}
            onClick={event=>{this.onPrev()}}>
              <LeftArrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"/></LeftArrow>
            </DisableMonthButton>
            <div>
              {this.month(this.state.dateObject)} {this.year(this.state.dateObject)}
            </div>
          </LeftCalendarHeader>
          <CalendarTables>
            <thead>
              <tr>
                {weekdayShortName}
              </tr>
            </thead>
            <tbody>
              {this.populateCalendar(this.state.dateObject)}
            </tbody>
          </CalendarTables>
        </div>
        <div>
          <RightCalenderHeader>
            <div>
              {this.month(this.state.dateObjectNext)} {this.year(this.state.dateObjectNext)}
            </div>
            <ChangeMonthButton onClick={event=>{this.onNext()}}>
            <RightArrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"/></RightArrow>
            </ChangeMonthButton>
          </RightCalenderHeader>
          <CalendarTables>
            <thead>
              <tr>
                {weekdayShortName}
              </tr>
            </thead>
            <tbody>
              {this.populateCalendar(this.state.dateObjectNext)}
            </tbody>
          </CalendarTables>
        </div>
      </Calendars>
    )
  }
}

export default CalendarTable