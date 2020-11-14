const axios = require('axios')
const mysql = require('mysql')
const request = require('request')

describe('tests for server side apis', () => {

  beforeEach(() => {
    // console.log('before each')
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'reservations'
    })
    dbConnection.connect();

  })

  afterEach(() => {
    dbConnection.end();
    // console.log('after each')
  })

  it('post request to reservation', (done) => {
    request({
      method: 'POST',
      uri: 'http://localhost:3000/api/homes/1/reservations',
      json: {
        checkIn: "2021-01-01",
        checkOut: "2021-01-08",
        adults: 100,
        children: 1,
        infants: 1
      }
    }, () => {
      let queryString = 'SELECT * FROM reservations';
      let queryArgs = [];
      dbConnection.query(queryString, queryArgs, (err, results) => {
        expect(results[0].adults).toBe(100)
      })
      queryString = 'DELETE FROM reservations WHERE adults = 100';
      dbConnection.query(queryString, queryArgs, (err, results) => {
        console.log(results)
        done()
      })
    })
  })
})
