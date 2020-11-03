<template>
<div id="app">
    <app-header />
    <router-view />
    <footer-app />
</div>
</template>

<script>
import appHeader from "./components/app-header.vue";
import footerApp from "./components/footer-app.vue";

export default {
    components: {
        appHeader,
        footerApp
    },

};
</script>
