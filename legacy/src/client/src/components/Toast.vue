// Loosely inspired by https://medium.com/@serpentarium13/how-to-toast-on-your-own-in-vue-5962c0f954d1
<template>
  <Teleport to="body">
    <ul v-if="toasts.length" class="toasts">
      <li v-for="toast in toasts" :class="toast.status" :key="toast.id">
        <img :src="require('@/assets/tick.svg')">
        <p>{{ toast.message }}</p>
      </li>
    </ul>
  </Teleport>
</template>
<script>

 export default {
  name: 'Toast',
  computed: {
    toasts() {
      return this.$store.state.toasts;
    }
  }
 }

</script>

<style scoped>
p {
  font-family: "Montserrat";
  font-weight: 300;
  font-size: 14px;
  line-height: 19.6px;
  margin: 0;
  margin-left: 10px;
}

img {
  width: 18px;
  height: 18px;
}

.error {
  background-color: #e86b6b;
  width: 316px;
  height: 48px;
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}


.success {
  background-color: #BFEBED;
  width: 316px;
  height: 48px;
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.toasts {
  position: fixed;
  top: 70px;
  left: calc(50% - 158px); /* position at half the page but account for width of the box */
  z-index: 9999999;
  padding: 0;
  margin: 0;
}

</style>
