<template>
  <section class="review-details">
    <form @submit.prevent="saveReview">
        <label>
        Please enter your experience:
        <el-input
          class="el-input"
          required
          type="textarea"
          :rows="2"
          placeholder="Please enter your experience"
          v-model="review.txt"
        ></el-input>
      </label>
      <label>
        Rate:
        <el-select class="rate-selector" v-model="review.rate" placeholder="Choose your rate">
          <el-option value="1">1</el-option>
          <el-option value="2">2</el-option>
          <el-option value="3">3</el-option>
          <el-option value="4">4</el-option>
          <el-option value="5">5</el-option>
        </el-select>
      </label>
      <button class="btn-save">Save</button>
    </form>
    <button
            type="button"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            class="btn-back"
        >&laquo; Back</button>
    <br />
  </section>
</template>

<script>
import {reviewService} from '../services/review.service.js'
import {expService} from '../services/exp.service.js'
export default {
  name: "review-details",
  data() {
    return {
        exp: null,
      loggedinUser: '',
      review: {
        by: {
          _id: '',
          fullName: '',
          imgUrl: ''
        },
        txt: '',
        rate: '',
        at: new Date().getTime()
      }
    };
  },
  methods: {
    setUserData() {
      this.review.by._id = this.loggedinUser._id;
      this.review.by.fullName = this.loggedinUser.fullName;
      this.review.by.imgUrl = this.loggedinUser.imgUrl;
    },
    async saveReview() {
      if (!this.review.txt || !this.review.rate) return;
      this.review.rate = +this.review.rate
      this.exp.reviews.push(this.review)
      await expService.update(this.exp);
      this.$router.push(`/user/${this.review.by._id}`);
    },
    hasHistory() {
      return window.history.length > 2;
    }
  },
  async created() {
    var expId = this.$route.params.id;
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.exp = await expService.getById(expId);
    this.setUserData();
  }
};
</script>
    
