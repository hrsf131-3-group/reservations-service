import React from 'react'

function GuestPicker(props) {
  const chooseNumGuest = (num) => {
    let numGuest = [];
    for (let i = 1; i <= num; i++) {
      let guestCount = `guestCount${i}`;
      if (i === 1) {
        numGuest.push(<button class="guestNumber" name={guestCount}>{i} guest</button>);
      } else {
        numGuest.push(<button class="guestNumber" name={guestCount}>{i} guests</button>);
      }
    }
    return numGuest;
  }

  return (
    <section class={props.isGuestDropdownDisplay ? "showGuestPicker" : "hiddenGuestPicker"}>
      <ul class="guestPickerList">
        {chooseNumGuest(props.maxGuestCount)}
      </ul>
      <button>Close</button>
    </section>

  )
}

export default GuestPicker