<template>
  <div>
    <Info/>
    <MapFilterComponent />
    <div style="z-index:1;" id='mapContainer'></div>
    <Layers />
  </div>
</template>

<script>
import MapFilterComponent from './MapFilterComponent.vue'
import Layers from './MapLayer.vue';
import Info from './InfoPopUpComponent.vue';
import mapboxgl from 'mapbox-gl';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { generateMatchExpression, getPopupHtmlString, legendColorMap } from '../mapUtils'
import { mapActions } from 'vuex';


import mySVG from '../assets/hydrophone-default.svg';

dayjs.extend(customParseFormat)

export default {
  name: 'Map',
  components: {
    MapFilterComponent,
    Layers,
    Info
  },
  data() {
    return {
      mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
      mapView: null,
    }
  },
  async mounted() {
    if (this.sightings.length === 0) {
      await this.fill_store()
    }
    if (this.$store.state.hydrophones.length === 0) {
      await this.get_hydrophone_data();
    }
    this.mapSightings()
  },
  methods: {
    ...mapActions(['fill_store', 'get_hydrophone_data']),
    getActiveMapLayer() {
      let activeComponent = this.getParent

      if (activeComponent === "Visualiser") {
        return "ssemmi-map-layer"
      } else if (activeComponent === "Heatmap") {
        return "ssemmi-heat-layer"
      } else if (activeComponent === "Home") {
        return "ssemmi-map-layer"
      }
    },
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

      const currentPage = this.getParent;

      this.$store.commit("setActiveMapLayer", this.getActiveMapLayer())

      // On load event
      map.on('style.load', () => {

        let geoData = {
          "type": "FeatureCollection",
          "features": this.filteredSightings,
        }
        let hydrophoneGeoData = {
          "type": "FeatureCollection",
          "features": this.hydrophones,
        }

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
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgba(103,169,207,1)',
                0.4, 'rgba(209,229,240,1)',
                0.6, 'rgba(253,219,199,1)',
                0.8, 'rgba(239,138,98,1)',
                1, 'rgba(178,24,43,1)'
              ],
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 15,
                15, 50
              ],
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                14, 1,
                15, 0
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

        // Load Hydrophone Image
        let img = new Image(1000, 1000);
        img.src = mySVG;
        img.onload = () => map.addImage('hydrophone', img);
        const hydrophonesVisibility = this.$store.getters.getHydrophonesVisibility;

        map.addSource('hydrophoneData', { type: 'geojson', data: hydrophoneGeoData });
        map.addLayer({
          id: 'ssemmi-hydro-layer',
          type: 'symbol',
          source: 'hydrophoneData',
          layout: {
            'icon-image': 'hydrophone',
            'icon-size': 0.03,
            'icon-allow-overlap': true,
            'visibility': hydrophonesVisibility,
          },
        })
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
    hydrophones() {
      return this.$store.state.hydrophones;
    },
    isAuth() {
      return this.$store.state.isAuthenticated
    },
    getParent() {
      return this.$parent.$options.name
    },
    filteredSightings() {
      return this.$store.getters.getFilteredSightings
    },
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
