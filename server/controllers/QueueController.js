const db = require("../db");
const Planets = require("./Planets");
const QueueData = require("../data/Queue");

const QUEUEINTERVAL  = require("../../config").queueInterval;

const QueueController = function () {
  return {
    tick: 0,
    timestamp: Date.now() / 1000,
    upcomingItems: [],
    add: async function(key, payload) {
      QueueData.add(payload);
      
      if (payload.addToUpcomingItems) {
        console.log(rows);
      }
    },
    removeProcessedItems: async function (items) {
      this.upcomingItems = this.upcomingItems.filter(item => {
        return !(item.id in items);
      });
    },


    process: async function () {
      let index = 0;
      let length = this.upcomingItems.length;
      let currentItem = [];
      let itemsToRemove = {};

      while (index < length) {
        currentItem = this.upcomingItems[index];
        if (Math.floor(this.timestamp) > Math.floor(currentItem.epoch)) {
          itemsToRemove[currentItem.id] = true;

          if (currentItem.item_type === 'building') {
            Planets.upgradeBuilding(currentItem.item_key, currentItem.planet_id, currentItem.player_id);
          }
        }
        index++;
      }

      if (Object.keys(itemsToRemove).length > 0) {

        // wait for this to process before continuing
        await this.removeProcessedItems(itemsToRemove);

        await QueueData.remove(itemsToRemove);
      }

    },

    // this is fired every five minutes
    start: async function () {
      let interval = 1000; // 1  second 

      this.upcomingItems = await QueueData.getUpcomingItems();
      this.process();

      setInterval(async () => {
        if (this.tick !== QUEUEINTERVAL) this.tick += 1000;
        else if (this.tick === QUEUEINTERVAL) {
          this.upcomingItems = await QueueData.getUpcomingItems();
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