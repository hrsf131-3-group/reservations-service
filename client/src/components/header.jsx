import React from 'react'
import styled from 'styled-components'

const HeaderPricePerNight = styled.div`
  justify-content: flex-start;
  margin-bottom: 20px;
  cursor: default;
`;
const PricePerNight = styled.span`
  font-weight: 600;
  font-size: 20px;
  color: black;
`;
const PerNight = styled.span`
  font-size: 16px;
`;

function Header(props) {
  return (
    <HeaderPricePerNight>
      <PricePerNight>{`$${props.pricePerNight}`}</PricePerNight>
      <PerNight>{` / night`}</PerNight>
    </HeaderPricePerNight>
  )
}

export default Header