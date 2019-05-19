/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

// Routes
import paths from './paths';

Vue.use(Router);

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('user/initAuth');
  if (to.path !== '/login' && !store.getters['user/isAuthenticated']) {
    next({
      path: '/login',
    });
  } else if ((to.path === '/' && store.getters['user/isAuthenticated']) || (to.path === '/login' && store.getters['user/isAuthenticated'])) {
    next({
      path: '/dashboard',
    });
  } else {
    next();
  }
});

export default router;
