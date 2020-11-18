<template>
  <section>
    <table class="user-order-table">
      <thead class="user-order-thead">
        <tr class="user-order-tr">
          <th>Experience Name</th>
          <th>Experience Date</th>
          <th>Order Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ord.exp.title}}</td>
          <td class="center">{{expDate}}</td><td>{{ order.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
        </tr>
      </tbody>
    </table>
    <p>{{ord.exp.title}}</p>
    <button @click="writeReview(ord.exp._id)">
      <i class="el-icon-edit-outline">Add review</i>
    </button>
    <ul class="ord-location-date">
      <li>{{ord.exp.location}}</li>
      <li>{{expDate}}</li>
    </ul>
  </section>
</template>

<script>
import moment from "moment";
export default {
  props: ["ord"],
  name: "user-order",
  computed: {
    datePass() {
      return Date.now() > this.ord.exp.date;
    },
    expDate() {
      return moment(this.ord.exp.date).format("DD/MM/YY");
    },
  },
  methods: {
    writeReview(expId) {
      this.$emit("writeReview", expId);
    },
  },
};
</script>