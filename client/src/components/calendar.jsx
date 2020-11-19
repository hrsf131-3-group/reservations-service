import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'
import CalendarTable from './calendarTable.jsx'

function Calendar(props) {
  return (
    <div class={props.isCalendarDisplay ? "showCalendar" : 'hiddenCalendar'}>
      <div class="calendarHead">
        <div class="headerCalendar">
          Header - Select dates / n-nights
          <div class="dateRangeDisplayCalendar">
            Add your travel dates for exact pricing / range of date
          </div>
        </div>
        <div class="bookingContainer">
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
      />
      <div>Keyboard shortcuts</div>
      <button onClick={props.clearDates}>Clear</button>
      <button onClick={props.hidePopUps}>Close button</button>
    </div>
  )
}

export default Calendar