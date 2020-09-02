<template>
    <section class="user-details" v-if="user">
        <div class="user-details-container">
            <img class="user-details-img" v-if="user.imgUrl" :src="user.imgUrl" />
            <i v-else class="el-icon-user"></i>
            <div class="user-details-name-info">
                <h2>{{user.fullName}}</h2>
                <p>{{user.info}}</p>
            </div>
            <div class="add-exp-btn-container">
                <button class="add-exp-btn" @click="add">Add Activity</button>
            </div>
        </div>

        <div class="user-order-activities">
            <!-- <div v-if="creator" class="orders-list-container">
        <h4>Orders:</h4>
        <ul class="orders-list">
          <li v-if="ords" class="order" v-for="ord in ords" :key="ord._id">
            <user-order @writeReview="writeReview" :ord="ord" />
          </li>
          <router-link v-else to="/exp">No Orders Yet, Go Choose The First One</router-link>
        </ul>
            </div>-->
        </div>

        <div v-if="exps" class="activities-list-container">
            <h4 class="activities-list-header">Activities:</h4>
            <table class="user-activity-table">
                <thead class="user-activity-thead">
                    <tr class="user-activity-tr">
                        <th colspan="2">Name</th>
                        <th>Experience Date</th>
                        <th>Number of Participants</th>
                        <th>Price/Person</th>
                        <th>Total Income</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody v-if="participantsTable">
                    <tr
                        class="user-activity-tr"
                        v-for="participant in participantsTable"
                        :key="participant._id"
                    >
                        <td class="img-cell">
                            <img class="participant-img" :src="participant.imgUrl" alt />
                        </td>
                        <td>{{participant.fullName}}</td>
                        <td class="center">{{participant.expDate | moment("DD/MM/YYYY")}}</td>
                        <td class="center">{{participant.numOfTickets}}</td>
                        <td class="center">{{participant.currPrice}}</td>
                        <td class="center">{{participant.numOfTickets * participant.currPrice}}</td>
                        <td
                            class="center"
                        >{{participant.createdAt | moment("DD/MM/YYYY, h:mm:ss a") }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <bar-chart
            class="chart"
            v-if="loaded"
            :cData="cData"
            :cLabels="cLabels"
            :width="300"
            :height="350"
        />
        <button
            type="button"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            class="back-btn"
        >&laquo; Back</button>
    </section>
</template>



<script>
import { expService } from "../services/exp.service.js";
import { userService } from "../services/user.service.js";
import reviewDetails from "./review-details.vue";
import { orderService } from "../services/order.service.js";
import userOrder from "../components/user-order.vue";
import barChart from "../components/bar-chart.vue";
import moment from "moment";

export default {
    name: "user-details",
    data() {
        return {
            exps: [],
            loggedinUser: null,
            user: null,
            ords: [],
            participantsTable: null,
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
                const userExps = await expService.getExps({ userId: userId });
                this.exps = userExps;

                let participantsTable = [];
                this.exps.forEach((exp) => {
                    exp.participants.forEach((participant) => {
                        participant.expDate = exp.date;
                        participant.currPrice = exp.currPrice;
                        participantsTable.push(participant);
                    });
                });
                participantsTable.sort((a, b) => {
                    return a.expDate - b.expDate;
                });
                this.participantsTable = participantsTable;
                const data = this.exps.map((exp) => {
                    const tickets = exp.participants.reduce(
                        (acc, participant) => {
                            return acc + participant.numOfTickets;
                        },
                        0
                    );
                    return tickets;
                });
                this.cData = data;
                const activities = this.exps.map((exp) => {
                    return exp.date;
                });
                activities.sort((a, b) => {
                    return new Date(a) - new Date(b);
                });
                this.cLabels = activities.map((activity) => {
                    return moment(activity).format("DD/MM/YY");
                });
                const totalNumTickets = data.reduce((acc, tickets) => {
                    return acc + tickets;
                }, 0);
                this.loaded = totalNumTickets > 0 ? true : false;
            } catch (err) {
                console.log("ERROR: cannot find exps");
                throw err;
            }
            const userOrds = await orderService.getOrders(userId);
            this.ords = userOrds;
        },
    },
    created(){
        const userId = this.$route.params.id;
        this.loadUser(userId)
    },
    components: {
        reviewDetails,
        userOrder,
        barChart,
    },
};
</script>
    
  