<template>
  <div class="action-list-container">
    <action-list :title="'Queue'" :type="'queue'" :items="planetBuildingQueue"></action-list>


    <action-list :title="'Production'" :type="'building'" :items="buildings.resource"></action-list>
    <action-list :title="'Storage'" :type="'building'" :items="buildings.storage"></action-list>
    <action-list :title="'Services'" :type="'building'" :items="buildings.service"></action-list>    
    <action-list :title="'Wonders'" :type="'building'" :items="buildings.wonder"></action-list>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActionList from "../../components/ActionList";
export default {
  name: 'Buildings',
  components: {
    "action-list": ActionList
  },
  data() {
    return {
      upgradeType: 'building',
      buildingName: ''
    }
  },
  methods: {
  },

  computed: {
    ...mapGetters(['buildings', 'planetInfo', 'planetBuildings', 'planetBuildingQueue']),
  }
}
</script>

<style>
</style>