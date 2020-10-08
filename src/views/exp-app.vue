<template>
<section class="exp-app exp-main">
    <h2 class="app-title">Choose an Experience</h2>

    <!-- <div class="hero-img">
    <img src="" alt="Loading...">
        </div>-->

    <exp-filter @setFilter="setFilter" />
    <exp-list :exps="exps" :loggedinUser="loggedinUser" />
</section>
</template>

<script>
import expList from "../components/exp-list.vue";
import expFilter from "../components/exp-filter.vue";

export default {
    name: "exp-app",
    computed: {
        exps() {
            return this.$store.getters.exps;
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        }
    },
    methods: {
        setFilter(filterBy) {
            this.$store.commit({
                type: "setFilter",
                filterBy
            });
            this.$store.dispatch({
                type: "loadExps"
            });
        },

        makeId(l = 7) {
            var text = "";
            var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < l; i++) {
                text += char_list.charAt(Math.floor(Math.random() * char_list.length));
            }
            return text;
        }
    },
    created() {
        window.scrollTo(0, 0);
        this.$store.dispatch({
            type: "loadExps"
        });

    },
    components: {
        expList,
        expFilter
    }
}

// IF WE WONT TO DO CHANGE UN ALL ARRAY EXPS

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
