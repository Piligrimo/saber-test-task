import Vue from 'vue';
import Vuex from 'vuex';
import authApi from '../api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    toastMessage: '',
    isLoading: false,
  },
  getters: {
    isAuth(state) {
      return !!state.user?.id;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToast(state, message) {
      state.toastMessage = message;
    },
    setLoading(state, val) {
      state.isLoading = val;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const { data } = await authApi.register(payload.login, payload.password);
      const { password, ...user } = data;
      commit('setUser', user);
      localStorage.setItem('user', JSON.stringify(user));
    },

    async signIn({ commit }, payload) {
      const { data } = await authApi.signIn(payload.login, payload.password);
      if (!data.length) {
        throw new Error('Логин или пароль не верны');
      }
      const { password, ...user } = data[0];
      commit('setUser', user);
      localStorage.setItem('user', JSON.stringify(user));
    },

    async checkLogin(_, payload) {
      const { data } = await authApi.checkLogin(payload);
      if (data.length) {
        throw new Error('Логин уже занят');
      }
    },

    logOut({ commit }) {
      commit('setUser', null);
      localStorage.removeItem('user');
    },

    updateFromLocalStorage({ commit, getters }) {
      if (!getters.isAuth) {
        const user = JSON.parse(localStorage.getItem('user'));
        commit('setUser', user);
      }
    },
  },
});
