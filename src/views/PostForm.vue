<template>
  <div>
    <h1>{{isEdit ? 'Редактирование поста' : 'Новый пост'}} </h1>
    <div class="form">
      <p class="blog-label">Заголовок</p>
      <input class="form__title blog-input" v-model="post.title">
      <p class="blog-label">Текст</p>
      <label for="text">
        <textarea class="form__textarea blog-input" id="text" v-model="post.text" rows="8"/>
      </label>
      <div class="form__button-container">
        <button class="blog-button" @click="sendPost">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>

import postsApi from '../api/posts';

const clone = (obj) => JSON.parse(JSON.stringify(obj));

export default {
  name: 'PostForm',
  data() {
    return {
      post: {
        title: '',
        text: '',
      },
      initialPost: null,
    };
  },
  async created() {
    if (this.isEdit) {
      const { data } = await postsApi.getPostById(this.postId);
      this.post = data;
      this.initialPost = clone(data);
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'edit';
    },
    postId() {
      return this.$route.params.id;
    },
    isEdited() {
      return JSON.stringify(this.post) !== JSON.stringify(this.initialPost);
    },
  },
  methods: {

    async sendPost() {
      if (this.isEdit) {
        await postsApi.editPost(
          this.postId,
          {
            ...this.post,
            isEdited: this.isEdited ? true : this.post.isEdited,
          },
        );
      } else {
        await postsApi.createPost({
          ...this.post,
          time: new Date(),
        });
      }
      this.$router.push({ name: 'feed' });
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.form__textarea {
  width: calc(100% - 65px) ;
  resize: none;
  overflow: auto;
}

.form__button-container {
  text-align: right;
}
</style>
