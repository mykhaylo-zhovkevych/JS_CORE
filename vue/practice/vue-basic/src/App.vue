<template>
    <Navbar></Navbar>
    <div class="app">
      <router-view>
      </router-view>
    </div>
</template>

<script>

import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {Navbar}
})
</script>

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
