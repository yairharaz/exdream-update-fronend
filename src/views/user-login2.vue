<template>
<section>
    <h2>Login</h2>
    <p class="isInvalid" v-if="isInvalid">Invalid userName or password </p>

    <form @submit.prevent="save">
        <div class="label-input-container" :class="{ 'error': $v.userName.$error }">
            <label class="">userName</label>
            <input class="" v-model.trim="$v.userName.$model" />

            <span class="" v-if="!$v.userName.required && $v.userName.$dirty">* field is required</span>
        </div>

        <div class="label-input-container" :class="{ 'error': $v.password.$error }">
            <label class="">password</label>
            <input class="" v-model.trim="$v.password.$model" />

            <span class="" v-if="!$v.password.required && $v.password.$dirty">* field is required</span>
            <span class="" v-if="!$v.password.minLength">* password must have at least {{$v.password.$params.minLength.min}} letters.</span>
        </div>

        <input type="submit" value="save">
        <button type="button" @click="cancel">cansel</button>

    </form>

    <p>Not registered yet?</p>
    <button @click="signup">Sign Up!</button>

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
            // minLength: minLength(4)
        },
        password: {
            required,
            minLength: minLength(4)
        }
    },
    methods: {
        async save() {
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
    // created() {
    //     console.log(this.$v)
    // }

}
</script>

<style lang="scss" scoped>
section {
    margin: 300px auto 0;

    form {
        .label-input-container {
            display: flex;
            flex-direction: column;

            span {
                color: red;
            }
        }

        .error {
            input {
                box-shadow: 0 0 5px red;
                padding: 3px 0px 3px 3px;
                margin: 5px 1px 3px 0px;
                border: 1px solid red;
            }
        }

        input {
            &:focus {
                outline: none;
            }

        }

    }

    .isInvalid {
        color: red;
    }
}
</style>
