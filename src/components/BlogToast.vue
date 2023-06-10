<template>
  <div  class="toast">
    <Transition name="section">
      <div v-if="message" class="blog-card toast__card">
        <img
          class="toast__icon"
          :src="errorIcon"
          alt="Ошибка"
        />
        <p> {{ message }}</p>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import errorIcon from '../assets/error.svg';

const DELAY = 3000;

export default {
  name: 'BlogToast',
  data() {
    return {
      errorIcon,
      timer: null,
    };
  },
  computed: {
    ...mapState({ message: (state) => state.toastMessage }),
  },
  watch: {
    message(val) {
      const vue = this;
      if (val) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          vue.reset('');
        }, DELAY);
      }
    },
  },
  methods: {
    ...mapMutations({
      reset: 'setToast',
    }),
  },
};
</script>

<style scoped>
  .toast {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .toast__card {
    margin: auto;
    width: fit-content;
    display: flex;
  }

  .toast__icon {
    width: 30px;
    margin-right: 10px;
  }
  .section-leave-active,
.section-enter-active {
  transition: .2s;
}
.section-enter {
  transform: translateY(100%);
}
.section-leave-to {
  opacity: 0;
}

</style>
