<template>
    <section class="app-header">
        <div
            v-if="msgToSeller"
            class="msg-to-seller"
            :style="{top: msgToSellerY + 'px', left: (msgToSellerX -285)  + 'px' }"
        >
            <div class="user-container">
                <img class="user-img" :src="buyer.imgUrl"/>
                <p class="user-name">{{buyer.fullName}} ordered from you</p>
                <!-- <p class="user-name">Rani Karavani just ordered from you</p> -->
            </div>
            <button @click="close">x</button>
        </div>
        <router-link to="/">
            <span :class="isOnHome" @click="goToHome">
                <img
                    src="https://res.cloudinary.com/dobvwuisl/image/upload/v1595581028/dy5miswkx05lnpmf1ao1.png"
                    alt
                />
            </span>
        </router-link>
        <div v-if="isMenuOpen" @click="toggleMenu" class="screen"></div>

        <div class="mobil-container">
            <button @click="reset" class="bell-btn mobile" v-if="loggedinUser">
                    <i class="fas fa-bell"></i>
                    <div :class="{visible: numOfNoticications}" class="msg">{{numOfNoticications}}</div>
            </button>
            <button @click="toggleMenu" class="hamburger">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        <div class="router-header" :class="{openMenu: isMenuOpen}">
            <button @click="reset" class="bell-btn" v-if="loggedinUser">
                <i class="fas fa-bell"></i>
                <div :class="{visible: numOfNoticications}" class="msg">{{numOfNoticications}}</div>
            </button>
            <button v-if="loggedinUser" :class="isOnProfile" @click="goToProfile">My Profile</button>
            <button :class="isOnExperiences" @click="goToExperiences">Experiences</button>
            <router-link v-if="!loggedinUser" to="/login">
                <span @click="goToLogin" :class="isOnLogin">Login</span>
            </router-link>
            <!-- <router-link to="/login">logout</router-link> -->
            <div v-else class="log-user">
                <button class="logout-btn" @click="logout">logout</button>
            </div>
        </div>
    </section>
</template>

<script>
import socket from "../services/socket.service.js";

export default {
    name: "app-header",
    data() {
        return {
            activeLink: "home",
            msgToSeller: false,
            buyer: null,
            isMenuOpen: false,
            numOfNoticications: 0,
            msgToSellerX: 0,
            msgToSellerY: 0,
        };
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
        isOnHome() {
            return { active: this.activeLink === "home" };
        },
        isOnProfile() {
            return { active: this.activeLink === "profile" };
        },
        isOnLogin() {
            return { active: this.activeLink === "login" };
        },
        isOnExperiences() {
            return { active: this.activeLink === "experiences" };
        },
    },
    methods: {
        async logout() {
            let user = await this.$store.dispatch({ type: "logout" });
            this.$router.push("/login");
        },
        goToExperiences() {
            this.isMenuOpen = false;
            this.activeLink = "experiences";
            this.$store.commit({ type: "setFilter", filterBy: {} });
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
        close() {
            this.msgToSeller = false;
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        reset(ev) {
            this.msgToSellerX = ev.pageX;
            this.msgToSellerY = ev.pageY;
            this.numOfNoticications = 0;
            this.msgToSeller = true;
        },
    },
    created() {
        const loggedinuser = this.$store.getters.loggedinUser;
        if (!loggedinuser) return;
        socket.setup();
        socket.on(loggedinuser._id, (buyer) => {
            this.buyer = buyer;
            this.numOfNoticications++;
        });
    },
};
</script>



