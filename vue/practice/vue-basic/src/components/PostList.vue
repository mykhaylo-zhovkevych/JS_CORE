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
    <transition-group name="post-list">
      <post-item class="post" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
    </transition-group>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}

.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.1s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-leave-active {
  position: absolute;
}
</style>
