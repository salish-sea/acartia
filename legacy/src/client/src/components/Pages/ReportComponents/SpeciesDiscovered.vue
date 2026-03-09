<template>
  <div class="content">
    <h2>Species Discovered(Monthly)</h2>
    <div id="species-chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { getSpeciesCounts } from '../../../mapUtils'

export default {
  name: 'SecondaryChart',
  methods: {
    secondaryChart() {

      let data = getSpeciesCounts(this.$store.state.sightings).slice(0, 5)

      let margin = { top: 10, right: 10, bottom: 20, left: 80 }
      // Calculate the width and height based on the parent container's dimensions
      let width = document.getElementById("species-chart").clientWidth
      let height = document.getElementById("species-chart").clientHeight - 100

      let svg = d3.select("#species-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Determine the minimum and maximum values from the data
      const xMin = d3.min(data, d => d.value);
      const xMax = d3.max(data, d => d.value);

      // Create the x scale with the appropriate domain based on the data
      let x = d3.scaleLinear()
        .range([0, width])
        .domain([xMin, xMax]);

      let y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1)
        .domain(data.map(d => d.species));

      svg.append("g")
        .call(d3.axisLeft(y));

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(d => d < xMax ? d : `${xMax}+`));

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.species))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth())
        .attr("fill", (_, i) => {
          let colors = ['#4D76B8', '#5FAAFF', '#224DBA', '#9DC4E8'];
          return colors[i];
        });
    }
  },
  mounted() {
    this.secondaryChart()
    getSpeciesCounts(this.$store.state.sightings)
  },
}

</script>


<style scoped>
.content {
  padding: 20px;
}

h2 {
  font-family: Mukta;
  font-size: 1.5rem !important;
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  text-align: center;
  /* 1.575rem */
}

#species-chart {
  width: 100%;
  height: 25vh;
}

.shape {
  border-radius: 15px;
  background-color: #FFF;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.space {
  margin: 1rem;
}
</style>
