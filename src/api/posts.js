import axios from './index';

export default {
  url: '/posts',
  getPosts() {
    return axios.get(this.url);
  },
  createPost(post) {
    return axios.post(this.url, post);
  },

  deletePost(id) {
    return axios.delete(`${this.url}/${id}`);
  },
};
