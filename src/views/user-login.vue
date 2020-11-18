<template>
<section class="user-login">
    <h2>Login</h2>
    <p class="isInvalid" v-if="isInvalid">Invalid username or password! </p>

    <form @submit.prevent="login">
        <div class="label-input-container" :class="{ 'error': $v.userName.$error }">
            <label class="">Username</label>
            <input class="" v-model.trim="$v.userName.$model" />

            <span class="" v-if="!$v.userName.required && $v.userName.$dirty">* field is required</span>
        </div>

        <div class="label-input-container" :class="{ 'error': $v.password.$error }">
            <label class="">Password</label>
            <input type="password" class="" v-model.trim="$v.password.$model" />

            <span class="" v-if="!$v.password.required && $v.password.$dirty">* field is required</span>
            <span class="" v-if="!$v.password.minLength">* password must have at least {{$v.password.$params.minLength.min}} letters.</span>
        </div>

        <button class="login-btn">Login</button>

    </form>

    <p>Not registered yet?</p>
    <button class="signup-btn" @click="signup">Sign-Up!</button>

</section>
</template>

<script>
import {
    required,
    minLength,
} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            userName: '',
            password: '',
            isInvalid: false
        }
    },
    validations: {
        userName: {
            required,
        },
        password: {
            required,
            minLength: minLength(4)
        }
    },
    methods: {
        async login() {
            this.$v.$touch();
            if (this.$v.$invalid) return
            try {
                await this.$store.dispatch({
                    type: 'login',
                    userCred: {
                        userName: this.userName,
                        password: this.password
                    }
                })
                this.$router.push('/')
            } catch (err) {
                if (err.response.data.error === "Invalid userName or password") {
                    this.isInvalid = true
                }
            }
        },

        cancel() {
            this.$router.push('/')
        },
        signup() {
            this.$router.push('/signup')
        }
    },
}
</script>
