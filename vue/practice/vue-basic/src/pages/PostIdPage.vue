<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const errorMessage = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${route.params.id}`);
    post.value = response.data;
  } catch (error) {
    errorMessage.value = error.response?.data?.message ?? 'Post could not be found';
  }
});
</script>

<template>
  <main>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <article v-else-if="post">
      <h1>This is a post page with id: {{ $route.params.id}}</h1>
      <h2>Title: {{ post.title }}</h2>
      <h3>Description: {{ post.body }}</h3>
      <p>
        This is belongs to the page
        <b>{{post.pageNumber}}</b>
        and has position
        <b>{{post.positionInPage}}</b>
        on this page.
      </p>
    </article>
  </main>
</template>

<style scoped>

</style>
