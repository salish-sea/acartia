<template>
  <div id="onboarding" :style="{ display: onboardingVisibility }">
    <img class="preview" src="../assets/orca.jpg"/>
    <div id="content">
      <h1>Welcome to Acartia</h1>
      <p>
        Explore the map, and to explore a data point, click on it to uncover more 
        details including the date of observation, the species spotted, how many times
        it was seen, and the submitter.
      </p>
      <div id="navigation-footer">
        <button class="navigate-btn"><img style="margin: 10" src="../assets/leftArrow.svg"/>Back</button> 
        <div class="progress">
          <span class="active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <button class="navigate-btn">Next<img style="margin: 10" src="../assets/rightArrow.svg"/></button>
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
    }
  }
}
</script>
<style>

h1 {
  font-family: "Mukta";
  font-weight: 600;
  font-size: 32px;
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

#content {
  padding: 60px;
  text-align: center;
}

.preview {
  width: 900px;
  height: 350px;
  border-radius: 20px 20px 0px 0px;
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
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;  

}

#navigation-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}

#onboarding {
  width: 900px;
  height: 624px;
  border-radius: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(8, 13, 38, 0.1);
  background-color: white;

  margin: auto;
  position: absolute;
  top: 50%; left: 0; right: 0;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 99999
}
</style>