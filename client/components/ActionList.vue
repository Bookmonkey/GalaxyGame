<template>
  <div class="action-list">
    <div class="title">{{ title }}</div>

    <div class="actions" v-if="type === 'queue'">
      <div class="item" :class="item.uiClasses" v-for="item in items" :key="item.id">
        {{ item.name }}
      </div>
    </div>

    <div class="actions" v-if="type === 'building'"> 
      <div class="item" :class="showAction(item.key)" v-for="item in items" :key="item.key" @click.capture="toggleAction(item.key)">
        <div class="image"></div>
        <div class="content">
          <div class="title">
            <span class="name">{{ item.name }}</span>
            <span class="level">{{ getCurrentLevelByKey(item.key) }}</span>
          </div>
          
          <div class="production">
            <div class="resources">M: 100, C: 100, G: 000</div>
            <div class="time">Time: {{ convertToHumanFormat(planetBuildings.times[item.key]) }}</div>
          </div>

          <div class="button-group">
            <button class="button green" @click="upgradeAction(item.key)">Upgrade</button>
            <button class="button blue" @click="gotoActionInfo(item.name)">Info</button>
          </div>
        </div>
      </div>
    </div>

    <div class="actions" v-if="type === 'ship' || type === 'research'">
      <div class="item" v-for="item in items" :key="item.key">
        <div class="content">
        {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "ActionList",
  props: ["title", "type", "items"],
  data() {
    return {
      itemKey: ''
    }
  },
  methods: {
    ...mapActions(['upgradeItemOnPlanet']),
    toggleAction(itemKey) {
      if(this.itemKey === itemKey) {
        this.itemKey = "";
      }
      else {
        this.itemKey = itemKey;
      }
    },
    showAction(name) {
      return (this.itemKey === name) ? 'active' : '';
    },
    
    upgradeAction(key) {
      let payload = {
        type: this.upgradeType,
        key
      };

      this.upgradeItemOnPlanet(payload);
    },

    gotoActionInfo(name) {
      this.buildingName = name;
    },

        calcualateBasedOnLevel(building) {
      let baseTime = parseInt(building.base_build_time);
      let mod = parseFloat(building.build_time_mod);
      let level = parseInt(this.getCurrentLevelByKey(building.key));
      let time = baseTime;

      if(level > 0) {
        time *= (mod * level); 
      }

      let formatted = this.convertToHumanFormat(time);
      return formatted;
    },

    getCurrentLevelByKey(key) {
      if(this.planetBuildings){
        return this.planetBuildings.levels[key];
      }
    },

    convertToHumanFormat(time) {
      let seconds = Math.floor((time / 1000) % 60),
        minutes = Math.floor((time / (1000 * 60)) % 60),
        hours = Math.floor((time / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      if(hours === "00") {
        return `${minutes}m ${seconds}s`;
      }
      else {
        return `${hours}h ${minutes}m ${seconds}s`;
      }
    }
  },
  computed: {
    ...mapGetters(['planetBuildings']),
  }
}
</script>

<style>

</style>