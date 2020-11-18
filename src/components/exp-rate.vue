<template>
<section class="star-rate">
        <p v-for="(star, idx) in stars" :key="star" @click="updatRate(idx)">
            <i v-if="(rate > idx)" class="fas fa-star"></i>
            <i v-if="(rate <= idx)" class="far fa-star"></i>
        </p>    
</section>
</template>

<script>


export default {
    name: "exp-rate",
    props: ['rate'],
    data() {
        return {
            stars: [0,1,2,3,4],
        }
    },
    methods: {
        updatRate(idx){
          this.$emit('updateRate' , idx)
        }
    },
    created() {
         console.log(this.rate)
    },
}
</script>
