import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'

function Calendar(props) {
  return (
    <div
      class={props.isCalendarDisplay ? "showCalendar" : 'hiddenCalendar'}
    >
      <div>
        <div class="headerCalendar">
          Header - Select dates / n-nights
        </div>
        <div class="dateRangeDisplayCalendar">
          Add your travel dates for exact pricing / range of date
        </div>
      </div>
      <CheckInDate
        checkInValue={props.checkInValue}
        checkInChange={props.checkInChange}
      />
      <CheckOutDate
        checkOutValue={props.checkOutValue}
        checkOutChange={props.checkOutChange}
      />
      <div>Calendar Table 1</div>
      <div>Calendar Table 2</div>
      <div>Keyboard shortcuts</div>
      <div>Clear dates button</div>
      <div>Close button</div>
    </div>
  )
}

export default Calendar