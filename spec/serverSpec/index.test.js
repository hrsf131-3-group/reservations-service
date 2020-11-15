const axios = require('axios')
const mysql = require('mysql')
const request = require('request')

describe('Test functionality for server side apis', () => {

  beforeEach(() => {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'reservations'
    })
    dbConnection.connect();

  })

  afterEach(() => {
    dbConnection.end();
  })

  it('POST request to reservations and then DELETE record from database', (done) => {
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
      let queryString = 'SELECT * FROM reservations WHERE adults = 100';
      let queryArgs = [];
      dbConnection.query(queryString, queryArgs, (err, results) => {
        console.log(results)
        expect(results[0].adults).toBe(100)
        expect(results.length).toEqual(1)
      })
      queryString = 'DELETE FROM reservations WHERE adults = 100';
      dbConnection.query(queryString, queryArgs, (err, results) => {
        console.log(results)
        expect(results.length).toBe(undefined)
        done()
      })
    })
  })
})

describe('testing 1 + 1', () => {
  it('1 + 1 should equal 2', () => {
    expect(1 + 1).toEqual(2);
  })
})
