<template>
<section class="review-details">
    <h2>Add Review</h2>
    <form class="add-review-form" @submit.prevent="saveReview">
        <el-input class="review-el-input" required type="textarea" :rows="2" placeholder="Please describe your experience.." v-model="review.txt"></el-input>
        <div class="star-rate">
        <p v-for="(star, idx) in stars" :key="star" @click="rate(idx)">
            <i v-if="(review.rate > idx)" class="fas fa-star"></i>
            <i v-if="(review.rate <= idx)" class="far fa-star"></i>
        </p>
        </div>
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
import socket from '../services/socket.service.js'

export default {
    name: "review-details",
    data() {
        return {
            exp: null,
            review: {
                txt: "",
                rate: 1,

            },
            stars: [0,1,2,3,4],
        };
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
        rate(idx){
           this.review.rate = idx + 1;
        }
    },
    created() {

    },
};
</script>
