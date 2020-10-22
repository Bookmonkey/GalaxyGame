<template>
  <div class="empire">

    <div class="card">
      Empire

      <h5>Eco</h5>
      <table class="table">
        <thead>
          <tr>
            <th>Planet</th>
            <th>Minerals</th>
            <th>Chemicals</th>
            <th>Gases</th>
            <th>Total power</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="planet in getPlanets" :key="planet.planet_name">
            <td>{{ planet.planet_name }}</td>
            <td>{{ planet.minerals }}</td>
            <td>{{ planet.chemicals }}</td>
            <td>{{ planet.gases }}</td>
            <td>{{ planet.energy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
      
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Empire",
  data() {
    return {};
  },

  methods: {
    ...mapActions(["createPlanet"]),
    addPlanet() {
      this.createPlanet();
    }
  },
  computed: {
    ...mapGetters(['getPlanets']),
  }
};
</script>

<style>
</style>