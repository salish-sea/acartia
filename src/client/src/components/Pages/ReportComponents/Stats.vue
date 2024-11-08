<template>
  <div class="content">
    <h2>Stats</h2>
    <div class="row mt-4">
      <div class="col">
        <p class="fw-bold">No. of Species Sighted</p>
        <p>{{ speciesCount }}</p>
      </div>
      <div class="col">
        <p class="fw-bold">No. of Whales Sighted</p>
        <p>{{ whaleSightingsCount }}</p>
      </div>
    </div>
    <p class="fw-bold">Last Data Update</p>
    <p>{{ mostRecentSightingDate }}</p>
  </div>
</template>

<script>

export default {
  name: 'Stats',
  computed: {
    mostRecentSightingDate() {
      let date = this.$store.getters.getLastSighting.created
      if (date) {
        date = date.slice(0, 10)
      }
      return date
    },
    speciesCount() {
      return this.$store.getters.getMapOptions.species.length
    },
    whaleSightingsCount() {
      return this.$store.getters.getSightings.reduce((count, sighting) => {
        const whaleRegex = /whale|orca|dolphin|beluga|humpback|blue|sperm|killer/i;

        if (whaleRegex.test(sighting.properties.type)) {
          return count + 1;
        }

        return count;
      }, 0);
    },
  },
}
</script>


<style scoped>
.content {
  height:100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

h2 {
  font-family: Mukta;
  font-size: 1.50vw;
  font-size:calc(18px + 0.4vw);
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  text-align: center;
  /* 1.575rem */
}

p {
  text-align: center;
}

.slider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fw-bold {
  color: var(--Neutrals-Black, #0C0826);
  text-align: center;
  font-family: Mukta;
  font-size:calc(14px + 0.4vw);
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  /* 1.3125rem */
}

.divider-active {
  width: 1.625rem;
  height: 0.125rem;
  background-color: #1F5586;
  margin: 0 0.25rem;
  border-radius: 5px;
}

.divider {
  width: 1.625rem;
  height: 0.125rem;
  background-color: #BCCCDB;
  margin: 0 0.25rem;
  border-radius: 5px;
}

.stats-container {
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #2c2c54;
}
</style>
