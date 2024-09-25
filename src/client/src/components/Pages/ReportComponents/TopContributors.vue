<template>
  <div class="">
    <h2>Top Contributors</h2>
    <dl>
      <div class="definition-item" v-for="(contributor, index) of topContributors" :key="index">
        <dt>{{ index + 1 }}) {{ contributor[0] }}</dt>
        <dd>{{ contributor[1] }}</dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'ReportsPage',
  computed: {
    topContributors() {
      let contribObj = this.$store.getters.getSightings.reduce((count, sighting) => {
        if (!count[sighting.properties.witness]) {
          count[sighting.properties.witness] = 1
        } else {
          count[sighting.properties.witness]++
        }
        return count
      }, {})

      let contributors = Object.entries(contribObj).sort((a, b) => {
        if (a[1] > b[1]) {
          return -1
        } else {
          return 1
        }
      })

      if (contributors.length > 4) {
        return contributors.slice(0, 4)
      }

      return contributors
    },
  },
}
</script>

<style scoped>
h2 {
  font-family: Mukta;
  font-size: 1.5rem !important;
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  text-align: center;
}

dt {
  text-align: center;
  font-family: Mukta;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
}

dd {
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.space {
  margin: 1rem;
}

.shape {
  border-radius: 15px;
  background-color: #FFF;
  padding: 1.5rem;
  margin-bottom: 1rem;
}


.definition-item {
  display: flex;
  padding: .7rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.top-contributors {
  padding: 1rem;
}
</style>
