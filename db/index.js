const mysql = require('mysql')
const mysqlConfig = require('../config/database')

const pool = mysql.createPool(mysqlConfig)

module.exports = pool
