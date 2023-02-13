const express = require('express')
const mysql = require('mysql')
const path = require('node:path')
const bodyParser = require('body-parser')

const app = express()
const hostname = '127.0.0.1'
const port = 3000
const user = ''
const password = ''
const dbname = ''
const tableName = 'customers'

const createTable = (name) =>
  `CREATE TABLE ${name} (name VARCHAR(255), address VARCHAR(255))`

const addUser = (table, name, address) =>
  `INSERT INTO ${table} (name, address) VALUES ("${name}", "${address}")`

const selectAllCustomers = (table) => `SELECT * FROM ${table}`
const alterTable = (table) =>
  `ALTER TABLE ${table} ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY`

const connectDb = mysql.createConnection({
  host: hostname,
  user: user,
  password: password,
  database: dbname,
})

connectDb.connect()

app.post('/add', function (req, res) {
  let username = req.body.name
  let address = req.body.address
  connectDb.query(
    addUser(tableName, username, address),
    function (err, result) {
      if (err) throw err
      console.log('1 record inserted')
    }
  )
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
