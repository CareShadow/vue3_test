<template>
  <!-- <router-view></router-view> -->
  <Layout />
</template>

<script setup>
import { onMounted } from 'vue';
import Layout from './layout/index.vue';
import useUserStore from './store/modules/user';

let store = useUserStore();
onMounted(() => {
  console.log(store);

})
</script>

<style scoped lang="scss">
h1 {
  color: $color;
  font-size: calc(#{$base-font-size} - 2px)
}
</style>