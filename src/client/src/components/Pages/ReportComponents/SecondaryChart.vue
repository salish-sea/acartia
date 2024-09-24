<template>
  <div>
    <h2>Species Discovered(Monthly)</h2>
    <div id="species-chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'SecondaryChart',
  methods: {
    secondaryChart() {
      var data = [
        { species: 'Killer Whales', value: Math.random() * 10 + 1 },
        { species: 'Humpback', value: Math.random() * 10 + 1 },
        { species: "Dall's Porpoise", value: Math.random() * 10 + 1 },
        { species: 'Gray Whales', value: Math.random() * 10 + 1 }
      ];

      var margin = { top: 20, right: 20, bottom: 30, left: 80 },
        width = 400 - margin.left - margin.right,
        height = 180 - margin.top - margin.bottom;

      var svg = d3.select("#species-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "200")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, 10]);

      var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1)
        .domain(data.map(function (d) { return d.species; }));

      svg.append("g")
        .call(d3.axisLeft(y));

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function (d) { return d < 10 ? d : "10+"; }));

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", function (d) { return y(d.species); })
        .attr("width", function (d) { return x(d.value); })
        .attr("height", y.bandwidth())
        .attr("fill", function (_, i) {
          var colors = ['#4D76B8', '#5FAAFF', '#224DBA', '#9DC4E8'];
          return colors[i];
        });
    }
  },
  mounted() {
    this.secondaryChart()
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
  /* 1.575rem */
}

#species-chart {
  width: 100%;
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
