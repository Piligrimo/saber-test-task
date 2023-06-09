<template>
  <div class="about">
    <h1>{{isEdit ? 'Редактирование поста' : 'Новый пост'}} </h1>
    <div class="form">
      <p class="form__label">Заголовок</p>
      <input class="form__title _input" v-model="post.title">
      <p class="form__label">Текст</p>
      <label for="text">
        <textarea class="form__textarea _input" id="text" v-model="post.text" rows="8"/>
      </label>
      <div class="form__button-container">
        <button class="form__button" @click="sendPost">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>

import postsApi from '../api/posts';

const clone = (obj) => JSON.parse(JSON.stringify(obj));

export default {
  name: 'PostView',
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
          title: this.title,
          text: this.text,
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

.form__label {
  color: #8194a7;
  margin-bottom: 5px;
  margin-left: 10px;
}

.form__button-container {
  text-align: right;
}

.form__button{
  cursor: pointer;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: 1px solid rgb(130, 130, 130);
  background-color: #fff;
  margin-top: 1rem ;
  border-radius: 20px;
  padding: 1rem 2rem;
  width: 200px;
  font-weight: 600;
  font-size: 16px;
  -webkit-box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
  -moz-box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
  box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
}

.form__button:hover {
  background-color: #f7f7f7;
}

._input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  padding: 1.2rem 2rem 1rem 2rem;
  margin-bottom: 1rem;
  -webkit-box-shadow: inset 4px 4px 9px 3px rgb(34 60 80 / 20%);
  -moz-box-shadow: inset 4px 4px 9px 3px rgb(34 60 80 / 20%);
  box-shadow: inset 4px 4px 9px 3px rgb(34 60 80 / 20%);
}
</style>
