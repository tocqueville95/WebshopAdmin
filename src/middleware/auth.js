import store from '../store';

export default {
  guest(to, from, next) {
    next();
  },

  auth(to, from, next) {
    store.dispatch('user/initAuth');
    next(store.getters['user/isAuthenticated'] ? true : {
      path: '/login',
      query: {
        redirect: to.name,
      },
    });
  },
};
