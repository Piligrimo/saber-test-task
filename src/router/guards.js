import store from '@/store';

export const authOnly = async (to, from, next) => {
  store.dispatch('updateFromLocalStorage');
  if (!store.getters.isAuth) {
    next({ name: 'login' });
  } else {
    next();
  }
};

export const nonAuthOnly = async (to, from, next) => {
  store.dispatch('updateFromLocalStorage');
  if (store.getters.isAuth) {
    next({ name: 'feed' });
  } else {
    next();
  }
};
