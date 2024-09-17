<template>
  <div>
    <MapFilterComponent />
    <div style="z-index:1;" id='mapContainer'></div>
  </div>
</template>

<script>
import MapFilterComponent from './MapFilterComponent.vue'
import mapboxgl from 'mapbox-gl';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { generateMatchExpression, getPopupHtmlString, legendColorMap } from '../mapUtils'
import { mapActions } from 'vuex';

dayjs.extend(customParseFormat)

export default {
  name: 'Map',
  components: {
    MapFilterComponent
  },
  data() {
    return {
      mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
      mapView: null,
    }
  },
  async mounted() {
    if (this.sightings.length === 0) {
      console.log("empty sightings on the map page")
      await this.fill_store()
    }

    this.mapSightings()
  },
  methods: {
    ...mapActions(['fill_store']),
    mapSightings() {
      // Grab access token for Mapbox
      mapboxgl.accessToken = this.mapboxKey

      // Initialise mapbox container
      const map = new mapboxgl.Map({
        container: 'mapContainer',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-122.312490, 47.951812],
        zoom: 7.0
      });


      // Add navigation buttons on top right of the map
      const nav = new mapboxgl.NavigationControl()
      map.addControl(nav, "top-right")

      // Cache map
      this.mapView = map
      // Resize map to fit into screen width
      this.mapView.resize()

      let geoData = {
        "type": "FeatureCollection",
        "features": this.filteredSightings
      }

      const currentPage = this.getParent;

      // On load event
      map.on('load', function () {
        if (currentPage === 'Heatmap') {
          map.addLayer({
            id: 'ssemmi-heat-layer',
            type: 'heatmap',
            source: {
              type: 'geojson',
              data: geoData
            },
            minZoom: 0,
            paint: {
              // increase weight as diameter breast height increases
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'no_sighted'],
                1,
                2,
                3,
                4
              ],
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                3,
                1,
                4,
                3
              ],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,.1)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(233,156,119)',
                1,
                'rgb(227,67,86)'
              ],
              // Adjust the heatmap radius by zoom level
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                20,
                30,
                50
              ],
              // Transition from heatmap to circle layer by zoom level
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                6,
                1,
                9,
                1
              ]
            }
          }
          )
        } else {
          map.addLayer({
            id: 'ssemmi-map-layer',
            type: 'circle',
            source: {
              type: 'geojson',
              data: geoData,
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
        }
      })


      // Click listener to display extra information upon clicking on a sightings point
      map.on('click', 'ssemmi-map-layer', function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({ closeButton: true })
          .setLngLat(coordinates)
          .setHTML(getPopupHtmlString(e.features[0].properties))
          .addTo(map);
      })

      //Save reference to the map for rerendering
      this.$store.commit("setMap", map)
    },
  },
  computed: {
    sightings() {
      return this.$store.state.sightings
    },
    isAuth() {
      return this.$store.state.isAuthenticated
    },
    getParent() {
      return this.$parent.$options.name
    },
    getActiveMapLayer() {
      let activeComponent = this.getParent

      if (activeComponent === "Visualiser") {
        return "ssemmi-map-layer"
      } else if (activeComponent === "Heatmap") {
        return "ssemmi-heat-layer"
      } else if (activeComponent === "Home") {
        return "ssemmi-map-layer"
      } else {
        console.log("Map rendered on incorrect page")
        return ""
      }
    },
    filteredSightings() {
      return this.$store.getters.getFilteredSightings
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

#active-date {
  font-weight: bold;
}

#widget {
  position: fixed;
  width: 30%;
  top: 6vh;
  left: 1vh;
  margin: 10px;
  padding: 10px 20px;
  background-color: white;
  position: absolute;
}

.slider-class {
  margin-left: 5%;
  font-size: 1rem;
}

.widget-row {
  height: 12px;
  width: 100%;
}

.colors {
  background: linear-gradient(to right, #bb0314, #bd2e2e, #e70ca9, #9a0fce, #0f86dc, #1f39a7);
}

.label {
  width: 15%;
  display: inline-block;
  text-align: center;
}
</style>
