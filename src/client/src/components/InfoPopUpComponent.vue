// INFO POP UP COMPONENT

<template>
  <div id="pop-up" :style="{ display: popUpVisibility }">
    <div id="title-container">
      <h1>How to use the Acartia map</h1>
      <a id="close-button" @click="close"><img src="../assets/cross.svg"/></a>
    </div>
    
    <p>
      Explore the map, and to expore a data point, click on it to uncover
      more details including the date of the observation, the species spotted, 
      how many times it was seen, and the submitter.
    </p>
    <ul>
      <InfoListItem title="Browse Data Points" img_src="BrowseDataPoints.svg">
        Click on icons on the map to uncover details of the data point, 
        including the date of observation, the species spotted,
        how many times it was seen and the submitter.
      </InfoListItem>

      <InfoListItem title="Filter through data points" img_src="FilterThroughDataPoints.svg">
        Using the panel on the right hand side, you can filter the data points displayed on the map.
        These filters allow you to browse specific days with the date filter, track particular species using 
        the species filter, delve into species groups with the pod filter, select preferred contributions by
        filtering their names, and ensure accuracy by toggling the verification badge filter. 
      </InfoListItem>

      <InfoListItem title="Customise your map view" img_src="CustomizeYourMapView.svg">
        Using the layers panel on the bottom left of the map, you can choose your preferred map type:
        satellite or terrain. Add overlays for shipping lanes, hydrophones, and buoy markers.
      </InfoListItem>

      <InfoListItem title="Contribute your data to be displayed on the map" img_src="ContributeYourDataToBeDisplayedOnTheMap.svg">
        Feeling inspired to share your own observations on the map? You can become a contributor!
        Click on "Contribute" to submit your data following our simple guidelines. Join us in making
        Acartia great!
      </InfoListItem>
    </ul>
  </div>
</template>
<script>
import InfoListItem from "./InfoListItem.vue"

export default {
  name: 'Info',
  components: {
    InfoListItem,
  },

  data() {
    return {
      popUpVisibility: "block",
    }
  },
  methods: {
    close() {
      this.popUpVisibility = "none";
    }
  },
}
</script>
<style scoped>

h1 {
  font-family: "Mukta";
  font-weight: 600;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  display: inline-block;


  margin-left: auto;
  margin-right: auto;
}

p {
  font-family: "Montserrat";
  font-weight: 300; /* should be 400, doesn't look right though */
  font-size: 16px;
  line-height: 22.4px;
  text-align: center;
  margin-top: 15px !important;
  color: #545F71;
}

ul {
  padding:0; 
}

#pop-up {
  background-color: white;
  width: 900px;
  padding: 48px;
  border-radius: 20px;
  margin: auto;
  position: absolute;
  top: 50%;left: 0; right: 0;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 99999;

  /*border-width: 1px;
  border-color: black;
  border-style: solid;*/
}

#close-button {
  display: flex;
  float: right;
  margin: auto;
  height: 32px;
}

#title-container {
  text-align: center;
}
</style>

<!--
TODO:  (delete this comment when finished)
[x] Header 
[x] subtext paragraph
[x] List item implementation
[x] "Browse Data Points" list item
[x] "Filter" List item
[x] "Customize" List item
[x] "Contribute" List item
[x] pop up positioning & styling
[x] X (close) button
[ ] center space the div
[ ] insert into map page
-->