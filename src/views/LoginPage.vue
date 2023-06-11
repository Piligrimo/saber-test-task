<template>
  <div class="login">
    <h1 class="login__header">Вход</h1>
    <p class="blog-label">Логин</p>
    <input class="login__input blog-input" v-model="login">
    <p class="blog-label">Пароль</p>
    <label for="password">
      <input
        id="password"
        class="login__input blog-input"
        type="password"
        v-model="password"
      >
    </label>
    <p v-if="errorMessage" class="blog-error">{{errorMessage}}</p>
    <div class="login__actions">
      <button class="login__button blog-button" @click="signIn">Войти</button>
      <router-link :to="{name: 'register'}">
        <button class="login__button blog-button _secondary">
          У меня ещё нет аккаунта
        </button>
      </router-link>
    </div>

  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions({
      signInAction: 'signIn',
    }),
    ...mapMutations({
      setLoading: 'setLoading',
    }),
    async signIn() {
      this.errorMessage = '';
      const emptyFields = [];

      if (!this.login) emptyFields.push('логин');
      if (!this.password) emptyFields.push('пароль');

      if (emptyFields.length) {
        this.errorMessage = `Введите ${emptyFields.join(' и ')}`;
        return;
      }

      try {
        this.setLoading(true);
        await this.signInAction({ login: this.login, password: this.password });
        this.$router.push({ name: 'feed' });
      } catch (e) {
        console.error(e);
        this.errorMessage = e.message;
      } finally {
        this.setLoading(false);
      }
    },
  },
};
</script>

<style scoped>
.login{
  max-width: 300px;
  margin: auto;
}
.login__header {
  margin-bottom: 2.5rem;
  text-align: center;
}
.login__button {
  width: 100%;
}
.login__input {
  width: calc(100% - 64px);
  margin-bottom: 0;
}
.login__actions {
  margin-top: 1.5rem;
}
</style>
