// import any dependencies
// mysql/sequelize
const Sequelize = require('sequelize')

// connect to database
const sequelize = new Sequelize('reservations', 'root', '', {
  dialect: 'mysql',
  define: { timestamps: false }
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// create tables
// listings
const Listings = sequelize.define('listing', {
  // Id INT PRIMARY KEY AUTO_INCREMENTING
  max_guest_count: Sequelize.INTEGER,
  minimum_stay: Sequelize.INTEGER
}, {
  underscored: true
})

// reservations
const Reservations = sequelize.define('reservation', {
  // Id INT PRIMARY KEY AUTO_INCREMENTING
  check_in: { type: Sequelize.DATEONLY, allowNull: false },
  check_out: { type: Sequelize.DATEONLY, allowNull: false },
  adults: { type: Sequelize.INTEGER, allowNull: false },
  children: Sequelize.INTEGER,
  infants: Sequelize.INTEGER,
}, {
  underscored: true
})

// dates
// id INT PRIMARY KEY AUTO_INCREMENTING
const Dates = sequelize.define('date', {
  date: Sequelize.DATEONLY,
  available: Sequelize.BOOLEAN,
  base_price_per_night: Sequelize.INTEGER,
  cleaning_fee: Sequelize.INTEGER,
  service_fee: Sequelize.INTEGER,
  occupancy_taxes_and_fees: Sequelize.INTEGER,
  is_weekend: Sequelize.BOOLEAN,
  weekly_discount: Sequelize.INTEGER,
  month_discount: Sequelize.INTEGER,
  total_price: Sequelize.INTEGER
}, {
  underscored: true
})

// set foreign keys
Listings.hasMany(Reservations);
Reservations.belongsTo(Listings);
Listings.hasMany(Dates);
Dates.belongsTo(Listings);

// sync tables to database
sequelize.sync({force: true})

// justification: function to randomize seed data
// input: number - how many listings
// output: object - listing with desired fields
// constraints: n/a
// edge cases: n/a
// function seed data




// invoke seed data


// end connection to database