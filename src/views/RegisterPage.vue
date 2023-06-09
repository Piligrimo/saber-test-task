<template>
  <div class="login">
    <h1 class="login__header">Регистрация</h1>
    <p class="blog-label">Логин</p>
    <input class="login__input blog-input" v-model="login">
    <label for="password">
      <p class="blog-label">Пароль</p>
      <input
        id="password"
        class="login__input blog-input"
        type="password"
        v-model="password"
      >
    </label>
    <label for="password">
      <p class="blog-label">Повторите пароль</p>
      <input
        id="password"
        class="login__input blog-input"
        type="password"
        v-model="confirmPassword"
      >
    </label>
    <p v-if="errorMessage" class="blog-error">{{errorMessage}}</p>
    <div class="login__actions">
      <button class="login__button blog-button" @click="register">Зарегистрироваться</button>
      <router-link :to="{name: 'login'}">
        <button class="login__button blog-button _secondary">
          Вернуться на страницу входа
        </button>
      </router-link>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegisterPage',
  data() {
    return {
      login: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions({
      registerAction: 'register',
    }),
    async register() {
      this.errorMessage = '';
      const emptyFields = [];
      if (!this.login) emptyFields.push('логин');
      if (!this.password) emptyFields.push('пароль');
      if (!this.confirmPassword) emptyFields.push('потвердите пароль');
      if (emptyFields.length) {
        this.errorMessage = `Введите ${emptyFields.join(' и ')}`;
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Поля с паролем должны совпадать';
        return;
      }
      await this.registerAction({ login: this.login, password: this.password });
      this.$router.push({ name: 'feed' });
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
