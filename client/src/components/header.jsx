import React from 'react'

function Header(props) {
  return (
    <div class="headerPricePerNight">
      {`$${props.pricePerNight} / night`}
    </div>
  )
}

export default Header