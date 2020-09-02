<template>
    <section class="user-login">
      <form class="login-form" @submit.prevent="login">
        <input ref="input" class="login-user-name" type="text" placeholder="Please input user name" v-model="credentials.userName"/>
        <input class="login-password" type="password" placeholder="Please input password" v-model="credentials.password" show-password/>
        <button>Login</button>
      </form>
      <p>Not registered yet?</p>
      <button @click="signup">Sign Up!</button>
    </section>
</template>
<script>

import {userService} from '../services/user.service.js'
export default {
  data(){
    return {
      credentials: {
        userName: '',
        password: '',
      },
    }
  },
  methods: {
     login() {
      this.$store.dispatch({type: 'login', userCred: this.credentials})
      this.$router.push('/')
    },
    signup(){
        this.$router.push('/signup')
    }
  },
  mounted() {
    this.$refs.input.focus()
  },

}
</script>

<style>

</style>