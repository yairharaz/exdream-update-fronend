<template>
    <section class="exp-app exp-main">
        <h2 v-if="exps" class="app-title">Choose an Experience</h2>
        <exp-filter v-if="exps" @setFilter="setFilter" />
        <exp-list v-if="exps" :exps="exps" :loggedinUser="loggedinUser" />
        <fade-loader
            v-else
            class="fade-loader"
            :loading="true"
            :radius="'100px'"
            :color="'#1e72e0'"
            :height="'40px'"
            :width="'5px'"
        ></fade-loader>
    </section>
</template>

<script>
import expList from "../components/exp-list.vue";
import expFilter from "../components/exp-filter.vue";
import fadeLoader from "vue-spinner/src/FadeLoader.vue";

export default {
    name: "exp-app",
    computed: {
        exps() {
            return this.$store.getters.exps;
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    methods: {
        setFilter(filterBy) {
            this.$store.commit({
                type: "setFilter",
                filterBy,
            });
            this.$store.dispatch({
                type: "loadExps",
            });
        },
    },
    created() {
        window.scrollTo(0, 0);
        this.$store.dispatch({
            type: "loadExps",
        });
    },
    components: {
        expList,
        expFilter,
        fadeLoader,
    },
};

// IF WE WONT TO DO CHANGE IN ALL ARRAY EXPS

// setTimeout(() => {

//     const exps1  = this.$store.getters.exps;
//     const exps = [...exps1]

//     exps.forEach(exp => {
//         exp.reviews.forEach( review => {
//             review.id = this.makeId();
//             console.log(exp)
//         })
//         this.$store.dispatch({ type: "saveExp" , exp});
//     })

// setTimeout(() => {
// console.log( )
//     const exps1 = this.$store.getters.exps;
//     const exps = [...exps1]

//     exps.forEach(exp => {
//         if (exp.date < Date.now()) exp.date += 2592000000
//         this.$store.dispatch({
//             type: "saveExp",
//             exp
//         })
//     })

// }, 2500)
</script>
