<template>
  <div class="">
    <action-list title="Class B" :type="'ship'" :items="ships.b"></action-list>
    <action-list title="Class A" :type="'ship'" :items="ships.a"></action-list>    
    <action-list title="Class S" :type="'ship'" :items="ships.s"></action-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActionList from "../../components/ActionList";
export default {
  name: 'SpacePort',
  components: {
    'action-list': ActionList
  },
  computed: {
    ...mapGetters(['ships']),
  }
}
</script>

<style>

</style>