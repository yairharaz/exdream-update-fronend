<template>
<section class="user-signup">

    <h2>Sign-Up</h2>

    <form @submit.prevent="signup">

        <div class="label-input-container" :class="{ 'error': $v.fullName.$error }">
            <label class="">FullName</label>
            <input class="" v-model.trim="$v.fullName.$model" />

            <span class="" v-if="!$v.fullName.required && $v.fullName.$dirty">* field is required</span>
            <span class="" v-if="!$v.fullName.minLength">* fullName must have at least {{$v.fullName.$params.minLength.min}} letters.</span>
        </div>

        <div class="label-input-container" :class="{ 'error': $v.email.$error }">
            <label class="">Email</label>
            <input class="" v-model.trim="$v.email.$model" />

            <span class="" v-if="!$v.email.required && $v.email.$dirty">* field is required</span>
            <span class="" v-if="!$v.email.email">* Email is required !</span>

        </div>

        <div class="label-input-container" :class="{ 'error': $v.userName.$error }">
            <label class="">Username</label>
            <input class="" v-model.trim="$v.userName.$model" />

            <span class="" v-if="!$v.userName.required && $v.userName.$dirty">* field is required</span>
            <span class="" v-if="!$v.userName.minLength">* userName must have at least {{$v.userName.$params.minLength.min}} letters.</span>
        </div>

        <div class="label-input-container" :class="{ 'error': $v.password.$error }">
            <label class="">Password</label>
            <input class="" v-model.trim="$v.password.$model" />

            <span class="" v-if="!$v.password.required && $v.password.$dirty">* field is required</span>
            <span class="" v-if="!$v.password.minLength">* password must have at least {{$v.password.$params.minLength.min}} letters.</span>
        </div>

        <button class="signup-btn">Sign-Up</button>
    </form>

    <button class="cansel" @click="cansel">Cansel</button>

</section>
</template>

<script>
import {
    required,
    minLength,
    email
} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            userName: '',
            password: '',
            email: '',
            fullName: ''

        }
    },
    validations: {
        fullName: {
            required,
            minLength: minLength(6)
        },
        email: {
            required,
            email
        },
        userName: {
            required,
            minLength: minLength(4)
        },
        password: {
            required,
            minLength: minLength(4)
        },

    },
    methods: {
        async signup() {
            this.$v.$touch();
            if (this.$v.$invalid) return
            try {
                await this.$store.dispatch({
                    type: 'signup',
                    userCred: {
                        userName: this.userName,
                        password: this.password,
                        email: this.email,
                        fullName: this.fullName
                    }
                })
                this.$router.push('/')
            } catch (err) {
                console.log(err)
            }
        },
        cansel() {
            this.$router.push('/')
        }
    }
}
</script>

