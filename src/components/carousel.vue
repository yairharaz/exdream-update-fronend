<template>
<div class="carousel" @keydown="checkSlide($event)" tabindex="0">
    <slot></slot>
    <button @click.prevent="next" class="btn btn-next"><i class="fas fa-angle-right"></i></button>
    <button @click.prevent="prev" class="btn btn-prev"><i class="fas fa-angle-left"></i></button>
</div>
</template>

<script>
export default {
    props: ['imgIdx'],
    data() {
        return {
            index: 0,
            slidesLength: 5,
            slideDirection: '',
        }
    },
    methods: {
        next() {
            this.index++;
            if (this.index >= this.slidesLength) {
                this.index = 0;
            }
            this.slideDirection = 'slide-right';
        },
        prev() {
            this.index--;
            if (this.index < 0) {
                this.index = this.slidesLength - 1;
            }
            this.slideDirection = 'slide-left';
        },
        checkSlide(event) {
            if (event.keyCode === 39) {
                this.next();
            } else if (event.keyCode === 37) {
                this.prev();
            } else {
                return;
            }
        },
    },
    mounted() {
        this.index = this.imgIdx
    }
}
</script>
