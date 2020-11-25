const db = require("../db");

const QueueData = {
  add: async () => {

    const {
      rows
    } = await db.query(`insert into planet_queue_item (item_type, item_key, queue_timestamp, planet_id, player_id) values ($1, $2, $3, $4, $5) returning *, EXTRACT(EPOCH FROM queue_timestamp) as epoch;`,
      [payload.type, payload.key, payload.timestamp, payload.planetId, payload.playerId]);
  },

  remove: async function (items) {
    let client = await db.createClient();
    try {
      await client.query("BEGIN");

      for (const id in items) {
        await client.query('delete from planet_queue_item where id = $1;', [id]);
      }

      await client.query("COMMIT");
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  },

  getUpcomingItems: async function () {
    const {
      rows
    } = await db.query(`select *, EXTRACT(EPOCH FROM queue_timestamp) as epoch  from planet_queue_item where queue_timestamp <= NOW() + INTERVAL '5 minutes'`);
    return rows;
  },
};

module.exports = QueueData;