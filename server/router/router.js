const express = require('express')
const {Op} = require('sequelize')
const Models = require('../../db/models/models.js')

var router = express.Router();

// get requests
// get booking availabilities
router.route('/:id/reservations')
 .get((req, res) => {
  Models.Dates.findAll({
    include: {model: Models.Listings, attributes: ['max_guest_count', 'minimum_stay']},
    where: {listingId: req.params.id},
    attributes: ['date', 'available', 'base_price_per_night', 'cleaning_fee', 'service_fee', 'occupancy_taxes_and_fees', 'total_price', 'weekly_discount', 'monthly_discount'],
    order: [['date']]
  })
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(404))
})

// // find all
router.route('/:id/reservation')
  .get((req, res) => {
  Models.Dates.findAll({
    where: {
      listingId: req.params.id,
      date: {[Op.between]: [req.body.checkIn, req.body.checkOut]}
    },
    attributes: ['listing_id', 'cleaning_fee', 'service_fee', 'occupancy_taxes_and_fees', 'total_price', 'weekly_discount', 'monthly_discount']
  })
    .then((data) => res.send(data))
    .catch((err) => res.send(404))
})

// // post request
// // post new reservation and update dates available
router.route('/:id/reservation')
  .post((req, res) => {
  Models.Reservations.create({
    check_in: req.body.checkIn,
    check_out: req.body.checkOut,
    adults: req.body.adults,
    children: req.body.children,
    infants: req.body.infants,
    listingId: req.params.id
  })
    .then(
      Models.Dates.update({
      available: false
    }, {
      where: {
        listingId: req.params.id,
        date: {[Op.between]: [req.body.checkIn, req.body.checkOut]}
      }
    }))
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(404))
})

module.exports = router;