<template>
    <section class="user-signup">
      <h1>Signup:</h1>
      <form class="signup-form" @submit.prevent="signup">
        <el-input placeholder="Please insert Full Name" v-model="credentials.fullName"></el-input>
        <el-input placeholder="Please insert Email" v-model="credentials.email"></el-input>
        <el-input placeholder="Please insert User Name" v-model="credentials.userName"></el-input>
        <el-input placeholder="Please insert Password" v-model="credentials.password" show-password></el-input>
        <button>Signup</button>
      </form>
    </section>
</template>
<script>

export default {
  data(){
    return {
      credentials: 
      {
        userName: '',
        password: '',
        email: null,
        fullName: null
      },
    }
  },
  methods: {
    async signup(){
        let user = await this.$store.dispatch({type: 'signup', userCred: this.credentials})
        this.$router.push('/exp')
    }
  }
}
</script>

<style>

</style>