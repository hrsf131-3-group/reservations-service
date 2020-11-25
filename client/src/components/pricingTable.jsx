import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const PricingTableStyle = styled.div`
  display: ${(props)=> props.isPricingTableDisplay ? 'flex' : 'none'};
  flex-direction: row;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 15px;
  cursor: default;
  font-size: 14px;
  font-weight: 300;
`;
const PricingColInfoTotal = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 5px;
  font-size: 14px;
  font-weight: 300;
`;
const PricingColInfo = styled(PricingColInfoTotal)`
  text-decoration: underline;
  cursor: pointer;
  &: hover {
    font-weight: 400;
  }
`;
const PricingColPrices = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  padding-top: 5px;
  font-size: 14px;
  font-weight: 300;
  text-decoration: none;
`;
const PricingFooter = styled(PricingTableStyle)`
  padding-top: 5px;
  padding-bottom: 0px;
  border-top: 1px solid darkgrey;
  font-weight: 800;
  color: black;
  font-size: 16px;
  text-decoration: none;
`;

const PricingTable = (props) => {
  return (
    <div>
      <PricingTableStyle isPricingTableDisplay={props.isPricingTableDisplay}>
        <PricingColInfo>
          <PricingColInfo>{`$${props.data[0].base_price_per_night} x ${props.daysSelected} nights`}</PricingColInfo>
          <PricingColInfo>Service fee</PricingColInfo>
          <PricingColInfo>Cleaning fee</PricingColInfo>
          <PricingColInfo>Occupancy taxes and fees</PricingColInfo>
        </PricingColInfo>
        <PricingColPrices>
          <PricingColPrices>{`$${props.data[0].base_price_per_night * props.daysSelected}`}</PricingColPrices>
          <PricingColPrices>{`$${props.data[0].service_fee}`}</PricingColPrices>
          <PricingColPrices>{`$${props.data[0].cleaning_fee}`}</PricingColPrices>
          <PricingColPrices>{`$${props.data[0].occupancy_taxes_and_fees}`}</PricingColPrices>
        </PricingColPrices>
      </PricingTableStyle>
      <PricingFooter isPricingTableDisplay={props.isPricingTableDisplay}>
        <PricingColInfoTotal>
          <PricingColInfoTotal>Total</PricingColInfoTotal>
        </PricingColInfoTotal>
        <PricingColPrices>
          <PricingColPrices>{`$${props.data[0].base_price_per_night * props.daysSelected + props.data[0].service_fee + props.data[0].cleaning_fee + props.data[0].occupancy_taxes_and_fees}`}</PricingColPrices>
        </PricingColPrices>
      </PricingFooter>
    </div>
  )
}

export default PricingTable