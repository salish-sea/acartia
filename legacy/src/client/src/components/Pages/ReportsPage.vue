<template>

  <div>
    <LoadingSpinner v-if="isLoading" />

    <div v-else class="all-components-container">

      <div class="top-row">
        <div class="component width-9 ">
          <PrimaryChart />
        </div>
        <div class="component width-3 ">
          <LastSighting />
        </div>
      </div>

      <div class="middle-row ">
        <div class="component width-32">
          <TopContributors />
        </div>
        <div class="component width-36">
          <Stats />
        </div>
        <div class="component width-32">
          <SpeciesDiscovered />
        </div>
      </div>

      <div class="bottom-row ">
        <div class="component width-12 ">
          <TableSightings />
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import PrimaryChart from './ReportComponents/PrimaryChart.vue';
import LastSighting from './ReportComponents/LastSighting.vue';
import TopContributors from './ReportComponents/TopContributors.vue';
import Stats from './ReportComponents/Stats.vue';
import SpeciesDiscovered from './ReportComponents/SpeciesDiscovered.vue';
import TableSightings from './ReportComponents/TableSightings.vue';
import LoadingSpinner from './ReportComponents/LoadingSpinner.vue';

export default {
  name: 'ReportsPage',
  components: {
    PrimaryChart,
    LastSighting,

    TopContributors,
    Stats,
    SpeciesDiscovered,

    TableSightings,

    LoadingSpinner
  },
  methods: {
    ...mapActions(['fill_store']),
  },
  computed: {
    ...mapState({
      isAuth: state => state.isAuthenticated
    }),
    isLoading() {
      return this.$store.state.loading
    },
    lastSighting() {
      return this.$store.state.lastSighting
    }
  },
  async created() {
    if (this.$store.state.sightings.length === 0) {
      await this.fill_store()
    }
  },
}
</script>


<style scoped>
.all-components-container {
  padding: 20px;
  background: #e8e8e8;
}

.top-row {
  display: flex;
  height: 50vh;
  min-height: 50vh;
  gap: 20px;
  margin-bottom: 20px;
}

.bottom-row {
  height: fit-content;
}

.middle-row {
  display: flex;
  height: 30vh;
  min-height: 30vh;
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

.width-36 {
  width: 36%;
}

.width-32 {
  width: 32%;
}

.width-12 {
  width: 100%;
}

.width-8 {
  width: 66%;
}

.width-9 {
  width: 75%;
}


.width-4 {
  width: 33%;
}

@media (max-width: 768px) {

  .width-3,
  .width-8,
  .width-9,
  .width-4,
  .width-32,
  .width-36,
  .width-12 {
    width: 100%;
  }

  .component {
    background: white;
    height: 100%;
    border-radius: 20px;
    padding: 10px;
  }

  .top-row,
  .middle-row {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: fit-content;
  }

  .middle-row {
    display: flex;
    height: auto;
    gap: 20px;
    margin-bottom: 30px;
  }
}
</style>
