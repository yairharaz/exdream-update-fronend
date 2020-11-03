<template>
<div class="img-carousel">
    <carousel>
        <carousel-slide class="carousel-slider" v-for="(slide , index) in slides" :key="slide" :index="index">
            <img :src="slide" :alt="slide">
        </carousel-slide>
    </carousel>
</div>
</template>

<script>
import carousel from './carousel.vue';
import carouselSlide from './carousel-slide.vue';
export default {
    props:['imgUrls'],
    data() {
        return {
            slides: [
                'https://picsum.photos/id/236/600/300',
                'https://picsum.photos/id/232/600/300',
                'https://picsum.photos/id/230/600/300',
                'https://picsum.photos/id/231/600/300',
                'https://picsum.photos/id/233/600/300',
                'https://picsum.photos/id/234/600/300',
                'https://picsum.photos/id/235/600/300'
            ]
        }
    },
    components: {
        carousel,
        carouselSlide
    }
}
</script>