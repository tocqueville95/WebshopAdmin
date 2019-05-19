/* eslint-disable import/no-unresolved */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Components
import './components';

// Plugins
import './plugins';

// Sync router with store
import { sync } from 'vuex-router-sync';

// Application imports
import VueCookies from 'vue-cookies';
import App from './App';
import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';
import $axios from '@/services/axios';

Vue.use(VueCookies);

Vue.prototype.$axios = $axios;

// Sync store with router
sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
