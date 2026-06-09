<script>

import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
export default {
  components: {
    PostForm, PostList
  },

  data() {
    return {
      posts: [
        {id: 1, title: 'JavaScript', body: 'Description field'},
        {id: 2, title: 'JavaScript th', body: 'Description field'},
        {id: 3, title: 'JavaScript th', body: 'Description field'},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
    }
  }
}
</script>


<template>
  <div class="app">
    <post-form @create="createPost" />
    <!--v-bind:posts -> shorter version :posts-->
    <post-list v-bind:posts="posts"></post-list>
  </div>
</template>

<!--the styles will be applied only to this component-->
<!--<style scoped></style>-->
<style>
* {
  margin: 0;
  padding: 6px;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

</style>
