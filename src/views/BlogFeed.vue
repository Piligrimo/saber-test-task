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
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="post__header">
          <div class="post__info">
            <h2>{{post.title}}</h2>
            <p class="post__time">{{formatTime(post.time)}}</p>
          </div>
          <img
            class="post__delete"
            :src="deleteIcon"
            alt="Удалить пост"
            @click="deletePost(post.id)"
          />
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

export default {
  name: 'BlogFeed',
  data() {
    return {
      posts: [],
      deleteIcon,
      newIcon,
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

.post {
  margin-bottom: 1rem ;
  border-radius: 20px;
  padding: 1rem 2rem;
  -webkit-box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
  -moz-box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
  box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
}
.post__time {
  color: #8194a7;
  margin: 0;
  font-size: 12px;
}
.post__header {
  display: flex;
  justify-content: space-between;
}
.post__delete {
  width: 25px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}
.post:hover .post__delete {
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

.new__icon {
  width: 56px;
  height: 50px;
}
</style>
