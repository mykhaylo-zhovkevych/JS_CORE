<!-- Shorter way in Vue 3 -->
<script setup>

defineProps({
  post: {
    type: Object,
    required: true,
  }
})
defineEmits(['remove'])
</script>

<template>
  <div class="post">
    <div>
      <div><strong>{{post.id}}</strong></div>
      <div><strong>Naming</strong>{{post.title}}</div>
      <div><strong>Description</strong>{{post.body}}</div>
    </div>
    <div class="post__bths">
      <div class="post__bth">
        <VButton @click="$router.push(`/posts/${post.id}`)">Open</VButton>
      </div>
      <div class="post__bth">
        <VButton @click="$emit('remove', post)">Delete</VButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  display: flex;
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  align-items: center;
  justify-content: space-between;

}

.post__bths {
  display: flex;
}

</style>
