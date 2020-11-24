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
  justify-content: space-evenly;
  padding-right: 40px;
  font-weight: 600;
`;
const RightCalenderHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-left: 50px;
  font-weight: 600;
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
  &:hover {
    border: 1px solid black;
    border-width: thin;
    border-radius: 50%;
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
    console.log('on prev clicked')
    this.setState({
      dateObject: this.state.dateObject.subtract(1, "month"),
      dateObjectNext: this.state.dateObjectNext.subtract(1, "month")
    })
  }
  onNext() {
    console.log('on next clicked')
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
      let postSixMonths = moment().add(6, 'months');
      let isAvailable = (moment().isBefore(dateDashFormat)) ? this.isDateAvailable(dateDashFormat) : false;
      let isCheckInDate = (moment(this.props.currentCheckInInput).isSame(date)) ? true : false;
      let isCheckOutDate = (moment(this.props.currentCheckOutInput).isSame(date)) ? true : false;
      let isBetweenDates = moment(date).isBetween(this.props.currentCheckInInput, this.props.currentCheckOutInput) ? true : false;

      if (moment(dateDashFormat).isAfter(postSixMonths)) {
        daysInMonth.push(
          <DateUnavailable
            // key={d}
            onClick={(event)=>{this.onDateClick(event, date, isAvailable)}}
            ><span>{d}</span>
          </DateUnavailable>
        );
      } else if (isCheckOutDate) {
        daysInMonth.push(
          <SelectedCheckOutDate
            // key={d}
            onClick={(event)=>{this.onDateClick(event, date, isAvailable)}}
            ><span>{d}</span>
          </SelectedCheckOutDate>
        );
      } else if (isCheckInDate) {
        daysInMonth.push(
          <SelectedCheckInDate
            // key={d}
            onClick={(event)=>{this.onDateClick(event, date, isAvailable)}}
            ><span>{d}</span>
          </SelectedCheckInDate>
        );
      } else if (isBetweenDates) {
        daysInMonth.push(
          <InDateRange
            // key={d}
            onClick={(event)=>{this.onDateClick(event, date, isAvailable)}}
            ><span>{d}</span>
          </InDateRange>
        );
      } else if (isAvailable) {
        daysInMonth.push(
          <CalendarDay
            // key={d}
            onClick={(event)=>{this.onDateClick(event, date, isAvailable)}}
            ><span>{d}</span>
          </CalendarDay>
        );
      } else {
        daysInMonth.push(
          <DateUnavailable
            // key={d}
            onClick={(event)=>{this.onDateClick(event, date, isAvailable)}}
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
            <DisableMonthButton disable={this.state.dateObject.isBefore('2020-11-30')}
            onClick={event=>{this.onPrev()}}>{`<`}</DisableMonthButton>
            {this.month(this.state.dateObject)} {this.year(this.state.dateObject)}
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
            {this.month(this.state.dateObjectNext)} {this.year(this.state.dateObjectNext)}
            <ChangeMonthButton onClick={event=>{this.onNext()}}>{`>`}</ChangeMonthButton>
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