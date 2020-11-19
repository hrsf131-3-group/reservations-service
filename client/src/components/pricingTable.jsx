import React from 'react'

function PricingTable(props) {
  const getPricing = () => {
    // get dates
    // add up per night
    // 1 service fee
    // 1 cleaning fee
    // 1 occupancy tax and fee
    // add up for total
  }
  return (
    <div>
      <div className={props.isPricingTableDisplay ? "pricingTable" : "hiddenPricingTable"}>
        <div className="pricingColInfo">
          <div className="pricingColInfo">$100 x 1 nights</div>
          <div className="pricingColInfo">Service fee</div>
          <div className="pricingColInfo">Cleaning fee</div>
          <div className="pricingColInfo">Occupancy taxes and fees</div>
        </div>
        <div className="pricingColPrices">
          <div className="pricingColPrices">$100</div>
          <div className="pricingColPrices">$50</div>
          <div className="pricingColPrices">$100</div>
          <div className="pricingColPrices">$150</div>
        </div>
      </div>
      <div className={props.isPricingTableDisplay ? "pricingTable pricingFooter" : "hiddenPricingTable"}>
        <div className="pricingColInfo">
          <div className="pricingColInfo">Total</div>
        </div>
        <div className="pricingColPrices">
          <div className="pricingColPrices">$400</div>
        </div>
      </div>
    </div>
  )
}

export default PricingTable