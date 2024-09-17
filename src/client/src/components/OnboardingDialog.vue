<template>
  <div id="onboarding" :style="{ display: onboardingVisibility }">
    <img v-if="slideNo===0" class="preview" src="../assets/orca.jpg"/>
    <img v-if="slideNo===1" class="preview" src="../assets/FilterThroughDataPoints.svg"/>
    <img v-if="slideNo===2" class="preview" src="../assets/CustomizeYourMapView.svg"/>
    <img v-if="slideNo===3" class="preview" src="../assets/ContributeYourDataToBeDisplayedOnTheMap.svg"/>
    <img v-if="slideNo===4" class="preview" src="../assets/ManyOrcas.svg"/>

    <div class="text-container">
      <div v-if="slideNo===0" class="content">
        <h1>Welcome to Acartia</h1>
        <p>
          Explore the map, and to explore a data point, click on it to uncover more 
          details including the date of observation, the species spotted, how many times
          it was seen, and the submitter.
        </p>
      </div> 

      <div v-if="slideNo===1" class="content">
        <h1>Use filters to Customize your Experience</h1>
        <p>
          Explore specific days with the date filter, track particular species using the species filter,
          delve into species groups with the pod filter, select preferred contributors by filtering their
          names, and ensure accuracy by toggling the verification badge filter.
        </p>
      </div> 

      <div v-if="slideNo===2" class="content">
        <h1>Customize the Map View</h1>
        <p>
          Make the map your own! Head to the layers panel and choose your preferred map type: satellite
          or terrain. Add overlays for shipping lanes, hydrophones, and buoy markers.
        </p>
      </div> 

      <div v-if="slideNo===3" class="content">
        <h1>Sign up to be a Contributor</h1>
        <p>
          Explore the map, and to explore a data point, click on it to uncover more 
          details including the date of observation, the species spotted, how many times
          it was seen, and the submitter.
        </p>
      </div> 

      <div v-if="slideNo===4" class="content">
        <h1>Learn & Enjoy</h1>
        <p>
          Welcome to the Acartia community! Take your time to explore, learn, and enjoy.
          We're thrilled to have you on board!
        </p>
      </div>

      <div id="navigation-footer">

        <button class="navigate-btn" @click="changeSlide(slideNo-1)">
          <img style="margin-right: 10" src="../assets/leftArrow.svg"/>
          Back
        </button> 

        <div v-if="slideNo < 4" class="progress">
          <span :class="dotClass(0)"></span>
          <span :class="dotClass(1)"></span>
          <span :class="dotClass(2)"></span>
          <span :class="dotClass(3)"></span>
        </div>

        <div v-if="slideNo === 4">
          <input type="checkbox" id="dontshow"/>
          <label for="dontshow">Do not show this again</label>
        </div>

        <button v-if="slideNo < 4" class="navigate-btn" @click="changeSlide(slideNo+1)">
          Next
          <img style="margin-left: 10" src="../assets/rightArrow.svg"/>
        </button>

        <button v-if="slideNo === 4" class="navigate-btn" @click="changeSlide(slideNo+1)">
          Finish
          <img style="margin-left: 10" src="../assets/rightArrow.svg"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Onboarding",
  data() {
    return {
      onboardingVisibility: 'block',
      slideCount: 5,
      slideNo: 0,
    }
  },
    
  methods: {
    changeSlide(slide) {
      this.slideNo = slide;
      if (this.slideNo > this.slideCount - 1)
        this.slideNo = 0;
      else if (this.slideNo < 0)
        this.slideNo = this.slideCount - 1;
    },

    dotClass(dotNo) {
      return dotNo === this.slideNo ? "active" : "dot";
    },
  },
}

</script>
<style scoped>

h1 {
  font-family: "Mukta";
  font-weight: 500 !important;
  font-size: 32px !important;
  line-height: 36px;
  color: #545F71;
}

p {
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #545F71;
}

label {
  font-family: "Montserrat";
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  margin-left: 15px;
}

.text-container {
  height: 274;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 60px 50px 60px;

  border-radius: 0px 0px 20px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(8, 13, 38, 0.1);
  background-color: white;
}

.content {
  text-align: center;
}

.preview {
  width: 900px;
  height: 350px;
  border-radius: 20px 20px 0px 0px;
  background-color: #d6d6d6;
}

.progress {
  background-color: white;
}
.dot {
  width: 13px;
  height: 13px;
  cursor: pointer;
  border-radius: 50%;
  border: 1.5px solid rgba(8, 13, 38, 0.1);
  margin-left: 6px;
  margin-right: 6px;
}

.active {
  width: 13px;
  height: 13px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #545F71;
  background-color: #545F71;
  margin-left: 6px;
  margin-right: 6px;
}

.navigate-btn {
  background: none;
  color: #545F71;
  border: none;
  font: inherit;
  font-weight: 400;
  cursor: pointer;
  outline: inherit;  
  display: flex;
  flex-direction: row;

}

#navigation-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#onboarding {
  width: 900px;
  height: 624px;
  margin: auto;
  position: absolute;
  top: 50%; left: 0; right: 0;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 99999
}
</style>