import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogFeed from '../views/BlogFeed.vue';
import PostForm from '../views/PostForm.vue';
import PostView from '../views/PostView.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import NotFound from '../views/NotFound.vue';
import { authOnly, nonAuthOnly } from './guards';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter: nonAuthOnly,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    beforeEnter: nonAuthOnly,
  },
  {
    path: '/feed',
    name: 'feed',
    component: BlogFeed,
    beforeEnter: authOnly,
  },
  {
    path: '/new',
    name: 'new',
    component: PostForm,
    beforeEnter: authOnly,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: PostForm,
    beforeEnter: authOnly,
  },
  {
    path: '/view/:id',
    name: 'view',
    component: PostView,
    beforeEnter: authOnly,
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
