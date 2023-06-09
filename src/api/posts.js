import axios from './index';

export default {
  url: '/posts',
  getPosts() {
    return axios.get(this.url);
  },
  getPostById(id) {
    return axios.get(`${this.url}/${id}`);
  },
  createPost(post) {
    return axios.post(this.url, post);
  },
  editPost(id, post) {
    return axios.put(`${this.url}/${id}`, post);
  },
  deletePost(id) {
    return axios.delete(`${this.url}/${id}`);
  },
};
