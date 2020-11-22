const db = require("../db");
const Planets = require("./Planets");
const QueueController = function () {
  return {
    tick: 0,
    timestamp: Date.now() / 1000,
    upcomingItems: [],
    add: async function(key, payload) {
      console.log(key, payload);

      const {
        rows
      } = await db.query(`insert into planet_queue_item (item_type, item_key, queue_timestamp, planet_id, player_id) values ($1, $2, $3, $4, $5) returning *, EXTRACT(EPOCH FROM queue_timestamp) as epoch;`,
        [payload.type, payload.key, payload.timestamp, payload.planetId, payload.playerId]);


      if (payload.addToUpcomingItems) {

        console.log(rows);
      }
    },

    removeFromDB: async function (items) {
      console.log('removing from db');
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
    removeProcessedItems: async function (items) {
      this.upcomingItems = this.upcomingItems.filter(item => {
        return !(item.id in items);
      });
    },
    getUpcomingItems: async function () {
      const {
        rows
      } = await db.query(`select *, EXTRACT(EPOCH FROM queue_timestamp) as epoch  from planet_queue_item where queue_timestamp <= NOW() + INTERVAL '5 minutes'`);
      return rows;
    },


    process: async function () {
      let i = 0,
        length = this.upcomingItems.length,
        item = [];
      toRemove = {};

      while (i < length) {
        item = this.upcomingItems[i];
        if (Math.floor(this.timestamp) > Math.floor(item.epoch)) {
          toRemove[item.id] = true;

          if (item.item_type === 'building') {
            Planets.upgradeBuilding(item.item_key, item.planet_id, item.player_id);
          }
        }
        i++;
      }

      if (Object.keys(toRemove).length > 0) {

        // wait for this to process before continuing
        await this.removeProcessedItems(toRemove);

        await this.removeFromDB(toRemove);
      }

    },

    // this is fired every five minutes
    start: async function () {
      let interval = 1000; // 1  second 
      let whenToCheckUpcoming = 10000; //60000;

      this.upcomingItems = await this.getUpcomingItems();
      this.process();

      setInterval(async () => {
        if (this.tick !== whenToCheckUpcoming) this.tick += 1000;
        else if (this.tick === whenToCheckUpcoming) {
          this.upcomingItems = await this.getUpcomingItems();
          this.tick = 0;
        }

        this.timestamp = Date.now() / 1000;

        this.process();

        console.log(this.tick, Object.keys(this.upcomingItems).length);
      }, interval);
    }
  }
};

module.exports = QueueController;