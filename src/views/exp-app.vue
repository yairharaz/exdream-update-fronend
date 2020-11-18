<template>
<section class="exp-app exp-main">

    <h2 class="app-title">choose an experience</h2>
    <exp-filter @setFilter="setFilter" />
    <exp-list v-if="exps" :exps="exps" :loggedinUser="loggedinUser" />
    <fade-loader v-if="!exps" class="fade-loader" :loading="true" :radius="'100px'" :color="'#1e72e0'" :height="'40px'" :width="'5px'">
    </fade-loader>

    <paginate v-if="pageCount" :pageCount="pageCount" :clickHandler="paging" :prevText="'Prev'" :nextText="'Next'" :containerClass="'pagination'">
    </paginate>
    <div class="no-exp" v-if="!pageCount && exps"> 
        <h3>Ooopss!</h3>  
        <h4>Not found any experience...</h4> 
    </div>

</section>
</template>

<script>
import expList from "../components/exp-list.vue";
import expFilter from "../components/exp-filter.vue";
import fadeLoader from "vue-spinner/src/FadeLoader.vue";
import paginate from "vuejs-paginate";

export default {
    name: "exp-app",
    data() {
        return {
            filterBy: {
                limit: 8,
                skip: 0
            },
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
            return Math.ceil(this.$store.getters.expsCount / 8);
        },
    },
    methods: {
        setFilter(filterBy ,pagingSkip = 0) {
            this.$store.commit({
                type: "setExps",
                exps: null,
            });
            this.filterBy = {
                ...this.filterBy,
                ...filterBy,
                skip: pagingSkip
               
            }
            this.$store.commit({
                type: "setFilter",
                filterBy: {
                    ...this.filterBy
                }
            });
            this.$store.dispatch({
                type: "loadExps",
            });
        },
        paging(num) {
            this.filterBy = {
                ...this.$store.getters.filterBy
            }
            const pagingSkip = (num - 1) * 8;
            this.setFilter({...this.filterBy} , pagingSkip);
            window.scrollTo(0, 0);
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
        paginate
    },
};


</script>
