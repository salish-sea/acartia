<template>
  <div class="sidebar">
    <div class="species-legend-content ">
      <div class="species-dropdown">
        <h3 class="species-legend-header ">Species Legend</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4V20M20 12L4 12" stroke="#0C0826" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
      <hr class="hr " />
    </div>

    <!-- /* insert species legend */ -->


    <div class="filter-header-content">
      <h3 class="filter-header">Filter Sightings</h3>
      <p class="filter-header-text">Refine data points displayed on the map by selecting one or multiple filtering
        options, as specified below.</p>
    </div>

    <div class="date-content ">
      <span id="date-label">Date Range</span>

      <div class="date-picker-content ">
        <div class="input-content-from">
          <input class="date-input" type="date" id="dateBegin" name="dateBegin" v-model="dateBegin">
          <span class="date-label">MM/DD/YYYY</span>
        </div>

        <span class="to">to</span>
        <div class="input-content-to ">
          <input class="date-input" type="date" id="dateEnd" name="dateEnd" v-model="dateEnd">
          <span class="date-label">MM/DD/YYYY</span>
        </div>
      </div>
    </div>

    <div class="species-content ">
      <span id="date-label">Species</span>

      <select class="species-select" name="species" id="species" v-model="species">
        <option value="allSpecies">All Species</option>
        <option v-for="option in speciesOptions" :key="option" :value="option">{{ option }}</option>
      </select>

    </div>

    <div class="contributor-content ">
      <span id="date-label">Contributor</span>

      <select class="contributor-select" name="contributor" id="contributor" v-model="contributor">
        <option value="allContributors">All Contributors</option>
        <option v-for="option in contributorOptions" :key="option" :value="option">{{ option }}</option>
      </select>

    </div>

    <!-- Verification Button -->

    <div class="verification-content">
      <div class="left-content">
        <div class="top">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#3D3951" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="verification-header">Verification Badge</span>
        </div>

        <div class="verification-text">
          <span> Only display data that has been verified to be accurate </span>
        </div>
      </div>

      <div class="toggle">
        <label class="toggle-switch">
          <input type="checkbox" v-model="verifiedOnly" class="toggle-checkbox">
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>



    <!-- Reset / Apply Buttons -->
    <div class="btn-container ">
      <span class="filtered-count-text">Showing {{ filteredSightingsLength }} results</span>
      <button class="apply-btn" @click="applyMapFilters">
        Apply Filters
      </button>
      <button class="reset-btn" @click="resetMapFilters">
        Reset Filters
      </button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'MapFilter',
  data() {
    return {
      mapFilters: {
        dateBegin: "",
        dateEnd: new Date().toISOString().slice(0, 10),
      },
    }
  },
  methods: {
    applyMapFilters() {
      this.$store.commit('applyMapFilters')
    },
    resetMapFilters() {
      this.$store.commit("resetMapFilters")
    },
  },
  computed: {
    filterState() {
      return this.$store.getters.getMapFilters
    },
    filteredSightingsLength() {
      return this.$store.getters.getFilteredSightingsLength
    },
    verifiedOnly: {
      get() {
        return this.$store.state.mapFilters.verifiedOnly
      },
      set(value) {
        this.$store.commit('setFilterVerifiedOnly', value)
      }
    },

    contributorOptions: {
      get() {
        return this.$store.state.mapOptions.contributors
      },
    },
    contributor: {
      get() {
        return this.$store.state.mapFilters.contributor
      },
      set(value) {
        this.$store.commit('setFilterContributor', value)
      },
    },
    speciesOptions: {
      get() {
        return this.$store.state.mapOptions.species
      },
    },
    species: {
      get() {
        return this.$store.state.mapFilters.species
      },
      set(value) {
        this.$store.commit('setFilterSpecies', value)
      },
    },
    dateBegin: {
      get() {
        return this.$store.state.mapFilters.dateBegin
      },
      set(value) {
        console.log("setting dateBegin to: ", value)
        this.$store.commit('setFilterDateBegin', value)
      },
    },
    dateEnd: {
      get() {
        return this.$store.state.mapFilters.dateEnd
      },
      set(value) {
        console.log("setting dateEnd to: ", value)
        this.$store.commit('setFilterDateEnd', value)
      },
    }
  },
  mounted() {
  },
  updated() {
  },
}

</script>



<style>
.filtered-count-text {
  color: var(--Neutrals-Gray-80, #3D3951);
  font-family: Mukta;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.1875rem;
  letter-spacing: -0.0175rem;
}

.verification-text {
  text-align: left;
  width: 70%;
  color: var(--Neutrals-Gray-80, #3D3951);
  font-family: Mukta;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.1875rem;
  letter-spacing: -0.0175rem;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

.left-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.verification-header {
  color: var(--Neutrals-Gray-80, #3D3951);
  font-family: Mukta;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.32px;
}

.verification-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.border {
  border: 2px solid red;
}

.toggle-switch {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 24px;
}

.toggle-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider::before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

.toggle-checkbox:checked+.toggle-slider {
  background-color: #2196F3;
}

.toggle-checkbox:checked+.toggle-slider::before {
  transform: translateX(16px);
}

.btn-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.reset-btn {
  border-radius: 0.625rem;
  background: white;
  display: flex;
  height: 3rem;
  width: 10rem;
  padding: 0.625rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: var(--1, 0.5rem);
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: #00AFBA;
}

.apply-btn {
  border-radius: 0.625rem;
  background: var(--Primary-Primary-100, #00AFBA);
  display: flex;
  height: 3rem;
  width: 10rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
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

.contributor-select {
  display: flex;
  width: 100%;
  height: 3rem;
  padding: 0.8125rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0.375rem;
  background: var(--Neutrals-White, #FFF);
  color: var(--Neutrals-Gray-80, #3D3951);
  /* Body 1 */
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  /* 1.4rem */
}

.contributor-content-label {
  font-family: Montserrat;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  padding: 0;
  margin: 0;
}

.contributor-content {
  margin-bottom: 1rem;
  width: 21.5625rem;
  height: 4.5625rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.species-select {
  display: flex;
  width: 100%;
  height: 3rem;
  padding: 0.8125rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0.375rem;
  background: var(--Neutrals-White, #FFF);
  color: var(--Neutrals-Gray-80, #3D3951);
  /* Body 1 */
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  /* 1.4rem */
}

.species-content-label {
  font-family: Montserrat;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  padding: 0;
  margin: 0;
}

.species-content {
  display: flex;
  width: 21.5625rem;
  height: 4.5625rem;
  flex-direction: column;
  align-items: flex-start;
}

.date-input {
  border-radius: 0.375rem;
  border-width: 1px;
  height: 3rem;
  color: var(--Neutrals-Gray-60, #6D6B7D);
  /* Caption 1 */
  font-family: Montserrat;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  /* 1.05rem */
  width: 20rem;
}

.input-content-from {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.input-content-to {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}


.date-label {
  color: var(--Neutrals-Gray-60, #6D6B7D);
  /* Caption 1 */
  font-family: Montserrat;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  /* 1.05rem */
}

.date-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.date-picker-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.species-legend-header {
  color: var(--Neutrals-Gray-80, #3D3951);
  font-family: Mukta;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  text-align: left;
  padding-bottom: 0.5rem;
}

.species-legend-content {
  width: 100%;
}

.filter-header-content {
  width: 100%;
}

.hr {
  border-color: rgba(8, 13, 38, 0.15);
  border-width: 4px;
}

#date-label {
  color: var(--Neutrals-Gray-80, #3D3951);
  font-family: "Mukta";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.1875rem;
  letter-spacing: -0.0175rem;
  margin-bottom: 5px;
}

.filter-header-text {
  color: var(--Neutrals-Gray-80, #3D3951);
  width: 21.5625rem;
  font-family: Mukta;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  text-align: left;
}


.sidebar {
  height: 100%;
  width: 26.0625rem;
  display: flex;
  flex-direction: column;
  background-color: #f0fbfb;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: 56;
  overflow-y: auto;
  z-index: 999;
  padding: 2.25rem;
  align-items: center;
  gap: 1.5rem;
}

.border {
  border: "5px black solid"
}

.filter-header {
  /* 1.575rem */
  font-family: Mukta;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  /* 1.575rem */
  text-align: left;
}

#species-filter {
  margin-top: 2rem;
}

.species-dropdown {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.species-dropdown:hover {
  cursor: pointer;
}


.sidebar h2 {
  margin-top: 2rem;
}

form {
  margin-bottom: 20px;
}

.button {
  margin-top: 2rem;
}

label {
  display: block;
  width: 100%;
  height: 2rem;
  font-weight: 500;
  padding-top: 5px;
}

input[type="date"],
select {
  width: 70%;
  padding: 8px;
  margin-bottom: 10px;
}

input {
  max-width: 70%;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  border: 1px solid #4caf50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
