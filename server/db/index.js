const { Pool } = require('pg')
const { database } = require("../../config");
const pool = new Pool(database);
// https://github.com/brianc/node-postgres/wiki/FAQ#8-does-node-postgres-handle-sql-injection

module.exports = {
  query: (text, params) => pool.query(text, params)
}