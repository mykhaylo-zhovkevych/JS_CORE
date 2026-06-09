<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  emits: ['remove'],
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>
<template>
  <div>
    <h2>Naming of lists</h2>
    <post-item class="post" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
</style>
