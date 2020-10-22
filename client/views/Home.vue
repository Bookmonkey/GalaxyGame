<template>
  <div class="homepage">
    <div class="container">
      <h1>Do you like <span class="underline">spreadsheets</span> and <span class="underline">space</span>? Then this game is for you!</h1>

      <router-link class="button login" to="/login">Login</router-link>
      <router-link class="button register" to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  data() {
    return {}
  },
  mounted() {

  }
}
</script>

<style>

</style>