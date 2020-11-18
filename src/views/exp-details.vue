<template>
<section class="exp-details">
    <fade-loader class="fade-loader" :loading="loading" :radius="'100px'" :color="'#1e72e0'" :height="'40px'" :width="'5px'"></fade-loader>
    <div v-if="isModalOpen" class="screen"></div>

    <div class="img-carousel" v-if="isCarouselOpen">
        <carousel :imgIdx="imgIdx">
            <carousel-slide class="carousel-slider" v-for="(slide , index) in exp.imgUrls" :key="slide" :index="index">
                <img :src="slide" :alt="slide">
            </carousel-slide>
        </carousel>
        <button class="btn-close" @click="closeImgCarousel"><i class="fas fa-times"></i></button>
    </div>

    <div v-if="exp" class="exp-details-container">
        <div class="exp-details-header">
            <div class="exp-title-container">
                <h4 class="exp-details-title">{{ exp.title }}</h4>
                <h5 class="exp-date">{{ expDate }}</h5>
            </div>
            <div class="seller-top">
                <div class="name-rate">
                    <h4>{{ exp.createdBy.fullName }}</h4>
                    <p class="exp-rate">
                        <i class="el-icon-star-on"></i>
                        {{ averageRate }} ({{ exp.reviews.length }})
                    </p>
                </div>
                <router-link :to="'/user/' + exp.createdBy._id">
                    <img class="seller-img" :src="exp.createdBy.imgUrl" />
                </router-link>
            </div>
        </div>
        <div class="img-container">
            <img v-for="(img, idx) in exp.imgUrls" :key="idx" :src="img" @click="openImags(idx)" />
        </div>
        <h5 class="exp-details-shortDesc">{{ exp.shortDesc }}</h5>
        <div class="exp-details-main">
            <div class="exp-descs-container">
                <p v-if="!readMore" class="exp-details-desc">
                    {{ hideDesc }}
                </p>
                <p v-else class="exp-details-desc">{{ exp.desc }}</p>
                <a href="#" v-if="!readMore" @click.prevent="toggleMoreReading" class="show-hide-desc-btn">
                    Read More...
                </a>
                <button v-else class="show-hide-desc-btn" @click.prevent="toggleMoreReading">
                    Hide...
                </button>

            </div>
            <exp-book @booking="booking" :exp="exp" />
        </div>
        <div class="exp-details-review-list">
            <p class="exp-rate">
                <i class="el-icon-star-on"></i>
                {{ averageRate }} ({{ exp.reviews.length }}) reviews
            </p>
              <button class="add-review-btn" @click.prevent="toggleReviewModal">
                 Add Review <i class="fas fa-user-plus"></i>
            </button>
            <review-details  @saveReview="saveReview" v-show="isModalOpen" @closeModal="toggleReviewModal" />
            <ul v-if="exp.reviews.length > 0" class="review-list">
                <exp-review v-for="review in expReviewsToShow" :key="review.id" :review="review" />
            </ul>
            <p v-else>No reviews have been got yet</p>
            <a href="#" @click.prevent="toggleReview" v-if="isHide" class="show-hide-review-btn">
                Show More...
            </a>
            <button @click="toggleReview" v-else class="show-hide-review-btn">
                Hide...
            </button>
            </div>
        <div class="exp-details-guide-container">
            <div>
                <div class="guide-details">
                    <router-link :to="'/user/' + exp.createdBy._id">
                        <img class="seller-img" :src="exp.createdBy.imgUrl" />
                    </router-link>
                    <h4>{{ exp.createdBy.fullName }}</h4>
                </div>
                <h4 class="exp-details-guide-info">{{ exp.createdBy.info }}</h4>
                <p class="exp-rate">
                    <i class="el-icon-star-on"></i>
                    {{ averageRate }} ({{ exp.reviews.length }}) reviews
                </p>
            </div>
            <button title="Edit your experience" class="edit-exp-btn" @click.prevent="editExp">
                <i class="far fa-edit"></i>
            </button>
        </div>
    </div>
</section>
</template>

<script>
import {
    expService
} from "../services/exp.service.js";
import expBook from "../components/exp-book.vue";
import expReview from "../components/exp-review.vue";
import reviewDetails from "../components/review-details.vue";
import fadeLoader from "vue-spinner/src/FadeLoader.vue";
import socket from "../services/socket.service.js";
import moment from "moment";

import carousel from '../components/carousel.vue';
import carouselSlide from '../components/carousel-slide.vue'

export default {
    name: "exp-details",
    data() {
        return {
            exp: null,
            readMore: false,
            isHide: true,
            isModalOpen: false,
            imgIdx: 0,
            isCarouselOpen: false,
        };
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
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
        expReviewsToShow() {
            if (this.exp.reviews.length <= 6) return this.exp.reviews;
            if (this.isHide) return this.exp.reviews.slice(0, 6);
            return this.exp.reviews;
        },
        hideDesc() {
            return this.exp.desc.slice(0, 500) + "...";
        },
        loading() {
            return this.exp ? false : true;
        },
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
            const sellerId = this.exp.createdBy._id;
            socket.emit("booking", sellerId);
        },
        toggleMoreReading(ev) {
            this.readMore = !this.readMore;
            if (!this.readMore) window.scroll(0, 420);
        },
        toggleReview(ev) {
            this.isHide = !this.isHide;
            if (this.isHide) window.scroll(0, 730);
        },
        editExp() {
            this.$router.push(`/exp/edit/${this.exp._id}`);
        },
        toggleReviewModal() {
            this.isModalOpen = !this.isModalOpen;
        },
        openImags(idx) {
            this.imgIdx = idx;
            this.isCarouselOpen = true
        },
        closeImgCarousel() {
            this.isCarouselOpen = false
        },
        async saveReview(review) {
            await expService.addReview(this.exp, review, this.loggedinUser);
            const sellerId = this.exp.createdBy._id;
            socket.emit("review", sellerId);
            this.setExps();
        },
        async setExps() {
            const expId = this.$route.params.id;
            this.exp = await expService.getById(expId);
        }
    },
    created() {
        window.scrollTo(0, 0);
        this.setExps()

        socket.setup();
        socket.on("update exp", async (msg) => {
            this.exp = await expService.getById(expId);
        });
    },
    components: {
        expBook,
        expReview,
        reviewDetails,
        fadeLoader,
        carousel,
        carouselSlide
    },
};
</script>

<style>

</style>
