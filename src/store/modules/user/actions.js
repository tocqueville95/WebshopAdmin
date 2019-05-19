/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import $axios from '../../../services/axios';

export default {
  authenticateUser({ commit }, authData) {
    return new Promise((resolve, reject) => {
      let authUrl = 'users/authenticate';
      if (!authData.isLogin) {
        authUrl = 'users';
      }
      return $axios
        .post(authUrl, {
          userName: authData.username,
          password: authData.password,
        })
        .then((result) => {
          commit('setUser', result.data);
          commit('setToken', result.data.token);
          this._vm.$cookies.set('jwt', result.data.token, { expires: 7 });
          this._vm.$cookies.set(
            'expirationDate',
            result.data.expires,
            { expires: 365 },
          );
          resolve();
        })
        .catch(e => reject(e));
    });
  },
  async initAuth({ commit, dispatch }) {
    const token = this._vm.$cookies.get('jwt');
    const expirationDate = this._vm.$cookies.get('expirationDate');
    if (new Date().getTime() > +expirationDate || !token) {
      await dispatch('logout');
      return false;
    }
    commit('setToken', token);
    const userUrl = 'users/currentuser';
    await $axios
      .get(userUrl)
      .then((result) => {
        commit('setUser', result.data);
        return true;
      })
      .catch(() => {
        commit('clearUser');
        return false;
      });
  },
  logout({ commit }) {
    commit('clearUser');
    this._vm.$cookies.remove('jwt');
    this._vm.$cookies.remove('expirationDate');
  },
};
