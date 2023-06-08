<template>
  <div class="home">
    <div v-for="post in posts" :key="post.id">
      <h3>{{post.title}}</h3>
    </div>
  </div>
</template>

<script>

import postsApi from '../api/posts';

export default {
  name: 'BlogPosts',
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    const { data } = await postsApi.getPosts();
    this.posts = data;
  },
};
</script>
