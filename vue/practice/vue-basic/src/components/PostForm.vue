<script>

export default {
  // emits declares custom event
  emits: ['create'],
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      if (!this.post.title.trim() || !this.post.body.trim()) {
        return
      }

      this.$emit('create', {
        ...this.post,
        id: Date.now(),
      })

      this.post = {
        title: '',
        body: ''
      }
    }
  }
}

</script>

<template>
  <form @submit.prevent="createPost">
    <h3>Creation of Post</h3>
    <VInput v-bind:value="post.title" @input="post.title = $event.target.value" placeholder="Naming field" />
    <VInput v-model="post.body" placeholder="Description field" />
    <VButton class="bth" type="submit" style="margin-top: 10px">Add post</VButton>
  </form>
</template>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}
.bth {
  align-self: flex-end;
}
</style>
