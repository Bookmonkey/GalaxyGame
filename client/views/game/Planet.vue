<template>
  <div class="planet">

    <div class="window">
      <img src="../../../public/assets/images/planet.jpg" width="100%" height="100%"/>
    </div>

    <div class="planet-navigation">
      <div class="tabs">
        <div class="item" :class="isTabActive('information')" @click="showTab('information')">Information</div>
        <div class="item" :class="isTabActive('buildings')" @click="showTab('buildings')">Buildings</div>
        <div class="item" :class="isTabActive('spaceport')" @click="showTab('spaceport')">Spaceport</div>
        <div class="item" :class="isTabActive('research')" @click="showTab('research')">Research lab</div>
      </div>

      <div class="resources list">
        <div class="resource-item minerals">Minerals: ({{ Math.round(planetResources.minerals, 4)}})</div>
        <div class="resource-item chemicals">
          Chemcials: ({{ Math.round(planetResources.chemicals, 4)}})
        </div>
        <div class="resource-item gases">
          Gases: ({{ Math.round(planetResources.gases, 4)}})
        </div>
        <div class="resource-item">
          Power: ({{ planetResources.energy }})

        </div>
      </div>
    </div>
    
    <div class="action-display" v-if="isLoaded">
    
      <InfoPanel v-if="activeTab === 'information'"></InfoPanel>
      <Buildings v-if="activeTab === 'buildings'"></Buildings>
      <SpacePort v-if="activeTab === 'spaceport'"></SpacePort>
      <ResearchLab v-if="activeTab === 'research'"></ResearchLab>
    </div>
  </div>
</template>

<script>
import InfoPanel from "../../components/Planet/InfoPanel";
import Buildings from "../../components/Planet/Buildings";
import SpacePort from "../../components/Planet/Spaceport";
import ResearchLab from "../../components/Planet/ResearchLab";
import { mapActions, mapGetters } from 'vuex';

import tippy, {roundArrow} from 'tippy.js';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/svg-arrow.css';

export default {
  name: "planet",
  components: {
    InfoPanel,
    Buildings,
    SpacePort,
    ResearchLab
  },
  data() {
    return {
      activeTab: '',
      resourceTimers: {
        minerals: 0,
      },

      expectedResources: {
        minerals: 0,
        chemicals: 0,
        gases: 0
      },
    }
  },
  mounted() {
    let query = this.$route.query;
    if(query.tab) {
      this.activeTab = query.tab;
    }
    else {
      this.activeTab = 'information';
    }   

    let mineLevel = this.buildingLevelByKey('mine');
    let chemicalLevel = this.buildingLevelByKey('chemical');
    let gasLevel = this.buildingLevelByKey('gas');

    this.resourceTimers.minerals = this.createTimer('minerals', mineLevel);
    this.resourceTimers.chemicals = this.createTimer('chemicals', chemicalLevel);
    this.resourceTimers.gases = this.createTimer('gases', gasLevel);

     tippy('.resource-item.minerals', this.createTooltip('minerals', mineLevel));
     tippy('.resource-item.chemicals', this.createTooltip('chemicals', chemicalLevel));
     tippy('.resource-item.gases', this.createTooltip('gases', gasLevel));
         
  },
  computed: {
    ...mapGetters(['isLoaded', 'planetResources', 'resourceStats', 'buildingLevelByKey']),
  },
  methods: {
    ...mapActions(['setCurrentPlanet']),

    createTimer(resourceKey, level) {
      return setInterval(() => {
        this.planetResources[resourceKey] += this.resourceStats[resourceKey].calculate(level) / 3600;
      }, 1000);
    },

    createTooltip(resourceKey, level) {
      return {
        content: `Hourly: ${Math.floor(this.resourceStats[resourceKey].calculate(level))} <br> Storage: 0`,
        allowHTML: true,
        theme: 'dark',
        placement: "bottom",
        animation: "scale",
        arrow: roundArrow
      }
    },

    isTabActive(tab) {
      return (tab === this.activeTab) ? 'active' : '';
    },

    showTab(newTab) {
      this.activeTab = newTab;
      this.$router.push({ path: this.$route.path, query: { tab: newTab } }); 
    }
  },
}
</script>

<style>
</style>
