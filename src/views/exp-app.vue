<template>
<section class="exp-app exp-main">

    <!-- <Carousel :data="data"></Carousel> -->

    <h2 class="app-title">choose an experience</h2>
    <exp-filter @setFilter="setFilter" />
    <exp-list v-if="exps" :exps="exps" :loggedinUser="loggedinUser" />
    <fade-loader v-else class="fade-loader" :loading="true" :radius="'100px'" :color="'#1e72e0'" :height="'40px'" :width="'5px'">
    </fade-loader>

    <paginate v-show="pageCount" :pageCount="pageCount" :clickHandler="paging" :prevText="'Prev'" :nextText="'Next'" :containerClass="'pagination'">
    </paginate>

</section>
</template>

<script>
import expList from "../components/exp-list.vue";
import expFilter from "../components/exp-filter.vue";

import fadeLoader from "vue-spinner/src/FadeLoader.vue";
import paginate from 'vuejs-paginate';

import {Carousel} from 'vue-carousel';

export default {
    name: "exp-app",
    data() {
        return {
            filterBy: {
                limit: 8,
                skip: 0
            },

            // data: [
            //     '<div class="example-slide">Slide 1</div>',
            //     '<div class="example-slide">Slide 2</div>',
            //     '<div class="example-slide">Slide 3</div>'
            // ],

        }
    },
    computed: {
        exps() {
            return this.$store.getters.exps;
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
        pageCount() {
            return Math.ceil(this.$store.getters.numOfAllExps / 8)
        }
    },
    methods: {
        setFilter(filterBy) {
            this.$store.commit({
                type: "setFilter",
                filterBy
            });
            this.$store.dispatch({
                type: "loadExps",
            });
        },
        paging(num) {
            this.$store.commit({
                type: "setExps",
                exps: null
            })
            this.filterBy.skip = (num - 1) * 8;
            this.setFilter({
                ...this.filterBy
            })
        }
    },
    created() {
        window.scrollTo(0, 0);
        this.setFilter({
            ...this.filterBy
        })
        this.$store.dispatch({
            type: "loadExps",
        });
        this.$store.dispatch({
            type: "loadNumOfAllExps"
        });
    },
    components: {
        expList,
        expFilter,
        fadeLoader,
        paginate,
        // Carousel
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

<style>
.example-slide {
    align-items: center;
    background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 10rem;
}
</style>
