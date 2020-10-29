<template>
  <div class="login">
    <div class="container sm">

    <h2>Login page</h2>

    <div class="form">
      <div class="alert" v-show="error.show">
        {{ error.message }}
      </div>

      <div class="form-field">
        <label for="username">Username</label>
        <input type="text" class="form-field" id="username" name="username" v-model="form.username" /> 
      </div>
      <div class="form-field">
        <label for="password">Password</label>
        <input type="password" class="form-field" id="password" name="password" v-model="form.password" /> 
      </div>

      <div class="form-field">
        <button class="button green" @click="loginSubmit()">Login</button>
        <button class="button default" @click="gotoRegister()">Register</button>
      </div>
    
    </div>
    
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
  name: "Login",

  data() {
    return {
      form: {
        username: 'a',
        password: 'a',
      },

      error: {
        show: false,
        message: '',
      }
    };
  },

  methods: {
    ...mapMutations(['setPlayerDetails']),
    gotoRegister() {
      this.$router.push({ 'path': 'register'});
    },
    loginSubmit() {
      fetch('http://localhost:3000/auth/login', {
        method: "POST",
        mode: "cors", 
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({
          username: this.form.username,
          password: this.form.password
        }), 
      })
      .then(res => {
        if(!res.ok){
          throw new Error("Incorrect username or password combination");
        }        
        return res.json();
      })
      .then((user, status) => {        
        this.setPlayerDetails(user);
        this.$router.push({ path: '/game/empire' });
      })
      .catch(error => {
        this.error = {
          show: true,
          message: error,
        };

        setTimeout(() => {
          this.error.show = false;
        }, 5000);
      });
    }
  }
}
</script>

<style>

</style>