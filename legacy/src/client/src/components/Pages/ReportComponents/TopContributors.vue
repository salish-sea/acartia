<template>
  <div class="content">
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
        return contributors.slice(0, 3)
      }

      return contributors
    },
  },
}
</script>

<style scoped>
.content {
 height:100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

h2 {
  font-family: Mukta;
  font-size:calc(14px + 0.4vw);
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  text-align: center;
}

dt {
  text-align: center;
  font-family: Mukta;
  font-size:calc(14px + 0.4vw);
  font-style: normal;
  font-weight: 400;
}

dd {
  font-family: Montserrat;
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
  padding: 1vh;
  justify-content: space-between;
  align-items: center;
  font-size:calc(14px + 0.4vw);
  width: 100%;
}

.top-contributors {
  padding: 1rem;
}
</style>
