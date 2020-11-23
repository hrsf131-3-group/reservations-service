import React from 'react'
import styled from 'styled-components'

const HeaderPricePerNight = styled.div`
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const PricePerNight = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

function Header(props) {
  return (
    <HeaderPricePerNight>
      <PricePerNight>{`$${props.pricePerNight}`}</PricePerNight>
      <PricePerNight>{` / night`}</PricePerNight>
    </HeaderPricePerNight>
  )
}

export default Header