<template>
  <div class="">

    <div class="action-category">Queue</div>
    <div class="actions">
      <div class="item">
        Mineral building lvl 3
      </div>
      <div class="item">
        Mineral building lvl 3
      </div>
      <div class="item disabled">
        Queue lvl 3 requires Construction Research lvl 5
      </div>
      <div class="item disabled">
        Queue lvl 4 requires Construction Research lvl 7
      </div>
    </div>


    
    <div class="action-category">Production</div>
    <div class="actions">
      <div class="item" :class="showAction(building.name)" v-for="building in buildings" :key="building.name" @click.capture="toggleActions(building.name)">
        <div class="image"></div>
        <div class="content">
          <div class="title">
            <span class="name">{{ building.name }}</span>
            <span class="level">{{ getCurrentLevelByKey(building.key) }}</span>
          </div>
          
          <div class="production">
            <div class="resources">M: 100, C: 100, G: 000</div>
            <div class="time">Time: {{ convertToHumanFormat(planetBuildings.times[building.key]) }}</div>
          </div>

          <div class="button-group">
            <button class="button green" @click="upgradeAction(building.key)">Upgrade</button>
            <button class="button blue" @click="gotoActionInfo(building.name)">Info</button>
          </div>
        </div>
      </div>
    </div>

    <div class="action-category">Services</div>
    <div class="action-category">Wonders</div>
    {{ planetInfo }}
    {{ planetBuildings }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Buildings',
  data() {
    return {
      upgradeType: 'building',
      buildingName: '',
    }
  },
  methods: {
    ...mapActions(['upgradeItemOnPlanet']),
    toggleActions(name) {
      if(this.buildingName === name) {
        this.buildingName = "";
      }
      else {
        this.buildingName = name;
      }
    },
    showAction(name) {
      return (this.buildingName === name) ? 'active' : '';
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
    ...mapGetters(['buildings', 'planetInfo', 'planetBuildings']),
  }
}
</script>

<style>
</style>