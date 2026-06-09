<script>

import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import VDialog from "@/UI/VDialog.vue";
import axios from "axios";
import VButton from "@/UI/VButton.vue";
import VSelect from "@/UI/VSelect.vue";
export default {
  components: {
    VSelect,
    VButton,
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
      isPostLoading: false,
      dialogVisible: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'By naming'},
        {value: 'body', name: 'By description'},
      ]
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
    },
    async fetchUser() {
      try {
        this.isPostLoading = true;
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch (e) {
        alert('Error fetching')
      } finally {
        this.isPostLoading = false;
      }
    }
  },
  mounted() {
    this.fetchUser();
  },
  // watch: {
  //   dialogVisible(newValue) {
  //     console.log(newValue)
  //   }
  // }
  computed: {
    sortedPosts() {
      if (!this.selectedSort) {
        return this.posts;
      }

      return [...this.posts].sort((a, b) => a[this.selectedSort].localeCompare(b[this.selectedSort]));
    }
  },
}
</script>


<template>
  <div class="app">
    <h1>Post creation</h1>
      <div class="app__bths">
        <VButton @click="showDialog">Create post</VButton>
        <v-select v-model="selectedSort" :options="sortOptions" />
      </div>

    <v-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </v-dialog>
    <div v-if="isPostLoading">
      Loading...
    </div>
    <!--v-bind:posts -> shorter version :posts-->
    <post-list v-else-if="posts.length > 0" v-bind:posts="sortedPosts" @remove="removePost" />
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

.app__bths {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


</style>
