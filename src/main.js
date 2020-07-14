import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VModal from 'vue-js-modal'

import VueTheMask from 'vue-the-mask'

Vue.use(VModal, {componentName: 'v-modal'})

Vue.use(VueTheMask)


library.add(fas, fab);

Vue.component('fa', FontAwesomeIcon);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
