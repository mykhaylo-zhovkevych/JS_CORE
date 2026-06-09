<script>
export default {
  name: "VButton"
}
</script>

<template>
  <button class="bth">
    <slot></slot>
  </button>
</template>

<style scoped>
.bth {
  display: flex;
  padding: 10px 15px;
  background: none;
  color: teal;
  border-color: teal;
}
</style>
