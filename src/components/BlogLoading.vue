<template>
  <div v-if="isLoading" class="loading">
    <object
      class="loading__icon"
      :data="errorIcon"
      title="Загрузка"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import errorIcon from '../assets/loading.svg';

export default {
  name: 'BlogLoading',
  data() {
    return {
      errorIcon,
      timer: null,
    };
  },
  computed: {
    ...mapState({ isLoading: (state) => state.isLoading }),
  },
};
</script>

<style scoped>
  .loading {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #ffffffde;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading__icon {
    width: 60px;
    animation-name: spin;
    animation-duration: 800ms;
    animation-iteration-count: infinite;
    animation-timing-function: steps(8);
  }

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

</style>
