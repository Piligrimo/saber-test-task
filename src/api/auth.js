import axios from './index';

export default {
  url: '/users',
  signIn(login, password) {
    return axios.get(`${this.url}?login=${login}&password=${password}`);
  },
  register(login, password) {
    return axios.post(this.url, { login, password });
  },
};
