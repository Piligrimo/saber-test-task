<template>
  <div class="not-found">
    <h1 class="not-found__code">404</h1>
    <h1 class="not-found__text">Похоже такой страницы нет</h1>
    <router-link to="/">
      <button class="not-found__button blog-button">
        Вернуться на главную
      </button>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'NotFound',
};
</script>

<style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 100px;
    margin: auto;
  }
  .not-found__code {
    font-size: 80px;
  }

  .not-found__text {
    color: #8194a7;
  }
  .not-found__button {
    width: 250px;
  }
</style>
