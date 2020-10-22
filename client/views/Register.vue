<template>
  <div class="register">
    <div class="container sm">
      <h2>Join the galaxy</h2>
      <div class="form">
        <div class="form-field">
          <label for="email">email</label>
          <input type="text" v-model="form.email">
        </div>
        <div class="form-field">
          <label for="username">Username</label>
          <input type="text" v-model="form.username">
        </div>
        <div class="form-field">
          <label for="password">password</label>
          <input type="text" v-model="form.password">
        </div>
        <div class="form-field">
          <label for="password">password</label>
          <input type="text" v-model="form.confirm_password">
        </div>

        <button @click="submitForm()">Register</button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      }
    }
  },

  methods: {
    submitForm() {
      fetch('http://localhost:3000/auth/create', {
        method: "POST",
        mode: "cors", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({
          email: this.form.email,
          username: this.form.username,
          password: this.form.password,
          confirm_password: this.form.confirm_password
        }), 
      })
      .then(res => res.json())
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

}
</script>

<style>

</style>
