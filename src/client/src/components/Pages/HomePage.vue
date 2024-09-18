<template>
  <div>
    <Info />
    <Map id="home-map"></Map>
  </div>
</template>

<script>
import Map from '../MapComponent'
import Info from '../InfoPopUpComponent.vue'

export default {
  name: 'Home',
  components: {
    Map,
    Info
  },
}
</script>

<style scoped>
#home-about-card {
  width: 40%;
  top: 6vh;
  right: -30vh;
  margin: 10px;
  background-color: transparent;
  position: fixed;
  display: inline-block;
}
</style>
