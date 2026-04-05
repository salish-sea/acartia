<template>
  <div>
    <Map id="home-map"></Map>
  </div>
</template>

<script>
import Map from '../MapComponent'

export default {
  name: 'Home',
  components: {
    Map,
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
