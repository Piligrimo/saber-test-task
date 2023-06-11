<template>
  <div>
    <div class="post">
      <div class="post__container">
        <h1  class="post__header">{{post.title || 'Обсуждение'}} </h1>
        <blog-user v-if="post && post.author" :user="post.author" :showName="true"/>
        <p>{{post.text}}</p>
        <div class="post__comment-post">
          <input
            class="post__comment-input blog-input"
            placeholder="Напиши комментарий..."
            v-model="comment"
          >
          <button class="blog-button" @click="createComment('post')">Отправить</button>
        </div>

      </div>

    </div>
    <div class="comments">
      <div v-for="(item, i) in comments" :key="item.id">
        <div
          class="blog-card"
          :class="{ _answer: item.depth}"
          :style="{'margin-left': (item.depth % breakThreshold) * 30 + 'px'}"
        >
          <blog-user :user="item.author" :showName="true"/>
          <p>{{item.text}}</p>
          <div v-if="item.id !== commentToAnswer">
            <button class="blog-button _small" @click="expandComment(item)">Обсудить</button>
          </div>
          <div v-else class="post__comment-post">
            <input
              class="post__comment-input blog-input _small"
              placeholder="Напиши комментарий..."
              v-model="answer"
            >
            <button
              class="blog-button _small"
              @click="createComment('comment', item)"
            >
              Отправить
            </button>
          </div>
        </div>
        <div v-if="shouldRenderBreak(i)" class="comments__break">
          <img
            class="comments__arrow"
            :src="downArrow"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import BlogUser from '@/components/BlogUser.vue';
import postsApi from '../api/posts';
import commentApi from '../api/comments';
import downArrow from '../assets/down.svg';

export default {
  components: { BlogUser },
  name: 'PostView',
  data() {
    return {
      post: {
        title: '',
        text: '',
      },
      comments: [],
      comment: '',
      answer: '',
      commentToAnswer: null,
      downArrow,
      breakThreshold: 5,
    };
  },
  async created() {
    this.getPost();
    this.getInitialComments();
  },
  computed: {
    ...mapState({ user: (state) => state.user }),
    postId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapMutations({
      renderToast: 'setToast',
      setLoading: 'setLoading',
    }),
    async getPost() {
      try {
        this.setLoading(true);
        const { data } = await postsApi.getPostById(this.postId);
        this.post = data;
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
    },
    async getInitialComments() {
      try {
        this.setLoading(true);
        const { data } = await commentApi.getCommentsByPost(this.postId);
        this.comments = data.map((comment) => ({ depth: 0, ...comment }));
      } catch (e) {
        this.renderToast('Произошла ошибка при загрузке комментариев');
        console.error(e);
      } finally {
        this.setLoading(false);
      }
    },
    async getAnwers(comment) {
      try {
        const { data } = await commentApi.getAnwersByComment(comment.id);
        const formattedFetchedComments = data
          .filter(({ id }) => this.isIdUnique(id))
          .map((item) => ({ depth: comment.depth + 1, ...item }));

        const commentsTemp = this.comments.slice();

        const index = commentsTemp.findIndex(({ id }) => id === comment.id);
        commentsTemp.splice(
          index + 1,
          0,
          ...formattedFetchedComments,
        );

        this.comments = commentsTemp;
      } catch (e) {
        this.renderToast('Произошла ошибка при загрузке комментариев');
        console.error(e);
      }
    },
    async createComment(targetType, parentComment) {
      const comment = {
        text: targetType === 'post' ? this.comment : this.answer,
        target: {
          type: targetType,
          id: targetType === 'post' ? this.postId : parentComment.id,
        },
        author: this.user,
      };
      try {
        this.setLoading(true);
        await commentApi.createComment(comment);
        if (targetType === 'post') {
          this.comment = '';
          await this.getInitialComments();
        } else {
          this.answer = '';
          await this.getAnwers(parentComment);
        }
      } catch (e) {
        this.renderToast('Произошла ошибка при отправке комментария');
        console.error(e);
      } finally {
        this.setLoading(false);
      }
    },
    async expandComment(comment) {
      this.answer = '';
      this.commentToAnswer = comment.id;
      this.setLoading(true);
      await this.getAnwers(comment);
      this.setLoading(false);
    },
    isIdUnique(_id) {
      return !this.comments.find(({ id }) => id === _id);
    },
    shouldRenderBreak(index) {
      const currentDepth = this.comments[index]?.depth;
      const nextDepth = this.comments[index + 1]?.depth;
      const isNextAChild = this.comments[index + 1]?.target.type === 'comment'
        && this.comments[index + 1]?.target.id === this.comments[index]?.id;
      return (currentDepth % this.breakThreshold)
        && (nextDepth % this.breakThreshold === 0)
        && isNextAChild;
    },
  },
};
</script>

<style scoped>
.post {
  width: 100vw;
  position: relative;
  margin: 0 calc( -0.5 * (100vw - 700px));
  -webkit-box-shadow: 0px 8px 7px 0px rgb(34 60 80 / 20%);
  -moz-box-shadow: 0px 8px 7px 0px rgb(34 60 80 / 20%);
  box-shadow: 0px 8px 7px 0px rgb(34 60 80 / 20%);
}
.post__container {
  max-width: 700px;
  margin: auto;
  padding-bottom: 2rem;
}
.post__header {
  margin-bottom: 0.5rem;
}
.post__comment-post {
  display: flex;
}
.post__comment-input {
  width: 100%;
  margin: 1rem 2rem 0 0;
}

._answer {
  margin-top: -0.5rem;
}

.comments {
  margin-top: 2rem;
  margin-bottom: 300px;
}

.comments {
  margin-top: 2rem;
  margin-bottom: 300px;
}

.comments__break {
  border-left: 1px solid #bfbfbf;
  border-top: 1px solid #bfbfbf;
  border-radius: 5px 0 0 0;
  height:  10px;
  margin: 1rem;
}

.comments__arrow {
  width: 17px;
  position: relative;
  left: -9px;
  top: 0px;
}
</style>
