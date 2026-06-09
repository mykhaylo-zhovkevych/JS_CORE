<script>

import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import VDialog from "@/UI/VDialog.vue";
export default {
  components: {
    VDialog,
    PostForm, PostList
  },

  data() {
    return {
      posts: [
        {id: 1, title: 'JavaScript', body: 'Description field'},
        {id: 2, title: 'JavaScript th', body: 'Description field'},
        {id: 3, title: 'JavaScript th', body: 'Description field'},
      ],
      dialogVisible: false
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    }
  }
}
</script>


<template>
  <div class="app">
    <h1>Post creation</h1>
    <VButton @click="showDialog">Create post</VButton>

    <v-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </v-dialog>
    <!--v-bind:posts -> shorter version :posts-->
    <post-list v-bind:posts="posts" @remove="removePost" v-if="posts.length > 0" />
    <h2 v-else style="color: darkred">
      List is empty
    </h2>
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
