const { Pool } = require('pg')
const { database } = require("../../config");
const pool = new Pool(database);
// https://github.com/brianc/node-postgres/wiki/FAQ#8-does-node-postgres-handle-sql-injection

module.exports = {
  // use for single queries
  query: (text, params) => pool.query(text, params),

  // use for transactions, always release the client afterwards to avoid mem leaks
  // https://node-postgres.com/features/transactions
  createClient: () => pool.connect(),
}