import React from 'react'

function GuestPicker(props) {
  return (
    <div className={props.isGuestDropdownDisplay ? "showGuestPicker" : "hiddenGuestPicker"}>
      <div className="guestRow">
        <div>Adults</div>
        <div className="guestQuantityContainer">
          <button className="minusButton">-</button>2<button>+</button>
        </div>
      </div>
      <div className="guestRow">
        <div className="childrenRow"><div>Children</div><div className="guestNote">Ages 2-12</div></div>
        <div className="guestQuantityContainer">
          <button className="minusButton">-</button>0<button>+</button>
        </div>
      </div>
      <div className="guestRow">
        <div className="childrenRow"><div>Infants</div><div className="guestNote">Under 2</div></div>
        <div className="guestQuantityContainer">
          <button className="minusButton">-</button>0<button>+</button>
        </div>
      </div>
      <div className="guestNote">
        Infants don't count <br/>towards number of guests
      </div>
      <button className="guestCloseButton" onClick={props.displayGuestPickerOnClick}>Close</button>
    </div>
  )
}

export default GuestPicker