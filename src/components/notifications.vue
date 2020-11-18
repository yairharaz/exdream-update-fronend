<template>
<ul class="notifications-list">
    <li v-for="(notification,idx) in notifications" :key="notification.createdAt">
        <img class="image" :src="notification.imgUrl" />
        <div class="notification-time-desc">
            <p class="notification-time">{{notification.createdAt | moment("DD/MM/YYYY h:mm:ss a") }}</p>
            <p class="notification-desc">{{notification.desc}}</p>
        </div>
        <button class="notification-btn" @click="closeNotification(idx)">x</button>
    </li>
</ul>
</template>

<script>
export default {
    props: ['notifications'],
    methods: {
        closeNotification(idx) {
            this.$emit('close', idx)
        }
    },
}
</script>

<style>

</style>
