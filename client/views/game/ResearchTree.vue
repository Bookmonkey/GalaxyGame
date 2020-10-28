<template>
  <div class="research">
    <div class="card">
      
      <action-list :title="'Ecomonic tree'" :type="'research'" :items="research.eco">        
    </div>
    <div class="card">
      <action-list :title="'Militaristic tree'"  :type="'research'" :items="research.militaristic">
    </div>
    <div class="card">      
      <action-list :title="'Other tree'" :type="'research'" :items="research.other">
    </div>
  </div>
</template>

<script>

// For svg lines between the research items
// https://stackoverflow.com/questions/49274176/how-to-create-a-curved-svg-path-between-two-points
import { mapGetters } from 'vuex'

import ActionList from "../../components/ActionList";
export default {
  name: "research",
  components: {
    'action-list': ActionList,
  },
  computed: {
    ...mapGetters(['research']),
  }
}
</script>

<style>

</style>