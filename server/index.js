const express = require('express')
const axios = require('axios')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

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
app.get('/api/homes/calendar', (req, res) => {
  Dates.findAll({
    where: {listingId: req.body.id},
    attributes: ['date', 'available']
  })
  .then((data) => res.send(data))
  .catch((err) => res.sendStatus(404))
})

// post request

// listen to port
app.listen(port, () => {
  console.log(`now listening to http://localhost:${port}`)
})