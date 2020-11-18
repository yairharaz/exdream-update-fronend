import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import userLogin from '../views/user-login.vue'
import userSignup from '../views/user-signup.vue'
import userDetails from '../views/user-details.vue'
import expEdit from '../views/exp-edit.vue'
import expDetails from '../views/exp-details.vue'
import expApp from '../views/exp-app.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/exp',
    name: 'exp-app',
    component: expApp
  },
  {
    path: '/exp/edit/:id?',
    name: 'exp-edit',
    component: expEdit
  },
  {
    path: '/exp/:id',
    name: 'exp-details',
    component: expDetails
  },
  {
    path: '/user/:id?',
    name: 'user-details',
    component: userDetails
  },
  {
    path: '/login',
    name: 'user-login',
    component: userLogin
  },
  {
    path: '/signup',
    name: 'user-signup',
    component: userSignup
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
