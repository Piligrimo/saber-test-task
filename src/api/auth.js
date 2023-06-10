import axios from './index';

export default {
  url: '/users',
  signIn(login, password) {
    return axios.get(`${this.url}?login=${login}&password=${password}`);
  },
  checkLogin(login) {
    return axios.get(`${this.url}?login=${login}`);
  },
  register(login, password) {
    return axios.post(this.url, { login, password });
  },
};
