<template>
  <div id="app">
    <div v-if="isAuth" class="actions">
      <router-link v-if="isBackButtonVisible" :to="{name: 'feed'}">
        <img
          class="actions__back"
          :src="backArrow"
          alt="Назад к ленте"
        />
      </router-link>
      <blog-user class="actions__user" :user="user"/>
      <img
        class="actions__log-out"
        :src="logoutIcon"
        @click="logOut"
        alt="Выйти"
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import logoutIcon from './assets/logout.svg';
import BlogUser from './components/BlogUser.vue';
import backArrow from './assets/back.svg';

console.log('test', process.env.NODE_ENV);

export default {
  components: { BlogUser },
  name: 'App',
  data() {
    return {
      logoutIcon,
      backArrow,
    };
  },
  computed: {
    ...mapState({ user: (state) => state.user }),
    ...mapGetters({
      isAuth: 'isAuth',
    }),
    isBackButtonVisible() {
      return this.$route.name === 'edit' || this.$route.name === 'view';
    },
  },
  methods: {
    ...mapActions({
      logOutAction: 'logOut',
    }),
    logOut() {
      this.logOutAction();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 700px;
  margin: auto;
  margin-top: 70px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  max-width: 550px;
}

h2 {
  margin: 0;
}

.blog-button{
  cursor: pointer;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  border: 1px solid #828282;
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

.blog-button._secondary{
  border: none;
  color: #8194a7;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  background-color: none;
}

.blog-button._secondary:hover {
  background: none;
  color: #425262;
}
.blog-button:hover {
  background-color: #f7f7f7;
}

.blog-button._small {
  padding: 0.5rem 1rem;
}

.blog-input {
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

.blog-input._small {
  padding: 0.7rem 2rem 0.5rem 2rem;
}

.blog-input:focus {
  outline: none !important;
  border: 2px solid hsl(213, 100%, 79%);
}

.blog-card {
  margin-bottom: 1rem ;
  border-radius: 20px;
  padding: 1rem 2rem;
  background: #ffffff;
  -webkit-box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
  -moz-box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
  box-shadow: 3px 3px 9px 1px rgb(34 60 80 / 20%);
}

.blog-label {
  color: #8194a7;
  margin-bottom: 5px;
  margin-left: 10px;
}

.blog-error {
  color: #f71d00;
  font-size: 12px;
  margin: 8px 0 0 10px ;
}

.actions__log-out {
  width: 45px;
  cursor: pointer;
  margin-left: 10px;
}

.actions__log-out:hover{
  opacity: 0.6;
}

.actions {
  display: flex;
  align-items: flex-start;
  position: absolute;
  top: 70px;
  right: calc(0.5 * (100vw - 700px));
  z-index: 5;
}

.actions__user{
  margin-top: 2px;
  margin-left: 15px;
}

.actions__back {
  width: 40px;
}
.actions__back:hover {
  opacity: 0.6;
}
</style>
