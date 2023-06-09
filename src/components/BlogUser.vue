<template>
  <div class="user">
    <div class="user__avatar" :style="{backgroundColor: color}">{{firstLetter}}</div>
    <p class="user__name" v-if="showName">{{user.login}}</p>
  </div>
</template>

<script>

export default {
  name: 'BlogUser',
  props: {
    user: Object,
    showName: Boolean,
    size: {
      validator(value) {
        return ['small', 'big'].includes(value);
      },
      default: 'small',
    },
  },
  computed: {
    firstLetter() {
      return this.user.login[0].toUpperCase();
    },
    color() {
      let hex = this.user.login
        .slice(0, 10)
        .split('')
        .reduce((acc, cur) => acc * cur.charCodeAt(), 1)
        .toString(16)
        .slice(-6);
      if (hex.length < 6) {
        hex = '0'.repeat(6 - hex.length) + hex;
      }
      return `#${hex}`;
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
}
.user__name {
  margin: auto 0 2px 10px;
  font-size: 20px;
}
.user__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: #fff;
  font-weight: 600;
}
</style>
