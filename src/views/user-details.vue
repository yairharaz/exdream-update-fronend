<template>
    <section class="user-details" v-if="user">
    <button
            type="button"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            class="back-btn"
            title="back"
        >
            <i class="fas fa-arrow-left"></i>
        </button>
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
                <bar-chart class="bar-chart" :exps="exps" :width="300" :height="400"/>
                <doughnut-chart class="doughnut-chart" :exps="exps" />
            </div>
            <user-orders-table :exps="exps"/>
        </div>
        <h2 v-else> No experience Yet </h2>
        
    </section>
</template>



<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service.js";
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
                 
                const res = await expService.getExps({ userId: userId });
                this.exps = res.exps
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
        barChart,
        doughnutChart,
        userOrdersTable
    },
};
</script>
    
  