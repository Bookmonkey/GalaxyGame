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
        <div class="item">Minerals: ({{ Math.round(expectedResources.minerals, 4)}})</div>
        <div class="item">Chemcials: ({{ Math.round(expectedResources.chemicals, 4)}})</div>
        <div class="item">Gases: ({{ Math.round(expectedResources.gases, 4)}})</div>
        <div class="item">Power: ({{ planetResources.energy }})</div>
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


    this.expectedResources = {
      minerals: parseFloat(this.planetResources.minerals),
      chemicals: parseFloat(this.planetResources.chemicals),
      gases: parseFloat(this.planetResources.gases),
    };
    

    // // create timers
    this.resourceTimers.minerals = setInterval(() => {
      let level = this.buildingLevelByKey('mine');
      this.expectedResources.minerals += this.resourceStats.mine.calculate(level) / 3600;
    }, 1000);

    this.resourceTimers.chemicals = setInterval(() => {
      let level = this.buildingLevelByKey('chemical');
      console.log(level);
      this.expectedResources.chemicals += this.resourceStats.chemical.calculate(level) / 3600;
    }, 1000);

    this.resourceTimers.gases = setInterval(() => {
      let level = this.buildingLevelByKey('gas');
      this.expectedResources.gases += this.resourceStats.gas.calculate(level) / 3600;
    }, 1000);

    
  },
  computed: {
    ...mapGetters(['isLoaded', 'planetResources', 'resourceStats', 'buildingLevelByKey']),
  },
  methods: {
    ...mapActions(['setCurrentPlanet']),

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
