const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const router = require('./router/router.js')
const path = require('path')

var app = express();
const port = 3002;

const pathName = path.join(__dirname, '../public')

// server static files to client
app.use(express.static(pathName))

// json all incoming requests
app.use(bodyParser.json())

// route incoming request to router
app.use('/api/homes', router)

// listen to port
app.listen(port, '18.144.83.36', (err) => {
  console.log(`now listening to 18.144.83.36:${port}`)
  if (err) {
    console.log('error has occurred', err)
  }
})