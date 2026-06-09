<script>

import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import VDialog from "@/UI/VDialog.vue";
import axios from "axios";
import VButton from "@/UI/VButton.vue";
import VSelect from "@/UI/VSelect.vue";
import VInput from "@/UI/VInput.vue";
import PostIndex from "@/components/PostIndex.vue";
export default {
  components: {
    PostIndex,
    VInput,
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
      searchQuery: '',
      page: 1,
      limit: 10,
      totalCount: 0,
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
    async changePage(pageVal) {
      this.page = pageVal;
      await this.fetchUser();
    },
    async fetchUser() {
      try {
        this.isPostLoading = true;
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalCount = Math.ceil(response.headers['x-total-count'] / this.limit)
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
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(p => p.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
}
</script>


<template>
  <div class="app">
    <h1>Post creation</h1>
    <VInput v-model="searchQuery" placeholder="Search by title" />
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
    <post-list v-else-if="posts.length > 0" v-bind:posts="sortedAndSearchedPosts" @remove="removePost" />
    <h2 v-else style="color: darkred">
      List is empty
    </h2>
    <post-index :page="page" :total-count="totalCount" @change="changePage" />
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
