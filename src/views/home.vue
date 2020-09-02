<template>
    <section class="home-page">
        <div class="hero-img"> 
            <div class="welcome" v-if="loggedinUser">
            <h4 class="welcome-txt">Welcome </h4>
            <h4 class="welcome-txt">{{loggedinUser.fullName}}</h4>
            </div>
            <div class="app-title">  
              <h1 class="ex-dream">ExDream</h1>  
              <h2>Outdoor experiences around the world</h2>  
            </div>
          <div class="search-container">
                <input @change="searchExp" v-model="choosedType" list="exp-list" placeholder="Choose your next Experience"/>
                <datalist  id="exp-list">
                    <option  v-for="type in expTypes" :key="type" :value="type" />
                </datalist>
          
            <button class="search-btn" @click="searchExp"><i class="fas fa-search"></i> </button>
          </div>
            
        </div>
        <div ref="cardsContainer" class="cards-container">

            <div class="type-container">
                <h2>Best Deals</h2>
                <button @click="goToExpApp({ sortBy: 'currPrice'})">See All</button>
            </div>
            <exp-list v-if="bestDeals" :exps="bestDealsToShow" />
            <div class="type-container">
                <h2>Popular Ski Experience</h2>
                <button @click="goToExpApp({ type: 'Ski'})">See All</button>
            </div>
            <exp-list v-if="popSki" :exps="popSkiToShow" />
            <div class="type-container">
                <h2>Popular In Asia</h2>
                <button @click="goToExpApp({ tags : ['Asia']})">See All</button>
            </div>
            <exp-list v-if="inAsia" :exps="inAsiaToShow" />
        </div>
   </section> 
</template>

<script>

import expList from "../components/exp-list.vue";
import socket from "../services/socket.service.js";

export default {
    name: "Home-page",
    data() {
        return {
            expTypes: ['Ski', 'Skydiving' ,'Bunjee' ,'Diving' , 'Surffing' ,'Rock Climb','Motorcross' ,'Rappeling'],
            choosedType: null,
            bestDeals: null,
            popSki: null,
            inAsia: null,
            numOfCard: 2,
        };
    },
    computed: {
       bestDealsToShow(){
           return this.bestDeals.slice(0, this.numOfCard)
       },
       popSkiToShow(){
           return this.popSki.slice(0, this.numOfCard)
       },
       inAsiaToShow(){
           return this.inAsia.slice(0, (this.numOfCard))
       },
       loggedinUser(){
           return this.$store.getters.loggedinUser
       }
    },
    methods:{
        goToExpApp(filterBy){
          this.$store.commit({type: 'setFilter' , filterBy });
          this.$router.push('/exp');
        },
        searchExp(){
            if(!this.choosedType) return 
            this.$store.commit({type: 'setFilter' , filterBy : {type: this.choosedType}});
            this.$router.push('/exp');
        },
        getNumOfCard(){
            if(window.innerWidth > 1200) this.numOfCard = 4;
            else if (window.innerWidth > 960)  this.numOfCard = 3;  
            else if (window.innerWidth > 700)  this.numOfCard = 2;  
        },
        async getExps(filterBy){
            filterBy.limit = 4;
            this.$store.commit({ type : "setFilter" , filterBy });
            await this.$store.dispatch({ type: "loadExps" });
            return this.$store.getters.exps;
        },
    },
    async created() {
        window.scrollTo(0,0);
        this.getNumOfCard()
        window.addEventListener("resize", ()=> {
          this.getNumOfCard()
        });
        this.bestDeals = await this.getExps({sortBy : 'currPrice'});
        this.popSki = await this.getExps({type : 'Ski'});
        this.inAsia = await this.getExps({tags : ['Asia']});
    },
    components: {
        expList
    },
};
</script>


