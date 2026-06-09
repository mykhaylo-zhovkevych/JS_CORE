<script setup>

defineProps({
  page: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  }
})

defineEmits(['change'])

</script>

<template>
  <div class="page__wrapper">
    <div v-for="pageVal in totalCount" :key="pageVal" class="page" :class="{'current-page': page === pageVal}" @click="$emit('change', pageVal)">
      {{pageVal}}
    </div>
  </div>
</template>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 2px solid teal;
  padding: 10px;
}
.current-page {
  border: 2px solid black;
}
</style>
