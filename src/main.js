import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// Styles
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/styles.scss'


Vue.use(require('vue-moment'));
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
