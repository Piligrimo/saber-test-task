<template>
  <div class="about">
    <h1>Новый пост</h1>
    <div class="form">
      <input v-model="title">
      <label for="text">
        <textarea class="form__textarea" id="text" v-model="text" rows="4"/>
      </label>
      <button @click="post">Отправить</button>
    </div>
  </div>
</template>

<script>

import postsApi from '../api/posts';

export default {
  name: 'NewPost',
  data() {
    return {
      title: '',
      text: '',
    };
  },
  methods: {
    async post() {
      await postsApi.createPost({
        title: this.title,
        text: this.text,
        time: new Date(),
      });
      this.$router.push({ name: 'feed' });
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}
.form__textarea {
  width: 100%;
  resize: none;
   overflow: auto;
}
</style>
