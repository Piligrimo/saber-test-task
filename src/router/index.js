import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogFeed from '../views/BlogFeed.vue';
import PostForm from '../views/PostForm.vue';

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
    component: PostForm,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: PostForm,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
