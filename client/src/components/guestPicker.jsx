import React from 'react'

function GuestPicker(props) {
  const chooseNumGuest = (num) => {
    let numGuest = [];
    for (let i = 1; i <= num; i++) {
      let guestCount = `guestCount${i}`;
      if (i === 1) {
        numGuest.push(<button className="guestNumber" name={guestCount}>{i} guest</button>);
      } else {
        numGuest.push(<button className="guestNumber" name={guestCount}>{i} guests</button>);
      }
    }
    return numGuest;
  }

  return (
    <div className={props.isGuestDropdownDisplay ? "showGuestPicker" : "hiddenGuestPicker"}>
      <ul className="guestPickerList">
        {chooseNumGuest(props.maxGuestCount)}
      </ul>
      <button className="guestCloseButton">Close</button>
    </div>
  )
}

export default GuestPicker