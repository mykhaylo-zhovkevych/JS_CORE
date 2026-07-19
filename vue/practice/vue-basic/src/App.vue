<template>
    <Navbar></Navbar>
    <div class="app">
      <p :class="demoClass">classnames is resolving from the workspace root</p>
      <router-view>
      </router-view>
    </div>
</template>

<script>

import {defineComponent} from "vue";
import classNames from "classnames";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {Navbar},
  computed: {
    demoClass() {
      return classNames("demo-box", {
        active: true,
        inactive: true
      })
    }
  }
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

.demo-box {
  color: teal;
}

.active {
  border: 2px solid teal;
}

</style>
