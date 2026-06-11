<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  const response = await axios.get(`http://localhost:3000/posts/${route.params.id}`);
  post.value = response.data;
})
</script>

<template>
  <div v-if="post">
    <h1>This is a post page with id: {{ $route.params.id}}</h1>
    <h2>Title: {{ post.title }}</h2>
    <h3>Description: {{ post.body }}</h3>
  </div>
</template>

<style scoped>

</style>
