import Vue from 'vue'
import Vuex from 'vuex'
import {userService} from '../services/user.service.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

Vue.use(Vuex)

export const userStore = {
    strict: true,
    state: {
        loggedinUser: localLoggedinUser, 
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUser(state, { user }) {
            sessionStorage.user = JSON.stringify(user)
            state.loggedinUser = user;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            const user = await userService.login(userCred);
            commit({ type: 'setUser', user })
            return user;
        },
        async signup({ commit }, { userCred }) {
            const user = await userService.signup(userCred);
            commit({ type: 'setUser', user })
            return user;
        },
        async logout({ commit }) {
            await userService.logout()
            commit({ type: 'setUser', user: null })
        },
        async removeUser({ commit }, { userId }) {
            await userService.remove(userId);
            commit({ type: 'removeUser', userId })
        },
        async updateUser({ commit }, { user }) {
            user = await userService.update(user);
            commit({ type: 'setUser', user })
        },
        async loadLoggedinUser({ commit ,state}) {
            const user = await userService.getById(state.loggedinUser._id);
            commit({ type: 'setUser', user })
        },
    },
}
