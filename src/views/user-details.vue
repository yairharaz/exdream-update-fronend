<template>
    <section class="user-details" v-if="user">
        <div class="user-details-container">
            <img
                class="user-details-img"
                v-if="user.imgUrl"
                :src="user.imgUrl"
            />
            <i v-else class="el-icon-user"></i>
            <div class="user-details-name-info">
                <h2>{{ user.fullName }}</h2>
                <p>{{ user.info }}</p>
            </div>
            <div class="add-exp-btn-container">
                <button class="add-exp-btn" @click="add">Add Activity</button>
            </div>
        </div>
        <div v-if="exps" class="orders-container">
            <div class="charts-container">
                <bar-chart :exps="exps" :width="300" :height="350"/>
                <doughnut-chart :exps="exps" />
            </div>
            <user-orders-table :exps="exps"/>
        </div>
        <h2 v-else> No experience Yet </h2>
        <button
            type="button"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            class="back-btn"
        >
            &laquo; Back
        </button>
    </section>
</template>



<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service.js";
import reviewDetails from "./review-details.vue";
import userOrdersTable from "../components/user-orders-table.vue";
import barChart from "../components/bar-chart.vue";
import doughnutChart from "../components/doughnut-chart.vue";

export default {
    name: "user-details",
    data() {
        return {
            exps: null,
            loggedinUser: null,
            user: null,
            ords: []
        };
    },
    edit(id) {
        this.$router.push(`/exp/edit/${id}`);
    },
    methods: {
        hasHistory() {
            return window.history.length > 2;
        },
        add() {
            this.$router.push("/exp/edit");
        },
        edit(id) {
            this.$router.push(`/exp/edit/${id}`);
        },
        writeReview(expId) {
            this.$router.push(`/order/${expId}`);
        },
        async remove(id) {
            try {
                await this.$store.dispatch({ type: "removeExp", id });
            } catch (err) {
                console.log("error:", err);
            }
        },
        async loadUser(userId) {
            this.loaded = false;
            this.user = await userService.getById(userId);
            this.loggedinUser = this.$store.getters.loggedinUser;
            try {
                 this.exps = await expService.getExps({ userId: userId });
            } catch (err) {
                console.log("ERROR: cannot find exps");
                throw err;
            }
        },
    },
    created() {
        const userId = this.$route.params.id;
        this.loadUser(userId);
    },
    components: {
        reviewDetails,
        barChart,
        doughnutChart,
        userOrdersTable
    },
};
</script>
    
  