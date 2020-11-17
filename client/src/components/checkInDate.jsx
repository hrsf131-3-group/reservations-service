import React from 'react'

function CheckInDate(props) {
  return (
    <div class="checkInDate">
      <section>checkin</section>
      <input
        placeholder="Add date"
        type="text"
        value={props.checkInValue}
        onChange={props.checkInChange}
      />
    </div>
  )
}

export default CheckInDate