import React from 'react'

function Header(props) {
  return (
    <div>
      {`$${props.pricePerNight} / night`}
    </div>
  )
}

export default Header