import React from 'react'

function GuestPicker(props) {
  const chooseNumGuest = (num) => {
    let numGuest = [];
    for (let i = 1; i <= num; i++) {
      let guestCount = `guestCount${i}`;
      if (i === 1) {
        numGuest.push(<li class={guestCount}>{i} guest</li>);
      } else {
        numGuest.push(<li class={guestCount}>{i} guests</li>);
      }
    }
    return numGuest;
  }

  return (
    <div class={props.isGuestDropdownDisplay ? "showGuestPicker" : "hiddenGuestPicker"}>
      <ul class="guestPickerList">
        {chooseNumGuest(props.maxGuestCount)}
      </ul>
      <button>Close</button>
    </div>

  )
}

export default GuestPicker