import React from 'react'

function Header(props) {
  return (
    <div className="headerPricePerNight">
      <span className="pricePerNight">{`$${props.pricePerNight}`}</span>
      <span className="perNightString">{` / night`}</span>
    </div>
  )
}

export default Header