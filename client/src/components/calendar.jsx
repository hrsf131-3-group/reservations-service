import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'
import CalendarTable from './calendarTable.jsx'

function Calendar(props) {
  return (
    <div class={props.isCalendarDisplay ? "showCalendar" : 'hiddenCalendar'}>
      <div class="calendarHead">
        <div class="headerCalendar">
          <span class="selectDates">Select dates</span>
          <div class="dateRangeDisplayCalendar">
            <span class="selectedDateRange">Minimum stay: 2 nights</span>
          </div>
        </div>
        <div class="calendarBookingContainer">
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
      />
      <div class="calendarButtons">
        <button class="clearButton" onClick={props.clearDates}>Clear dates</button>
        <button class="closeButton" onClick={props.hidePopUps}>Close</button>
      </div>
    </div>
  )
}

export default Calendar