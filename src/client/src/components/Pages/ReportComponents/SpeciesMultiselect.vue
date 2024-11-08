<template>
  <div>
    <span id="date-label">Species</span>
    <multiselect @update:modelValue="setTableFilterSpecies" :modelValue="tableFilters.species"
      :options="mapOptions.species.map(species => { return { name: species } })" :multiple="true"
      :close-on-select="false" :clear-on-select="false" placeholder="All Species" label="name" track-by="name"
      :preselect-first="false" selectLabel="Click to Add" deselectLabel="Click to Remove" openDirection="bottom">
      <template #selection="{ values, search, isOpen }">
        <span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ getStr(values) }} </span>
      </template>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Multiselect
  },
  computed: {
    ...mapState(['mapOptions', 'tableFilters']),
    speciesOptions: {
      get() {
        return this.$store.state.mapOptions.species.map(species => { return { name: species } })
      },
    },
  },
  methods: {
    ...mapMutations(['setTableFilterSpecies']),
    getStr(values) {
      let str = values.reduce((acc, value) => {
        return acc += value.name + ", "
      }, "")

      if (str.length > 40) {
        return str.substring(0, 30) + "..."
      } else {
        return str.substring(0, str.length - 2);
      }
    }
  }
}
</script>

<style src="../../../assets/css/Multiselect.min.css"></style>

<style>
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
</style>
