<template>

  <!-- Third column-->
  <div class="bottom-row table-row-container">
    <div class="table-header-container">

      <div class="table-header">
        <h3>Table Sighting</h3>
      </div>

      <div class="table-input-container">
        <SpeciesMultiselect />

        <ContributorMultiselect />

        <div class="date-content ">
          <span id="date-label">Date</span>
          <input class="date-input" type="date" id="date" name="date" v-model="dateEnd">
        </div>

        <button class="apply-btn" @click="applyTableFilters">
          Filter
          <img src="../../../assets/icon-filter.svg" alt="filter icon" />
        </button>
      </div>

    </div>


    <table v-if="!isMobile" class="table table-bordered">
      <thead>
        <tr>
          <th>Sighting ID</th>
          <th>Date</th>
          <th>Contributor</th>
          <th>Species</th>
          <th>Location</th>
        </tr>
      </thead>

      <tbody v-if="tableSightings.length == 0">
        <tr>
          <td colspan="6">
            No data available
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-for="(sighting, index) of tableSightings" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ sighting.properties.created }} </td>
          <td>{{ sighting.properties.witness }}</td>
          <td>{{ sighting.properties.type }}</td>
          <td>Lat: {{ sighting.geometry.coordinates[0] }} Long: {{ sighting.geometry.coordinates[1] }} </td>
        </tr>
      </tbody>
    </table>


    <!-- mobile table  -->

    <table v-else class="table">
      <tbody v-if="tableSightings.length == 0">
        <tr>
          <td colspan="6">
            No data available
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-for="(sighting, index) of tableSightings" :key="index">
          <td class="mobile-data-entry">
            <p>{{ sighting.properties.created }} </p>
            <p> {{ sighting.properties.entity }}</p>
            <p> {{ sighting.properties.type }}</p>
            <p> Lat: {{ sighting.geometry.coordinates[0] }} Long: {{ sighting.geometry.coordinates[1] }} </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!viewingMore && tableSightings.length > 5" class="view-more">
      <a @click="toggleViewMore">View More <img src="../../../assets/Icon-arrow.svg" alt="Icon" width="40"
          height="40"></a>
    </div>

    <div v-else-if="viewingMore && tableSightings.length > 5" class="view-more">
      <a @click="toggleViewMore">View Less <img src="../../../assets/Icon-arrow.svg" alt="Icon" width="40"
          style="transform: rotate(180deg);" height=" 40"></a>
    </div>
  </div>

</template>

<script>
import ContributorMultiselect from './ContributorMultiselect.vue';
import SpeciesMultiselect from './SpeciesMultiselect.vue';

const MOBILE_BREAKPOINT = 600

export default {
  name: 'TableSightings',
  components: {
    SpeciesMultiselect,
    ContributorMultiselect
  },
  data() {
    return {
      viewingMore: false,
      screenWidth: window.innerWidth,
    }
  },
  created() {
    this.$store.commit('applyTableFilters')
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth
    },
    toggleViewMore() {
      this.viewingMore = !this.viewingMore
    },
    applyTableFilters() {
      this.$store.commit('applyTableFilters')
    }
  },
  computed: {
    isMobile() {
      return this.screenWidth <= MOBILE_BREAKPOINT
    },
    species: {
      get() {
        return this.$store.state.tableFilters.species
      },
      set(value) {
        this.$store.commit('setTableFilterSpecies', value)
      },
    },
    dateBegin: {
      get() {
        return this.$store.state.tableFilters.dateBegin
      },
      set(value) {
        this.$store.commit('setTableFilterDate', value)
      },
    },
    dateEnd: {
      get() {
        return this.$store.state.tableFilters.dateEnd
      },
      set(value) {
        this.$store.commit('setTableFilterDate', value)
      },
    },
    tableSightings() {
      if (this.viewingMore) {
        return this.$store.getters.getTableSightings
      } else {
        return this.$store.getters.getTableSightings.slice(0, 6)
      }
    },
    speciesOptions: {
      get() {
        return this.$store.state.mapOptions.species
      },
    },
  },
}

</script>


<style scoped>
.filter-icon {
  width: 50px;
  height: 50px;
  fill: #000;
}

.apply-btn {
  border-radius: 0.625rem;
  background: var(--Primary-Primary-100, #00AFBA);
  display: flex;
  height: 3.3rem;
  margin-top: 1.3rem;
  width: 10rem;
  padding: 0.625rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: var(--1, 0.5rem);
  color: var(--Neutrals-White, #FFF);
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}

.bottom-row {
  border-radius: 1rem;
  background: white;
  padding: 1.5rem;
}

.table-row-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
}

.table-header {
  font-family: Mukta;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 900;
  line-height: 105%;
}


.table-header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}

.table-input-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.date-input {
  display: flex;
  border: 0.5px solid black;
  height: 3.2rem;
  padding: 0.8125rem 0.75rem;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.375rem;
  background: var(--Neutrals-White, #FFF);
  color: var(--Neutrals-Gray-80, #3D3951);
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.date-content {
  display: flex;
  height: 4.5625rem;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;
}

#date-label {
  color: var(--Neutrals-Gray-80, #3D3951);
  font-family: Mukta;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.1875rem;
  letter-spacing: -0.0175rem;
  margin-bottom: 5px;
}

.table-container {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 15px;
}

table {
  color: var(--Neutrals-Black, #0C0826);
  text-align: center;
  font-family: Mukta;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  letter-spacing: -0.0225rem;
}

.table th {
  background-color: #d4c8fc;
  color: #2c2c54;
  text-align: center;
  vertical-align: middle;
  padding: 1.37625rem 0rem 1.37375rem 0rem;
}

.table td {
  text-align: center;
  vertical-align: middle;
  color: #2c2c54;
  padding: 1.375rem;
}

a {
  text-decoration: none;
}

.view-more {
  text-align: right;
  padding-top: 10px;
}

.view-more a {
  color: #0C0826;
  text-decoration: none;
  font-family: Mukta;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
}

.view-more a:hover {
  text-decoration: underline;
}

.filter-btn {
  background-color: #00AFBA;
  color: #F0FBFB;
  display: flex;
  width: 6.125rem;
  height: 3rem;
  border-radius: 0.375rem;
  justify-content: center;
  align-items: center;
  border: none;
}

.table-mobile {
  display: none;
}

@media (max-width: 600px) {
  .table-header-container {
    flex-direction: column;
  }

  .table-input-container {
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }

  .table-mobile {
    display: block;
    width: 100%;
  }

  .table-mobile tr td {
    width: 100%
  }

  .table-bordered {
    display: none;
  }

  .date-input {
    width: 350px;
  }

  .mobile-data-entry {
    width: 200px;
  }
}
</style>
