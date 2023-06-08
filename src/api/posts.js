import axios from './index';

export default {
  url: '/posts',
  getPosts() {
    return axios.get(this.url);
  },
};
