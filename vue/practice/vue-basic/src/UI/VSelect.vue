<script>

export default {
  name: 'v-select',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptions(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}

</script>

<template>
  <select class="select__view" :value="modelValue" @change="changeOptions">
    <option disabled value="">Choose a list</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
  </select>
</template>

<style scoped>
.select__view {
  display: flex;
  padding: 10px 15px;
  margin-left: 5px;
  background: none;
  color: teal;
  border-color: teal;
}

</style>
