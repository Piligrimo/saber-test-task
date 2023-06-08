import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogFeed from '../views/BlogFeed.vue';
import NewPost from '../views/NewPost.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'feed' },
  },
  {
    path: '/feed',
    name: 'feed',
    component: BlogFeed,
  },
  {
    path: '/new',
    name: 'new',
    component: NewPost,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
