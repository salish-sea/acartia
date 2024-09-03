<template>
  <!--Last sighting -->
  <div class="sighting">
    <h2>Last sighting</h2>
    <LastSightingMap />
    <div class="row sighting-text">
      <div class="col-6">
        <p class="sighting-title">Type:</p>
        <p>{{ mostRecentSightingType }}</p>
      </div>
      <div class="col-6">
        <p class="sighting-title">Sighter:</p>
        <p>{{ mostRecentSightingProfileName }}</p>
      </div>
      <div class="col-6">
        <p class="sighting-title">Date:</p>
        <p>{{ mostRecentSightingDate }}</p>
      </div>
      <div class="col-6">
        <p class="sighting-title">Pod/Non Pod:</p>
        <p>Non Pod</p>
      </div>
      <div class="col-6">
        <p class="sighting-title">Location:</p>
        <p>Lat: {{ mostRecentSightingLatitude }} Long: {{ mostRecentSightingLongitude }}</p>
      </div>
      <div class="col-6">
        <p class="sighting-title">Photos:</p>
        <p>{{ mostRecentSightingPhotoUrl ? mostRecentSightingPhotoUrl : "No Photos Available" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LastSightingMap from './LastSightingMap.vue';

export default {
  name: 'LastSighting',
  components: {
    LastSightingMap
  },
  computed: {
    mostRecentSighting() {
      return this.$store.getters.getLastSighting
    },
    mostRecentSightingType() {
      return this.$store.getters.getLastSighting?.type
    },
    mostRecentSightingProfileName() {
      return this.$store.getters.getLastSighting?.profile.name
    },
    mostRecentSightingDate() {
      return this.$store.getters.getLastSighting?.created
    },
    mostRecentSightingLatitude() {
      return this.$store.getters.getLastSighting?.latitude
    },
    mostRecentSightingLongitude() {
      return this.$store.getters.getLastSighting?.longitude
    },
    mostRecentSightingPhotoUrl() {
      return this.$store.getters.getLastSighting?.photo_url
    },
  }
}

</script>

<style scoped>
.sighting-title {
  font-family: Montserrat;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.sighting-text {
  padding: 1.5rem;
}
</style>
