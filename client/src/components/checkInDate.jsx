import React from 'react'

function CheckInDate(props) {
  return (
    <section className="checkInDate">
      <section className="checkInTitle">CHECK-IN</section>
      <input
        placeholder="Add date"
        type="text"
        size="15"
        value={props.checkInValue}
        onChange={props.checkInChange}
        onClick={props.displayCalendar}
      />
    </section>
  )
}

export default CheckInDate