import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'
import CalendarTable from './calendarTable.jsx'

function Calendar(props) {
  return (
    <div className={props.isCalendarDisplay ? "showCalendar" : 'hiddenCalendar'}>
      <div className="calendarHead">
        <div className="headerCalendar">
          <span className="selectDates">Select dates</span>
          <div className="dateRangeDisplayCalendar">
            <span className="selectedDateRange">Minimum stay: 2 nights</span>
          </div>
        </div>
        <div className="calendarBookingContainer">
          <CheckInDate
            checkInValue={props.checkInValue}
            checkInChange={props.checkInChange}
          />
          <CheckOutDate
            checkOutValue={props.checkOutValue}
            checkOutChange={props.checkOutChange}
          />
        </div>
      </div>
      <CalendarTable
        updateBookingDates={props.updateBookingDates}
        datesData={props.datesData}
        currentCheckInInput={props.currentCheckInInput}
        currentCheckOutInput={props.currentCheckOutInput}
      />
      <div className="calendarButtons">
        <button className="clearButton" onClick={props.clearDates}>Clear dates</button>
        <button className="closeButton" onClick={props.hidePopUps}>Close</button>
      </div>
    </div>
  )
}

export default Calendar