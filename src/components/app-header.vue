<template>
<section class="app-header">

    <notifications v-if="isNotificationsListOpen" :notifications="notifications" @close="closeNotification" :style="{top: '53px', left: notificationsX  + 'px' }" />

    <router-link to="/">
        <span :class="isOnHome" @click="goToHome">
            <img src="img/icons/logo.png" alt="" />
        </span>
    </router-link>
    <div v-if="isMenuOpen" @click="toggleMenu" class="screen"></div>

    <!-- MOBILE -->
    <div class="mobile-container">
        <button @click="showNotificationsList" class="bell-btn mobile" v-if="loggedinUser">
            <i class="fas fa-bell"></i>
            <div :class="{visible: notifications.length}" class="msg">{{notifications.length}}</div>
        </button>
        <button @click="toggleMenu" class="hamburger">
            <i class="fas fa-bars"></i>
        </button>
    </div>

    <!-- DESKTOP -->
    <div class="router-header" :class="{openMenu: isMenuOpen}">
        <button @click="showNotificationsList" class="bell-btn" v-if="loggedinUser">
            <i class="fas fa-bell"></i>
            <div :class="{visible: +notifications.length}" class="msg">{{notifications.length}}</div>
        </button>
        <button v-if="loggedinUser" :class="isOnProfile" @click="goToProfile">My Profile</button>
        <button :class="isOnExperiences" @click="goToExperiences">Experiences</button>
        <router-link v-if="!loggedinUser" to="/login">
            <span class="login-router" @click="goToLogin" :class="isOnLogin">Login</span>
        </router-link>
        <div v-else class="log-user">
            <button class="logout-btn" @click="logout">logout</button>
        </div>
    </div>

</section>
</template>

<script>
import socket from "../services/socket.service.js";
import notifications from "./notifications.vue"

export default {
    name: "app-header",
    data() {
        return {
            activeLink: "home",
            isMenuOpen: false,
            notificationsX: 0,
            isNotificationsListOpen: false
        };
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
        isOnHome() {
            return {
                active: this.activeLink === "home"
            };
        },
        isOnProfile() {
            return {
                active: this.activeLink === "profile"
            };
        },
        isOnLogin() {
            return {
                active: this.activeLink === "login"
            };
        },
        isOnExperiences() {
            return {
                active: this.activeLink === "experiences"
            };
        },
        notifications() {
            return this.$store.getters.loggedinUser.notifications;
        }
    },
    methods: {
        async logout() {
            let user = await this.$store.dispatch({
                type: "logout"
            });
            this.$router.push("/login");
        },
        goToExperiences() {
            this.isMenuOpen = false;
            this.activeLink = "experiences";
            this.$store.commit({
                type: "setFilter",
                filterBy: {
                    limit: 8,
                    skip: 0
                }
            });
            this.$router.push("/exp");
        },
        goToHome() {
            this.activeLink = "home";
            this.isMenuOpen = false;
        },
        goToProfile() {
            this.activeLink = "profile";
            this.isMenuOpen = false;
            this.$router.push(`/user/${this.loggedinUser._id}`);
        },
        goToLogin() {
            this.activeLink = "login";
            this.isMenuOpen = false;
        },
        closeNotification(idx) {
            const loggedinUser = JSON.parse(JSON.stringify(this.loggedinUser));
            loggedinUser.notifications.splice(idx, 1);
            this.$store.dispatch({
                type: "updateUser",
                user: loggedinUser
            })
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        showNotificationsList(ev) {
            this.notificationsX = ev.pageX -250;
            this.isNotificationsListOpen = !this.isNotificationsListOpen
        },
    },
    created() {
        if (!this.loggedinUser) return;
        socket.setup();
        socket.on(this.loggedinUser._id, () => {
            this.$store.dispatch({
                type: "loadLoggedinUser",
            })
        });
    },
    components: {
        notifications
    }
};
</script>
