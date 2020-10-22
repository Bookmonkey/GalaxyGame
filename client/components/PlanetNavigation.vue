<template>
  <div class="left-sidebar">
    <router-link class="item" :class="isActivePage('/game/empire')" to="/game/empire">Empire view</router-link>
    
    <router-link class="item" :class="isActivePage(`/game/planet/${planet.id}`)" v-for="planet in getPlanets" :key="planet.id" :to="{ name: 'planet', params: { id: planet.id } }">
      {{ planet.planet_name }}
    </router-link>
    <router-link class="item" :class="isActivePage('/game/fleet')" to="/game/fleet">Fleet command</router-link>
    <router-link class="item" :class="isActivePage('/game/research')" to="/game/research">Research tree</router-link>
    <router-link class="item" :class="isActivePage('/game/starmap')" to="/game/starmap">Starmap</router-link>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "planet-navigation",
  data() {
    return {

    }
  },
  methods: {
    isActivePage(path){
      return (this.$route.path === path) ? 'active' : '';
    }
  },
  computed: {
    ...mapGetters(['getPlanets'])
  }
}
</script>

<style>

</style>