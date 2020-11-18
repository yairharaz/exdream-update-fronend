<template>
  <li class="exp-review">
    <div class="reviewer-container-wraper">
      <img
        class="reviewer-img"
        :src="review.by.imgUrl"
        style="width: 50px; height: 50px; border-radius: 50%"
      />
      <div class="reviewer-container">
        <p>{{review.by.fullName}}</p>
        <p class="review-date">{{date}}</p>
      </div>
    </div>
    <p class="review-txt">{{review.txt}}</p>
     <exp-rate class="star-rate" :rate="review.rate" />
  </li>
</template>

<script>
import moment from "moment";
import expRate from './exp-rate.vue';


export default {
  name: "exp-review",
  props: ["review"],
  data() {
    return {};
  },
  computed: {
    date() {
      return moment(this.review.at).format("MMMM YYYY");
    },
  },
  components: {
    expRate
  }
};
</script>