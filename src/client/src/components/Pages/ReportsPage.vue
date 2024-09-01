<template>
  <div class="all-components-container">

    <div class="top-row">
      <div class="component width-9 ">
        <PrimaryChart />
      </div>
      <div class="component width-3 ">
        <LastSighting />
      </div>
    </div>

    <div class="middle-row ">
      <div class="component width-4 ">
        <TopContributors />
      </div>
      <div class="component width-4 ">
        <Stats />
      </div>
      <div class="component width-4 ">
        <SecondaryChart />
      </div>
    </div>

    <div class="bottom-row ">
      <div class="component width-12 ">
        <TableSightings />
      </div>
    </div>

  </div>
</template>

<script>
import { transformApiDataToMappableData, getSpeciesAndContributors, sortApiDataChronologically } from '../../mapUtils'
import PrimaryChart from './ReportComponents/PrimaryChart.vue';
import LastSighting from './ReportComponents/LastSighting.vue';
import TopContributors from './ReportComponents/TopContributors.vue';
import Stats from './ReportComponents/Stats.vue';
import SecondaryChart from './ReportComponents/SecondaryChart.vue';
import TableSightings from './ReportComponents/TableSightings.vue';

export default {
  name: 'ReportsPage',
  components: {
    PrimaryChart,
    LastSighting,

    TopContributors,
    Stats,
    SecondaryChart,

    TableSightings
  },
  created() {
    if (this.$store.getters.getSightings.length == 0) {
      this.$store.dispatch("get_sightings")
        .then((currSights) => {
          let dataPoints = sortApiDataChronologically(currSights)
          let lastSighting = dataPoints[dataPoints.length - 1]
          this.$store.commit("setLastSighting", lastSighting)

          dataPoints = transformApiDataToMappableData(dataPoints)
          let { speciesList, contributorList } = getSpeciesAndContributors(dataPoints)

          this.$store.commit("setMapOptions", {
            contributors: contributorList,
            species: speciesList
          })

          this.$store.commit("setSightings", dataPoints)
        })
    }
  },
}

</script>


<style scoped>
.all-components-container {
  padding: 10px;
  background: #e8e8e8;
}

.top-row {
  display: flex;
  height: 50vh;
  flex-wrap: nowrap;
  gap: 20px;
  margin-bottom: 20px;
}

.bottom-row {
  height: fit-content;
}

.middle-row {
  display: flex;
  height: 30vh;
  flex-wrap: nowrap;
  gap: 20px;
  margin-bottom: 30px;
}


.component {
  background: white;
  height: 100%;
  border-radius: 20px;
  padding: 10px;
}

.width-3 {
  width: 25%;
}

.width-12 {
  width: 100%;
}

.width-9 {
  width: 75%;
}

.width-4 {
  width: 33%;
}
</style>
