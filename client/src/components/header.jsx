import React from 'react'

function Header(props) {
  return (
    <div class="headerPricePerNight">
      <span class="pricePerNight">{`$${props.pricePerNight}`}</span>
      <span class="perNightString">{` / night`}</span>
    </div>
  )
}

export default Header