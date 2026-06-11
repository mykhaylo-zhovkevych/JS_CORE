<script setup>

import VButton from "@/UI/VButton.vue";
import router from "@/router/router.js";
</script>

<template>
  <div class="navbar">
    <div>Vue 3</div>
    <div class="navbar__bths">
      <VButton @click="router.push('/')">Home</VButton>
      <VButton @click="router.push('/posts')" style="margin-left: 20px;">Posts</VButton>
    </div>
  </div>
</template>

<style scoped>

.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 15px;
}

</style>