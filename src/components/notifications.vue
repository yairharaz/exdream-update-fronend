<template>
<!-- <section class="notifications" v-if="notifications.length" :style="{top: notificationsY + 'px', left: (notificationsX -285)  + 'px' }"> -->
<ul class="notifications-list">
    <li v-for="(notification,idx) in notifications" :key="notification.createdAt">
        <img class="image" :src="notification.imgUrl" />
        <p class="notification-desc">{{notification.desc}}</p>
        <p class="notification-time">{{notification.createdAt | moment("DD/MM/YYYY h:mm:ss a") }}</p>
        <button class="notification-btn" @click="closeNotification(idx)">x</button>
    </li>
</ul>
</template>

<script>
export default {
    props: ['notifications'],
    data() {
        return {

        }
    },
    methods: {
        closeNotification(idx) {
            this.$emit('close', idx)
        }
    },
    computed: {

    }
}
</script>

<style>

</style>
