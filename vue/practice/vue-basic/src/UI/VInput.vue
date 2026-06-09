<script>
  export default {
    name: 'VInput',
    props: {
      modelValue: [String, Number],
    },
    methods: {
      // More intuitive way
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<style scoped>
.input {
  width: -webkit-fill-available;
  border: 2px solid teal;
  padding: 10px;
  margin: 6px;
}

</style>
