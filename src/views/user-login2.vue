<template>
<form @submit.prevent="save">
    <div class="label-input-container" :class="{ 'error': $v.userName.$error }">
        <label class="">userName</label>
        <input class="" v-model.trim="$v.userName.$model" />

        <span class="" v-if="!$v.userName.required && $v.userName.$dirty">* field is required</span>
        <span class="" v-if="!$v.userName.minLength">* userName must have at least {{$v.userName.$params.minLength.min}} letters.</span>
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
</template>

<script>
import {
    required,
    minLength,
    between
} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    validations: {
        userName: {
            required,
            minLength: minLength(4)
        },
        password: {
            required,
            minLength: minLength(4)
        }
    },
    methods: {
        save() {
            this.$v.$touch();
            if (this.$v.$invalid) return

            // console.log('this.$v: ', this.$v);
            // console.log('userName: ', this.$v.userName);
            // console.log('password: ', this.$v.password);
        },
        cancel() {
            console.log('cansel')
        }
    },

}
</script>

<style lang="scss" scoped>
form {
    margin: 300px auto;

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

    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid rgba(81, 203, 238, 1);
}
</style>
