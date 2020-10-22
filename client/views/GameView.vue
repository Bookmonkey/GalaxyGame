<template>
  <div>

    <Navigation></Navigation>

    <div class="game">
      <PlanetNavigation></PlanetNavigation>

      <div class="ui">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from "../components/Navigation";
import PlanetNavigation from "../components/PlanetNavigation";

export default {
  name: "GameView",
  components: {
    Navigation,
    PlanetNavigation
  },
}
</script>

<style>

</style>