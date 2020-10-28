<template>
<div class="info-panel">
  <div class="summary">
    <div class="title">Overview <button class="button default">Edit</button></div>
    <div class="form-field">
      <label for="name">Name: </label>
      {{ planetInfo.name }}
    </div>
    <div class="form-field">
      <label for="name">Type: </label>
      {{ planetInfo.type }}
    </div>

    <div class="form-field">
      <label for="temp">Temp: </label>
      {{ planetInfo.temp }}
    </div>
    <div class="form-field">
      <label for="temp">Artifacts: (1/5)</label>
    </div>
  </div>
  <div class="resources">
    <div class="title">Production stats</div>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Total (hour)</th>
          <th>Total (day)</th>
          <th>Total (week)</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th>Minerals Mine (lvl {{levels.mine}})</th>
          <td>{{ resources.mine.hourly }}</td>
          <td>{{ resources.mine.daily }}</td>
          <td>{{ resources.mine.monthly }}</td>
        </tr>
        <tr>
          <th>Chemical Synthesizer (lvl {{levels.chemical}})</th>
          <td>{{ resources.chemical.hourly }}</td>
          <td>{{ resources.chemical.daily }}</td>
          <td>{{ resources.chemical.monthly }}</td>
        </tr>
        <tr>
          <th>Gas Extractor (lvl {{levels.gas}})</th>
          <td>{{ resources.gas.hourly }}</td>
          <td>{{ resources.gas.daily }}</td>
          <td>{{ resources.gas.monthly }}</td>
        </tr>
        <tr>
          <th>Power Plant (lvl 1)</th>
          <td colspan="3">100</td>
        </tr>
        <tr>
          <th>Artificat 1</th>
          <td>50</td>
          <td>50</td>
          <td>50</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from "../../store";
export default {
  name: "InfoPanel",
  props: ["planetId"],
  data() {
    return {
      levels: {},
      resources: {
        mine: {},
        chemical: {},
        gas: {}
      }
    };
  },
  mounted() {
    this.levels = {

      mine: this.buildingLevelByKey('mine'),
        chemical: this.buildingLevelByKey('chemical'),
        gas: this.buildingLevelByKey('gas'),
    }
    this.resources.mine = this.formatProductionStats('mine', this.levels.mine);
    this.resources.chemical = this.formatProductionStats('chemical', this.levels.chemical);
    this.resources.gas = this.formatProductionStats('gas', this.levels.gas);
  },
  methods: { 
    ...mapActions(['renamePlanet', 'deletePlanet']),
    formatProductionStats(key, level) {
      return {
        hourly: Math.floor(this.resourceStats[key].calculate(level)),
        daily: Math.floor(this.resourceStats[key].calculate(level) * 24),
        monthly: Math.floor(this.resourceStats[key].calculate(level) *24 * 30)
      } 
    }
  },
  computed: {
    ...mapGetters(['planetInfo', 'resourceStats', 'buildingLevelByKey']),
  }
}
</script>

<style>

</style>