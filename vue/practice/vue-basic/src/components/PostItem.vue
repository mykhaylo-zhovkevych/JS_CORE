<script setup>

defineProps({
  post: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div class="post">
    <div>
      <div><strong>Description</strong>{{post.title}}</div>
      <div><strong>Description</strong>{{post.body}}</div>
    </div>
    <div class="post__bth">
      <Button>Delete</Button>
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
</style>
