import React from 'react'
import moment from 'moment'

function PricingTable(props) {
  return (
    <div>
      <div className={props.isPricingTableDisplay ? "pricingTable" : "hiddenPricingTable"}>
        <div className="pricingColInfo">
          <div className="pricingColInfo">{`$${props.data[0].base_price_per_night} x ${props.daysSelected} nights`}</div>
          <div className="pricingColInfo">Service fee</div>
          <div className="pricingColInfo">Cleaning fee</div>
          <div className="pricingColInfo">Occupancy taxes and fees</div>
        </div>
        <div className="pricingColPrices">
          <div className="pricingColPrices">{`$${props.data[0].base_price_per_night * props.daysSelected}`}</div>
          <div className="pricingColPrices">{`$${props.data[0].service_fee}`}</div>
          <div className="pricingColPrices">{`$${props.data[0].cleaning_fee}`}</div>
          <div className="pricingColPrices">{`$${props.data[0].occupancy_taxes_and_fees}`}</div>
        </div>
      </div>
      <div className={props.isPricingTableDisplay ? "pricingTable pricingFooter" : "hiddenPricingTable"}>
        <div className="pricingColInfo">
          <div className="pricingColInfo">Total</div>
        </div>
        <div className="pricingColPrices">
          <div className="pricingColPrices">{`$${props.data[0].base_price_per_night * props.daysSelected + props.data[0].service_fee + props.data[0].cleaning_fee + props.data[0].occupancy_taxes_and_fees}`}</div>
        </div>
      </div>
    </div>
  )
}

export default PricingTable