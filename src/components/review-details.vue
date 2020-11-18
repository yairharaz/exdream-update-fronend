<template>
<section class="review-details">
    <h2>Add Review</h2>
    <form class="add-review-form" @submit.prevent="saveReview">
        <el-input class="review-el-input" required type="textarea" :rows="2" placeholder="Please describe your experience.." v-model="review.txt"></el-input>
       
        <exp-rate :rate="review.rate" @updateRate="updateRate"></exp-rate>

        <div class="review-btn-container">
            <button type="button" @click="closeModal" class="btn-back btn">
                &laquo; Back
            </button>
            <button class="btn-save btn">Save</button>
        </div>
    </form>
</section>
</template>

<script>
import {
    expService
} from "../services/exp.service.js";
import {
    userService
} from "../services/user.service.js";
import socket from '../services/socket.service.js';
import expRate from './exp-rate.vue'

export default {
    name: "review-details",
    data() {
        return {
            exp: null,
            review: {
                txt: "",
                rate: 1,
            },
        }
    },
    methods: {
        saveReview() {
            this.review.at = new Date().getTime();
            if (!this.review.txt || !this.review.rate) return;
            this.review.rate = +this.review.rate;
            this.$emit('saveReview', this.review)
            this.review = { txt: "",rate: 1};
            this.closeModal();
        },
        closeModal() {
            this.$emit("closeModal");
        },
        updateRate(idx){
           this.review.rate = idx + 1;
        }
    },
    components: {
        expRate,
    }
};
</script>
