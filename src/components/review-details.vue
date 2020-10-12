<template>
    <section class="review-details">
        <h2>Add Review</h2>
        <form class="add-review-form" @submit.prevent="saveReview">
            <el-input
                class="review-el-input"
                required
                type="textarea"
                :rows="2"
                placeholder="Please describe your experience"
                v-model="review.txt"
            ></el-input>
            <label>
                Rate:
                <el-select
                    class="rate-selector"
                    v-model="review.rate"
                    placeholder="Choose your rate"
                >
                    <el-option value="1">1</el-option>
                    <el-option value="2">2</el-option>
                    <el-option value="3">3</el-option>
                    <el-option value="4">4</el-option>
                    <el-option value="5">5</el-option>
                </el-select>
            </label>
            <div class="review-btn-container">
                <button type="button" @click="closeModal" class="btn-back btn">
                    &laquo; Back
                </button>
                <button class="btn-save btn" @click="closeModal">Save</button>
            </div>
        </form>
        <br />
    </section>
</template>

<script>
import { reviewService } from "../services/review.service.js";
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service.js";
export default {
    name: "review-details",
    data() {
        return {
            exp: null,
            review: {
                by: {
                    _id: "",
                    fullName: "",
                    imgUrl: "",
                },
                txt: "",
                rate: "",
                at: new Date().getTime(),
            },
        };
    },
    methods: {
        setUserData() {
            if (this.$store.getters.loggedinUser) {
                const {
                    _id,
                    fullName,
                    imgUrl,
                } = this.$store.getters.loggedinUser;
                this.review.by = { _id, fullName, imgUrl };
                // this.review.by = this.$store.getters.loggedinUser;
                console.log(this.review);
            } else {
                const { _id, fullName, imgUrl } = userService.getGuestUser();
                this.review.by = { _id, fullName, imgUrl };
            }
        },
        async saveReview() {
            if (!this.review.txt || !this.review.rate) return;
            this.review.rate = +this.review.rate;
            this.exp.reviews.push(this.review);
            await expService.update(this.exp);
        },
        closeModal() {
            this.$emit("closeModal");
        },
    },
    async created() {
        var expId = this.$route.params.id;
        this.exp = await expService.getById(expId);
        this.setUserData();
    },
};
</script>
    
