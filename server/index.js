const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const router = require('./router/router.js')

var app = express();
const port = 3000;

// json all incoming requests
app.use(bodyParser.json())

// server static files to client
app.use(express.static(__dirname + '../public'))

// route incoming request to router
app.use('/api/homes', router)

// listen to port
app.listen(port, () => {
  console.log(`now listening to http://localhost:${port}`)
})