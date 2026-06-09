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
    <!--Manuall setters-->
    <input v-bind:value="post.title" @input="post.title = $event.target.value" class="input" type="text" placeholder="Naming field">
    <input v-bind:value="post.body" @input="post.body = $event.target.value" class="input" type="text" placeholder="Description field">
    <Button class="bth" type="submit" style="margin-top: 10px">Add post</Button>
  </form>
</template>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px;
  margin-top: 10px;
}

form {
  display: flex;
  flex-direction: column;
}
.bth {
  align-self: flex-end;
}
</style>
