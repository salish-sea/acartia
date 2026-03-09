<template>
  <div>
    <div v-if="isOpened" class="panel-open">
      <div class="title-row">
        <h1 class="title">Layers</h1>
        <img class="close-button" :src="require('@/assets/cross.svg')" @click="() => isOpened = false"/>
      </div>

      <hr>

      <h2>Map Type</h2>
      <div class="map-type-row">
        <div class="map-type" @click="toggleMapStyle('light-v10')">
          <img class="option" :class="{ 'option-active': mapStyleIsActive('light-v10')}" :src="require('@/assets/DefaultMapThumbnail.png')" />
          <p>Default</p>
        </div>
        <div class="map-type" @click="toggleMapStyle('satellite-v9')">
          <img class="option" :class="{ 'option-active': mapStyleIsActive('satellite-v9')}" :src="require('@/assets/SatelliteThumbnail.png')" />
          <p>Satellite</p>
        </div>
        <div class="map-type" @click="toggleMapStyle('outdoors-v12')">
          <img class="option" :class="{ 'option-active': mapStyleIsActive('outdoors-v12')}" :src="require('@/assets/TerrainThumbnail.png')" />
          <p>Terrain</p>
        </div>
      </div>

      <hr>

      <h2>Map Overlays</h2>
      <div class="map-type-row">
        <div class="map-type" @click="toggleMapLayer('ssemmi-hydro-layer')">
          <img class="option" :class="{'option-active': mapLayerIsActive('ssemmi-hydro-layer')}" :src="require('@/assets/HydrophoneThumbnail.png')" />
          <p>Hydrophones</p>
        </div>
      </div>
    </div>

    <div v-else class="panel-closed" @click="() => isOpened = true">
      <div class="panel-closed-content">
        <img class="layers-icon" :src="require('@/assets/layers-icon.svg')" />
        <img class="layers-icon-mobile" :src="require('@/assets/layers-icon-mobile.svg')" />
        <p class="closed-text">Layers</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Layers",
  data() {
    return {
      isOpened: false,
    }
  },
  methods: {
    toggleMapStyle(style) {
      //https://docs.mapbox.com/mapbox-gl-js/example/style-switch/
      // TODO: is this likely to break?
      const currentStyle = this.$store.state.map.getStyle().sprite.split('/')[4];
      if ((currentStyle != style) && this.$store.state.map.isStyleLoaded()) {
        this.$store.state.map.setStyle(`mapbox://styles/mapbox/${style}`);
      }
    },
    toggleMapLayer(mapLayerId) {
      const layerVisibility = this.$store.state.map.getLayoutProperty(mapLayerId, 'visibility');
      const newVisibility = layerVisibility === 'visible' ? 'none' : 'visible';
      this.$store.commit('setHydrophonesVisibility', newVisibility);
      this.$store.state.map.setLayoutProperty(mapLayerId, 'visibility', newVisibility);
    },
    mapStyleIsActive(mapStyle) {
      return this.$store.state.map.getStyle().sprite.split('/')[4] === mapStyle;
    },
    mapLayerIsActive(mapLayerId) {
      return this.$store.state.map.getLayoutProperty(mapLayerId, 'visibility') === 'visible';
    }
  }
}

</script>
<style scoped>

hr {
  width: 100%;
  background-color: #9BA5B7;
}

p {
  text-align: center;
  font-family: "Inter";
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;
  margin-top: 5px;
  margin-bottom: 0;
  color: #545F71;
}

h2 {
  font-family: "Inter";
  font-size: 16px;
  font-weight: 500;
  line-height: 22px; 
  color: #545F71;
  margin: 0;
}

.map-type {
  align-items: center;
}

.map-type-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.option {
  width: 75px;
  height: 75px;
  border-radius: 6px;
}

.option-active {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.6);
}

.title-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title {
  font-family: "Inter";
  font-size: 20px;
  line-height: 22px;
  font-weight: 600;
  color: #545F71;
}

.panel-open {
  position: fixed;
  bottom: 25px;
  left: 25px;
  z-index: 998;
  border-radius: 16px;
  width: 343px;
  background-color: #F2F2FF;
  padding: 24px;
}

.panel-closed {
  background-color: white;
  background-image: url("../assets/SatelliteThumbnail.png");
  background-size: 100px 100px;
  width: 100px;
  height: 100px;
  position: fixed;
  bottom: 25px;
  left: 25px;
  z-index: 998;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.panel-closed-content {
  display: flex;
  flex-direction: row;
  height: 25.75px;
  justify-content: center;
  padding-left: 6px;
  padding-right: 6px;
  margin-bottom: 5px;
}

.closed-text {
  width: auto;
  color: white;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin-left: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layers-icon {
  width: 24px;
}

.layers-icon-mobile {
  display: none;
  width: 30px;
}

.close-button {
  cursor: pointer;
}

@media screen and (max-width: 600px) {

  .panel-open {
    bottom: 150px;
  }

  .panel-closed {
    bottom: 12%;
    left: 20px;
    border-radius: 50%;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-image: none;
    padding: 0;
  }

  .panel-closed-content {
    margin: 0;
  }

  .closed-text {
    display: none;
  }

  .layers-icon {
    display: none;
  }

  .layers-icon-mobile {
    display: block;
  }
}

</style>