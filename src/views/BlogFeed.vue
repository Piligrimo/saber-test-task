<template>
  <div class="feed">
    <h1>Блог Максона</h1>
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
            <p class="post__time">{{formatTime(post.time)}}</p>
          </div>
          <div class="post__actions">
            <router-link :to="{name: 'edit', params: { id: post.id } }">
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
              class="post__action"
              :src="deleteIcon"
              alt="Удалить пост"
              @click="deletePost(post.id)"
            />

          </div>
        </div>
        <p>{{post.text}}</p>
      </div>
    </template>
    <div v-else class="post none" >
     <h3> Пока тут пусто, нажми кнопку выше, чтоб написать пост</h3>
    </div>
  </div>
</template>

<script>

import postsApi from '../api/posts';
import deleteIcon from '../assets/cross.svg';
import newIcon from '../assets/plus.svg';
import editIcon from '../assets/edit.svg';
import commentIcon from '../assets/comment.svg';

export default {
  name: 'BlogFeed',
  data() {
    return {
      posts: [],
      deleteIcon,
      newIcon,
      editIcon,
      commentIcon,
    };
  },
  async created() {
    this.init();
  },
  methods: {
    async init() {
      const { data } = await postsApi.getPosts();
      this.posts = data.sort((a, b) => new Date(b.time) - new Date(a.time));
    },
    formatTime(time) {
      if (!time) return '';
      return (new Date(time)).toLocaleString().replace(',', '');
    },
    async deletePost(id) {
      await postsApi.deletePost(id);
      this.init();
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
.none {
  padding: 3rem;
  color: #8194a7;
  text-align: center;
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
