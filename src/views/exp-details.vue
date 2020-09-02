<template>
    <section v-if="exp" class="exp-details">
        <div class="exp-details-container">
            <div class="exp-details-header">
                <div class="exp-title-container">
                    <h4 class="exp-details-title">{{exp.title}}</h4>
                    <h5 class="exp-date">{{expDate}}</h5>
                </div>
                <div class="seller-top">
                    <div class="name-rate">
                        <h4>{{exp.createdBy.fullName}}</h4>
                        <p class="exp-rate">
                            <i class="el-icon-star-on"></i>
                            {{averageRate}} ({{exp.reviews.length}})
                        </p>
                    </div>
                    <router-link :to="'/user/'+ exp.createdBy._id">
                        <img class="seller-img" :src="exp.createdBy.imgUrl" />
                    </router-link>
                </div>
            </div>
            <div class="img-container">
                <img v-for="img in exp.imgUrls" :src="img" alt />
            </div>
            <h5 class="exp-details-shortDesc">{{exp.shortDesc}}</h5>
            <div class="exp-details-main">
                <div class="exp-descs-container">
                    <p class="exp-details-desc">{{exp.desc}}</p>
                    <p class="exp-details-desc">{{exp.desc1}}</p>
                    <p class="exp-details-desc">{{exp.desc2}}</p>
                    <p v-if="readMore" class="exp-details-desc">{{exp.desc3}}</p>
                    <p v-if="readMore" class="exp-details-desc">{{exp.desc4}}</p>
                    <p v-if="readMore" class="exp-details-desc">{{exp.desc5}}</p>
                    <p v-if="readMore" class="exp-details-desc">{{exp.desc6}}</p>
                    <p v-if="readMore" class="exp-details-desc">{{exp.desc7}}</p>
                    <button v-if="!readMore" @click.prevent="toggleMoreReading" class="show-hide-desc-btn">Read More...</button>
                    <button v-else class="show-hide-desc-btn" @click="toggleMoreReading">Hide...</button>
                </div>
                <exp-book @booking="booking" :exp="exp" />
            </div>
            <div class="exp-details-review-list">
                <p class="exp-rate">
                    <i class="el-icon-star-on"></i>
                    {{averageRate}} ({{exp.reviews.length}}) reviews
                </p>
                <ul v-if="exp.reviews.length > 0" class="review-list">
                    <exp-review v-for="review in expReviewsToShow" :key="review.id" :review="review" />
                </ul>
                <p v-else>No reviews have been got yet</p>
                <button @click.prevent="toggleReview" v-if="isHide" class="show-hide-review-btn">Show more...</button>
                <button @click="toggleReview" v-else class="show-hide-review-btn">Hide</button>
            </div>
            <div class="exp-details-guide-container">
                <div class="guide-details">
                    <router-link :to="'/user/'+ exp.createdBy._id">
                        <img class="seller-img" :src="exp.createdBy.imgUrl" />
                    </router-link>
                    <h4>{{exp.createdBy.fullName}}</h4>
                </div>
                <h4 class="exp-details-guide-info">{{exp.createdBy.info}}</h4>
                <p class="exp-rate">
                    <i class="el-icon-star-on"></i>
                    {{averageRate}} ({{exp.reviews.length}}) reviews
                </p>
            </div>
        </div>
    </section>
</template>
 
<script>
import { expService } from "../services/exp.service.js";
import expBook from "../components/exp-book.vue";
import expReview from "../components/exp-review.vue";
import socket from "../services/socket.service.js";
import moment from "moment";

export default {
    name: "exp-details",
    data() {
        return {
            exp: null,
            readMore: false,
            isHide : true,
        };
    },
    computed: {
        averageRate() {
            if (this.exp.reviews.length === 0) return;
            let sum = this.exp.reviews.reduce((acc, review) => {
                return acc + review.rate;
            }, 0);
            return (sum / this.exp.reviews.length).toFixed(1);
        },
        expDate() {
            return moment(this.exp.date).format("DD/MM/YY");
        },
        expReviewsToShow(){
            if(this.exp.reviews.length <= 6) return this.exp.reviews
            if(this.isHide) return this.exp.reviews.slice(0,6)
            return this.exp.reviews
        }
    },
    methods: {
        async booking(booked) {
            const user = this.$store.getters.loggedinUser;
            await this.$store.dispatch({
                type: "booking",
                booked,
                exp: this.exp,
                user,
            });
            const connectDetails = {
                sellerId: this.exp.createdBy._id,
                buyer: user,
            };
            socket.emit("booking", connectDetails);
        },
        toggleMoreReading() {
            this.readMore = !this.readMore;
        },
        toggleReview(){
            this.isHide = !this.isHide
        }
    },
    async created() {
        window.scrollTo(0, 0);
        const expId = this.$route.params.id;
        this.exp = await expService.getById(expId);
        socket.setup();
        socket.on("update exp", async (msg) => {
            this.exp = await expService.getById(expId);
        });
    },
    components: {
        expBook,
        expReview,
    },
};
</script>

