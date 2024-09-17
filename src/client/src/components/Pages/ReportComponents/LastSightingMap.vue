<template>
  <div style="z-index:1;" id='lastSightingContainer'></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { generateMatchExpression, transformApiDataToMappableData, legendColorMap } from '../../../mapUtils'
import { mapGetters } from 'vuex'

export default {
  name: 'Map',
  components: {
  },
  data() {
    return {
      mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
      map: null,
    }
  },
  created() {
    this.mapSightings
  },
  methods: {
    //TODO: wait for loading state before loading map.
    //Try rerendering in inwatcher on last sighting state.
    mapSightings() {
      // Grab access token for Mapbox
      mapboxgl.accessToken = this.mapboxKey

      // Initialise mapbox container
      const map = new mapboxgl.Map({
        container: 'lastSightingContainer',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [this.getLastSighting.longitude, this.getLastSighting.latitude],
        zoom: 7.0
      });

      //Save reference to map for rerendering
      this.map = map

      if (this.$store.state.loading) {
        return
      }

      let geoData = {
        "type": "FeatureCollection",
        "features": transformApiDataToMappableData([this.getLastSighting])
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
  },
  computed: {
    ...mapGetters(['getLastSighting']),
    lastSighting() {
      return this.$store.getters.getLastSighting
    },
  },
  mounted() {
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
