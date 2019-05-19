export default {
  isAuthenticated(state) {
    return state.token != null && state.user != null;
  },
  currentUser(state) {
    return state.user;
  },
  token(state) {
    return state.token;
  },
};
