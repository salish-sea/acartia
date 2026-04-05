<template>
  <div class="tab-content" v-show="title == selectedTitle">
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  props: ['title'],
  setup() {
    const selectedTitle = inject ('selectedTitle')

    return {
      selectedTitle,
    }
  }
}
</script>

<style scoped>
.tab-content {
  display: inline;
}
</style>