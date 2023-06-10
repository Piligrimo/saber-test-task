<template>
  <div v-if="visible" class="modal">
    <div class="modal__container blog-card">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
      <div class="modal__actions">
        <button class="modal__button blog-button" @click="$emit('confirm')">
          Да
        </button>
        <button class="modal__button blog-button" @click="$emit('decline')">
          Нет
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BlogToast',
  props: {
    visible: Boolean,
    title: String,
    text: String,
  },
};
</script>

<style scoped>
  .modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #000000de;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal__container {
    min-width: 300px;
  }

  .modal__actions {
    display: flex;
    justify-content: space-between;
  }

  .modal__button {
    width: 140px;
  }
</style>
