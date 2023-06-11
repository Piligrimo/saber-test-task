<template>
  <div class="feed">
    <h1>Лента</h1>
    <div class="new">
      <router-link :to="{name: 'new'}">
       <img
          class="new__icon"
          :src="newIcon"
          alt="Новый пост"
        />
      </router-link>
    </div>

    <template v-if="posts.length">
      <div class="post blog-card" v-for="post in posts" :key="post.id">
        <div class="post__header">
          <div class="post__info">
            <h2>{{post.title}} <span v-if="post.isEdited" class="post__edited">(ред.)</span></h2>
            <blog-user class="post__user" :user="post.author" :show-name="true"/>
            <p class="post__time">{{formatTime(post.time)}}</p>
          </div>
          <div class="post__actions">
            <router-link v-if="isMyPost(post)" :to="{name: 'edit', params: { id: post.id } }">
              <img
                class="post__action"
                :src="editIcon"
                alt="Редактировать пост"
              />
           </router-link>
            <router-link :to="{name: 'view', params: { id: post.id } }">
              <img
                class="post__action"
                :src="commentIcon"
                alt="Комментировать пост"
              />
           </router-link>
            <img
              v-if="isMyPost(post)"
              class="post__action"
              :src="deleteIcon"
              alt="Удалить пост"
              @click="choosePost(post.id)"
            />

          </div>
        </div>
        <p>{{post.text}}</p>
      </div>
    </template>
    <div v-else-if="!isError" class="none blog-card" >
     <h3> Пока тут пусто, нажми кнопку c плюсом, чтоб написать пост</h3>
    </div>
    <div v-else class="none blog-card _error" >
     <h3> При загрузке постов произошла ошибка!</h3>
    </div>
    <blog-confirm-modal
      :visible="isModalVisible"
      title="Пост будет удален!"
      text="Ты уверен, что хочешь продолжить?"
      @confirm="deletePost(chosenPost)"
      @decline="isModalVisible = false"
    />
  </div>
</template>

<script>

import BlogUser from '@/components/BlogUser.vue';
import { mapMutations, mapState } from 'vuex';
import BlogConfirmModal from '@/components/BlogConfirmModal.vue';
import postsApi from '../api/posts';
import deleteIcon from '../assets/cross.svg';
import newIcon from '../assets/plus.svg';
import editIcon from '../assets/edit.svg';
import commentIcon from '../assets/comment.svg';

export default {
  components: { BlogUser, BlogConfirmModal },
  name: 'BlogFeed',
  data() {
    return {
      posts: [],
      isError: false,
      isModalVisible: false,
      chosenPost: null,
      deleteIcon,
      newIcon,
      editIcon,
      commentIcon,
    };
  },
  async created() {
    this.init();
  },
  computed: {
    ...mapState({ user: (state) => state.user }),
  },
  methods: {
    ...mapMutations({
      renderToast: 'setToast',
      setLoading: 'setLoading',
    }),
    async init() {
      try {
        this.setLoading(true);
        const { data } = await postsApi.getPosts();
        this.posts = data.sort((a, b) => new Date(b.time) - new Date(a.time));
      } catch (e) {
        this.isError = true;
        console.error(e);
      } finally {
        this.setLoading(false);
      }
    },
    formatTime(time) {
      if (!time) return '';
      return (new Date(time)).toLocaleString().replace(',', '');
    },
    isMyPost(post) {
      return post.author.id === this.user.id;
    },
    choosePost(id) {
      this.isModalVisible = true;
      this.chosenPost = id;
    },
    async deletePost(id) {
      try {
        this.setLoading(true);
        await postsApi.deletePost(id);
        this.init();
      } catch (e) {
        console.error(e);
        this.renderToast('Произошла ошибка при удалении поста');
      } finally {
        this.chosenPost = null;
        this.isModalVisible = false;
        this.setLoading(false);
      }
    },
  },
};
</script>

<style scoped>

.post__time {
  color: #8194a7;
  margin: 0;
  font-size: 12px;
}
.post__edited {
  color: #8194a7;
  font-size: 10px;
  font-weight: normal;
}

.post__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.post__actions {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
}

.post__action {
  width: 25px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.post__action:hover {
  opacity: 0.6 !important;
}

.post:hover .post__action {
  opacity: 1;
}

.post__user {
  margin: 0.5rem 0 0.5rem 0;
}
.none {
  margin-top: 4rem;
  padding: 3rem;
  color: #8194a7;
  text-align: center;
}

.none._error {
  color: #f71d00;
}

.new {
  position: fixed;
  padding: 10px;
  bottom: 30px;
  right: 10%;
  border-radius: 50%;
  background: #ffffff;
  -webkit-box-shadow: 2px 2px 9px 3px rgb(34 60 80 / 20%);
  -moz-box-shadow: 2px 2px 9px 3px rgb(34 60 80 / 20%);
  box-shadow: 2px 2px 9px 3px rgb(34 60 80 / 20%);
}

.new:hover {
  background-color: #f7f7f7;
}

.new__icon {
  color: #b0becd;
  width: 56px;
  height: 50px;
}

</style>
