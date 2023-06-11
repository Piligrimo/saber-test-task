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
      <p v-if="errorMessage" class="blog-error">{{errorMessage}}</p>
      <div class="form__button-container">
        <button class="blog-button" @click="sendPost">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
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
      errorMessage: '',
      initialPost: null,
    };
  },
  async created() {
    if (this.isEdit) {
      try {
        this.setLoading(true);
        const { data } = await postsApi.getPostById(this.postId);

        if (data.author.id !== this.user.id) {
          this.$router.replace({ name: 'feed' });
        }

        this.post = data;
        this.initialPost = clone(data);
      } catch (e) {
        if (e.response?.status === 404) {
          this.$router.replace('/404');
        } else {
          this.renderToast('Произошла ошибка при загрузке поста');
        }
        console.error(e);
      } finally {
        this.setLoading(false);
      }
    }
  },
  computed: {
    ...mapState({ user: (state) => state.user }),
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
    ...mapMutations({
      renderToast: 'setToast',
      setLoading: 'setLoading',
    }),
    async sendPost() {
      this.errorMessage = '';
      const emptyFields = [];

      if (!this.post.title) emptyFields.push('заголовок');
      if (!this.post.text) emptyFields.push('текст');

      if (emptyFields.length) {
        this.errorMessage = `Введите ${emptyFields.join(' и ')} поста`;
        return;
      }

      try {
        this.setLoading(true);
        if (this.isEdit) {
          await postsApi.editPost(
            this.postId,
            {
              ...this.post,
              author: this.user,
              isEdited: this.isEdited ? true : this.post.isEdited,
            },
          );
        } else {
          await postsApi.createPost({
            ...this.post,
            author: this.user,
            time: new Date(),
          });
        }
        this.$router.push({ name: 'feed' });
      } catch (e) {
        this.renderToast('Произошла ошибка при отправке поста');
      } finally {
        this.setLoading(false);
      }
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
  margin-bottom: 0;
}

.form__button-container {
  text-align: right;
}
</style>
