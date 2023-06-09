import axios from './index';

export default {
  url: '/comments',
  getCommentsByPost(id) {
    return axios.get(`${this.url}?target.id=${id}&target.type=post`);
  },
  getAnwersByComment(id) {
    return axios.get(`${this.url}?target.id=${id}&target.type=comment`);
  },
  createComment(comment) {
    return axios.post(this.url, comment);
  },
};
