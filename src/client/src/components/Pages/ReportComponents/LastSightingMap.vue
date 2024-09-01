<template>
  <div style="z-index:1;" id='lastSightingContainer'></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { generateMatchExpression, sortApiDataChronologically, getSpeciesAndContributors, transformApiDataToMappableData, legendColorMap } from '../../../mapUtils'

export default {
  name: 'Map',
  components: {
  },
  data() {
    return {
      mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
    }
  },
  created() {
    this.loadSightings()
  },
  methods: {
    mapSightings() {
      // Grab access token for Mapbox
      mapboxgl.accessToken = this.mapboxKey

      // Initialise mapbox container
      const map = new mapboxgl.Map({
        container: 'lastSightingContainer',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [this.lastSighting.longitude, this.lastSighting.latitude],
        zoom: 7.0
      });

      let geoData = {
        "type": "FeatureCollection",
        "features": transformApiDataToMappableData([this.lastSighting])
      }

      // On load event
      map.on('load', function () {
        map.addLayer({
          id: 'last-sighting-layer',
          type: 'circle',
          source: {
            type: 'geojson',
            data: geoData
          },
          paint: {
            // Set size of circle pinpoint based on how large the sighting is (all made same size for now, was 0 4 5 12)
            'circle-radius': [
              'interpolate',
              ['linear'], ['zoom'],
              6, 6,
              8, 10,
              10, 14
            ],
            // Set colour of circle pinpoint based of number of sightings
            'circle-opacity': 0.9,
            'circle-color': generateMatchExpression(legendColorMap)
          }
        })
      })
    },
    loadSightings() {
      this.$store.dispatch("get_sightings")
        .then((currSights) => {
          //sort data first then grab reference to the most recent sighting for the reports page
          let dataPoints = sortApiDataChronologically(currSights)
          let lastSighting = Object.assign({}, dataPoints[dataPoints.length - 1])
          this.$store.commit("setLastSighting", lastSighting)

          dataPoints = transformApiDataToMappableData(dataPoints)
          let { speciesList, contributorList } = getSpeciesAndContributors(dataPoints)

          //Commit filter options to store
          this.$store.commit("setMapOptions", {
            contributors: contributorList,
            species: speciesList
          })

          //Commit sightings to store
          this.$store.commit("setSightings", dataPoints)

          //Apply default filters on first render.
          //Reduces initial page load by only mapping previous 7 days of data.
          this.$store.commit("applyMapFilters")
          this.mapSightings()
          this.$store.commit("setActiveMapLayer", this.getActiveMapLayer)
        })
    },
  },
  computed: {
    filteredSightings() {
      return this.$store.getters.getFilteredSightings
    },
    lastSighting() {
      return this.$store.getters.getLastSighting
    }
  },
  updated() {
    this.mapSightings()
  }
}
</script>

<style>
#lastSightingContainer {
  width: 100%;
  height: 45%;
  position: relative;
}
</style>
