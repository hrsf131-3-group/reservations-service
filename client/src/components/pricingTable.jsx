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
    <div className={props.isPricingTableDisplay ? "pricingTable" : "hiddenPricingTable"}>
      <div className="pricingRow">
        <div>
          $100 x 1 night
        </div>
        <div>
          $100
        </div>
      </div>
      <div className="pricingRow">
        <div>
          Service fee
        </div>
        <div>
          $50
        </div>
      </div>
      <div className="pricingRow">
        <div>
          Cleaning fee
        </div>
        <div>
          $100
        </div>
      </div>
      <div className="pricingRow">
        <div>
          Occupancy taxes and fees
        </div>
        <div>
          $150
        </div>
      </div>
      <div className="pricingTotal">
        <div>
          Total
        </div>
        <div>
          $400
        </div>
      </div>
    </div>
  )
}

export default PricingTable