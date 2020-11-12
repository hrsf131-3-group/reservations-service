const Sequelize = require('sequelize')
const Faker = require('faker')
const fs = require('fs')

// ------------connection to database -----------
const sequelize = new Sequelize('reservations', 'root', '', {
  dialect: 'mysql',
  define: { timestamps: false }
});

// ------------------ tables --------------------
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

// ------------ set foreign keys ----------------
Listings.hasMany(Reservations);
Reservations.belongsTo(Listings);
Listings.hasMany(Dates);
Dates.belongsTo(Listings);

sequelize.sync()

// -------------- randomize seed data --------------
const createListing = (listing) => {

  const maxGuest = `${(Math.floor(Math.random() * 15)) + 2}`;
  const minStay = `${Math.ceil(Math.random() * 2)}`;
  const days = 7;
  Listings.create({
    max_guest_count: `${maxGuest}`,
    minimum_stay: `${minStay}`
  })
    .then(createDates(days, listing))
    .then(createReservations(listing))
}

const createDates = (numOfDays, listing) => {
  const cleaningFees = [50, 100, 150];
  const serviceFees = [25, 50, 75];
  const occupancyTaxesAndFees = [25, 50, 75];
  const weeklyDiscount = [5, 10];
  const monthlyDiscount = [10, 15];

  let currentDay = new Date();
  let day = 1;
  while (day <= numOfDays) {
    Dates.create({
      date: currentDay,
      available: true,
      base_price_per_night: Math.floor(Math.random() * 200 + 100),
      cleaning_fee: `${cleaningFees[day%3]}`,
      service_fee: `${serviceFees[day%3]}`,
      occupancy_taxes_and_fees: `${occupancyTaxesAndFees[day%3]}`,
      weekly_discount: `${weeklyDiscount[day%2]}`,
      monthly_discount: `${monthlyDiscount[day%2]}`,
      total_price: `${cleaningFees[day%3] + serviceFees[day%3] + occupancyTaxesAndFees[day%3]}`,
      listingId: `${listing}`
    })
    currentDay.setDate(currentDay.getDate() + 1);
    day++;
  }
  return listing
};

const createReservations = (listing) => {
  let randomDate = Faker.date.between('2020/12/01', '2020/12/31');
  let checkInDate = `${randomDate.getFullYear()}-${randomDate.getMonth() + 1}-${randomDate.getDate()}`;
  randomDate.setDate(randomDate.getDate() + Math.floor((Math.random() * 14) + 1))
  let checkOutDate = `${randomDate.getFullYear()}-${randomDate.getMonth() + 1}-${randomDate.getDate()}`;
  Reservations.create({
    check_in: checkInDate,
    check_out: checkOutDate,
    adults: Math.floor((Math.random() * 10) + 1),
    listingId: listing
  })
};

const listingSeedData = (numOfListings) => {
  let listingId = 1;
  while (listingId <= numOfListings) {
    createListing(listingId);
    listingId++;
  }
}

listingSeedData(2)


// stock inserts for testing
// INSERT INTO dates (date, available, base_price_per_night, listing_id) VALUES ('2020/11/15', true, 500, 1);
// INSERT INTO listings (max_guest_count, minimum_stay) VALUES (6, 2);
// INSERT INTO reservations (check_in, check_out, adults) VALUES ('2013-12-30', '2014-01-01', 6);