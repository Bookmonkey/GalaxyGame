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
          <th>Minerals</th>
          <th>Chemicals</th>
          <th>Gas</th>
          <th>Power</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th>Mine - level 1</th>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <th>Synthesizers - level 1</th>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <th>Extractor - level 1</th>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <th>Plant - level 1</th>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <th>Artificat 1</th>
          <td>50</td>
          <td>50</td>
          <td>50</td>
          <td>50</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
        <th>Total (hour)</th>

        </tr>
        <tr>
        <th>Total (day)</th>

        </tr>
        <tr>
        <th>Total (week)</th>

        </tr>
      </tfoot>
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
      info: [],
    };
  },
  methods: { 
    ...mapActions(['renamePlanet', 'deletePlanet']),
  },
  computed: {
    ...mapGetters(['planetInfo']),
  }
}
</script>

<style>

</style>