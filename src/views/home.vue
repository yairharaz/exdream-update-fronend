<template>
<section class="home-page">

    <div class="hero-img">
        <div class="welcome" v-if="loggedinUser">
            <h4 class="welcome-txt">Welcome</h4>
            <h4 class="welcome-txt">{{ loggedinUser.fullName }}</h4>
        </div>

        <div class="app-title">
            <h1 class="ex-dream">ExDream</h1>
            <h2>Outdoor experiences around the world</h2>
        </div>
        <div class="search-container">
            <input @change="searchExp" v-model="choosedType" list="exp-list" placeholder="Choose your next Experience" />
            <datalist id="exp-list">
                <option v-for="exptype in expTypes" :key="exptype" :value="exptype" />
            </datalist>

            <button class="search-btn" @click="searchExp">
                <i class="fas fa-search"></i>
            </button>
        </div>
    </div>

    <div v-if="bestDeals && popSki && inAsia" ref="cardsContainer" class="cards-container">
        <div class="type-container">
            <h2>Best Deals</h2>
            <button @click="goToExpApp({ sortBy: 'currPrice' })">
                See All
            </button>
        </div>
        <exp-list :exps="bestDealsToShow" />
        <div class="type-container">
            <h2>Popular Ski Experience</h2>
            <button @click="goToExpApp({ type: 'Ski' })">See All</button>
        </div>
        <exp-list :exps="popSkiToShow" />
        <div class="type-container">
            <h2>Popular In Asia</h2>
            <button @click="goToExpApp({ tags: ['Asia'] })">See All</button>
        </div>
        <exp-list :exps="inAsiaToShow" />
    </div>
    <fade-loader v-else class="fade-loader" :loading="true" :radius="'100px'" :color="'#1e72e0'" :height="'40px'" :width="'5px'"></fade-loader>
</section>
</template>

<script>
import expList from "../components/exp-list.vue";
import socket from "../services/socket.service.js";
import fadeLoader from 'vue-spinner/src/FadeLoader.vue';

export default {
    name: "Home-page",
    data() {
        return {
            imgUrls: [
                "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
                "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1537519646099-335112f03225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1529592322238-d80a7b20ae6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1524017718360-1c269e42276b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            ],
            data: [
                '<div class="example-slide">Slide 1</div>',
                '<div class="example-slide">Slide 2</div>',
                '<div class="example-slide">Slide 3</div>',
            ],
            expTypes: [
                "Ski",
                "Skydiving",
                "Bungee",
                "Diving",
                "Surffing",
                "Rock Climb",
                "Motorcross",
                "Rappeling",
            ],
            choosedType: null,
            bestDeals: null,
            popSki: null,
            inAsia: null,
            numOfCard: 2,
        };
    },
    computed: {
        bestDealsToShow() {
            return this.bestDeals.slice(0, this.numOfCard);
        },
        popSkiToShow() {
            return this.popSki.slice(0, this.numOfCard);
        },
        inAsiaToShow() {
            return this.inAsia.slice(0, this.numOfCard);
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    methods: {
        goToExpApp(filterBy) {
            this.$store.commit({
                type: "setFilter",
                filterBy: {
                    ...filterBy,
                    limit: 8,
                    skip: 0
                },
            });
            this.$router.push("/exp");
        },
        searchExp() {
            if (!this.choosedType) return;
            this.$store.commit({
                type: "setFilter",
                filterBy: {
                    type: this.choosedType,
                    limit: 8,
                    skip: 0
                },
            });
            this.$router.push("/exp");
        },
        getNumOfCard() {
            if (window.innerWidth > 1200) this.numOfCard = 4;
            else if (window.innerWidth > 960) this.numOfCard = 3;
            else if (window.innerWidth > 700) this.numOfCard = 2;
        },
        async getExps(filterBy) {
            filterBy.limit = 4;
            this.$store.commit({
                type: "setFilter",
                filterBy,
            });
            await this.$store.dispatch({
                type: "loadExps",
            });
            return this.$store.getters.exps;
        },
    },
    async created() {
        window.scrollTo(0, 0);
        this.getNumOfCard();

        window.addEventListener("resize", this.getNumOfCard);

        this.bestDeals = await this.getExps({
            sortBy: "currPrice",
        });
        this.popSki = await this.getExps({
            type: "Ski",
        });
        this.inAsia = await this.getExps({
            tags: ["Asia"],
        });
    },
    destroyed() {
        window.removeEventListener("resize", this.getNumOfCard, false);
        this.$store.commit({
            type: "setExps",
            exps: null
        });
    },
    components: {
        expList,
        fadeLoader
    },
};
</script>
