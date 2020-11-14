const express = require('express')
const axios = require('axios')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const {Op} = require('sequelize')

var app = express();
const port = 3000;

// connect to db
const sequelize = new Sequelize('reservations', 'root', '', {
  dialect: 'mysql',
  define: { timestamps: false }
});

// schema for tables
const Listings = sequelize.define('listing', {
  max_guest_count: Sequelize.INTEGER,
  minimum_stay: Sequelize.INTEGER
}, {
  underscored: true
})

const Reservations = sequelize.define('reservation', {
  check_in: { type: Sequelize.DATEONLY, allowNull: false },
  check_out: { type: Sequelize.DATEONLY, allowNull: false },
  adults: { type: Sequelize.INTEGER, allowNull: false },
  children: Sequelize.INTEGER,
  infants: Sequelize.INTEGER,
}, {
  underscored: true
})

const Dates = sequelize.define('date', {
  date: Sequelize.DATEONLY,
  available: Sequelize.BOOLEAN,
  base_price_per_night: Sequelize.INTEGER,
  cleaning_fee: Sequelize.INTEGER,
  service_fee: Sequelize.INTEGER,
  occupancy_taxes_and_fees: Sequelize.INTEGER,
  is_weekend: Sequelize.BOOLEAN,
  weekly_discount: Sequelize.INTEGER,
  monthly_discount: Sequelize.INTEGER,
  total_price: Sequelize.INTEGER
}, {
  underscored: true
})

Listings.hasMany(Reservations);
Reservations.belongsTo(Listings);
Listings.hasMany(Dates);
Dates.belongsTo(Listings);

sequelize.sync()

// json all incoming requests
app.use(bodyParser.json())

// get requests
// get booking availabilities
app.get('/api/homes/:id/calendar', (req, res) => {
  Dates.findAll({
    include: {model: Listings, attributes: ['max_guest_count', 'minimum_stay']},
    where: {listingId: req.params.id},
    attributes: ['date', 'available']
  })
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(404))
})

// find all
app.get('/api/homes/:id/reservations', (req, res) => {
  Dates.findAll({
    where: {
      listingId: req.params.id,
      date: {[Op.between]: [req.body.checkIn, req.body.checkOut]}
    },
    attributes: ['listing_id', 'base_price_per_night', 'cleaning_fee', 'service_fee', 'occupancy_taxes_and_fees', 'total_price', 'weekly_discount', 'monthly_discount']
  })
    .then((data) => res.send(data))
    .catch((err) => res.send(404))
})


// post request
app.post('/api/homes/:id/reservations', (req, res) => {
  Reservations.create({
    check_in: req.body.checkIn,
    check_out: req.body.checkOut,
    adults: req.body.adults,
    children: req.body.children,
    infants: req.body.infants,
    listingId: req.params.id
  })
    .then(
      Dates.update({
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

// listen to port
app.listen(port, () => {
  console.log(`now listening to http://localhost:${port}`)
})