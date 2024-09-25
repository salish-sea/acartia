<template>
  <div class="reports-container">
    <div class="main-content">
      <div class="reports-header">
        <h2>User Reports</h2>
      </div>
      <div class="contributions-section">
        <h3>Contributions</h3>
        <div id="line-chart" class="chart"></div>
      </div>
      <div class="sightings-section">
        <h3>Sightings per Species</h3>
        <div id="bar-chart" class="chart"></div>
      </div>
      <div class="behaviors-section">
        <h3>Observed Behaviors</h3>
        <div id="pie-chart" class="chart"></div>
      </div>
      <div class="download-button">
        <button>
          Download Reports
          <img
            src="@/assets/user-reports-download-icon.svg"
            alt="Download Icon"
            class="button-icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    this.drawLineChart();
    this.drawBarChart();
    this.drawPieChart();
  },
  methods: {
    drawLineChart() {
      const data = [
        { value: 50, label: "Jan" },
        { value: 70, label: "Feb" },
        { value: 65, label: "Mar" },
        { value: 80, label: "Apr" },
        { value: 60, label: "May" },
        { value: 75, label: "Jun" },
        { value: 81, label: "Jul" },
        { value: 62, label: "Aug" },
        { value: 55, label: "Sep" },
        { value: 60, label: "Oct" }
      ];

      const width = document.getElementById("line-chart").clientWidth;
      const height = width * 0.4; // Responsive height (40% of width)
      const margin = {
        top: height * 0.1,
        right: width * 0.05,
        bottom: height * 0.1,
        left: width * 0.05
      };

      const svg = d3
        .select("#line-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(data.map(d => d.label))
        .range([0, width])
        .padding(0.2);
      const y = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

      const line = d3
        .line()
        .x(d => x(d.label))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX); // Smooth line

      // Add gridlines
      svg
        .append("g")
        .attr("class", "grid")
        .call(
          d3
            .axisLeft(y)
            .tickSize(-width)
            .tickFormat("")
            .ticks(5)
        );

      // Add line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#3D3951")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add dots
      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.label))
        .attr("cy", d => y(d.value))
        .attr("r", height * 0.02)
        .attr("fill", "#3D3951");

      // Add labels on top of the dots
      svg
        .selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.value) - 10)
        .attr("text-anchor", "middle")
        .text(d => d.value)
        .style("font-size", "1.2rem")
        .style("fill", "#3D3951");

      // Add x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add y-axis
      svg.append("g").call(d3.axisLeft(y));

      // Styling the gridlines
      d3.selectAll(".grid line")
        .style("stroke", "#EEF1F4")
        .style("stroke-width", "1px");
      d3.selectAll(".axis path, .axis line").style("stroke", "#3D3951");
    },

    drawBarChart() {
      const data = {
        "Blue Whale": 15,
        "Humpback Whale": 25,
        "Sperm Whale": 10,
        "Fin Whale": 20
      };
      const species = Object.keys(data);
      const sightings = Object.values(data);

      const width = document.getElementById("bar-chart").clientWidth;
      const height = width * 0.4;
      const margin = { top: 20, right: 20, bottom: 40, left: 50 };

      const svg = d3
        .select("#bar-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(species)
        .range([0, width - margin.left - margin.right])
        .padding(0.3);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(sightings)])
        .range([height, 0]);

      svg
        .selectAll(".bar")
        .data(sightings)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(species[i]))
        .attr("y", d => y(d))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d))
        .attr("fill", "#6D6B7D");

      // Add x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add y-axis
      svg.append("g").call(d3.axisLeft(y));

      // Add labels for sightings on top of bars
      svg
        .selectAll(".text")
        .data(sightings)
        .enter()
        .append("text")
        .attr("x", (d, i) => x(species[i]) + x.bandwidth() / 2)
        .attr("y", d => y(d) - 5)
        .attr("text-anchor", "middle")
        .text(d => d)
        .style("font-size", "1rem")
        .style("fill", "#3D3951");
    },

    drawPieChart() {
      const data = { "Behavior A": 704, "Behavior B": 533, "Behavior C": 367 }; // Sample values
      const behaviors = Object.keys(data);
      const counts = Object.values(data);
      const total = counts.reduce((a, b) => a + b, 0);

      const width = document.getElementById("pie-chart").clientWidth;
      const height = width * 0.5;
      const radius = Math.min(width, height) / 2;

      const svg = d3
        .select("#pie-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const color = d3.scaleOrdinal(["#3D3951", "#6D6B7D", "#00AFBA"]);
      const pie = d3.pie().value(d => d);
      const arc = d3
        .arc()
        .innerRadius(radius * 0.7) // Donut chart (innerRadius > 0)
        .outerRadius(radius);

      const arcs = svg
        .selectAll("arc")
        .data(pie(counts))
        .enter()
        .append("g");

      arcs
        .append("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", arc);

      // Add labels outside the donut chart
      const labelArc = d3
        .arc()
        .innerRadius(radius * 1.15)
        .outerRadius(radius * 1.15);

      arcs
        .append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text((d, i) => behaviors[i])
        .style("font-size", "1rem")
        .style("fill", "#3D3951");

      // Display the total in the center of the donut chart
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.2em")
        .style("font-size", "1.5rem")
        .style("font-weight", "bold")
        .style("fill", "#3D3951")
        .text("Total");

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "1.2em")
        .style("font-size", "1.2rem")
        .style("fill", "#6D6B7D")
        .text(total);
    }
  }
};
</script>

<style scoped>
.reports-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  gap: 2rem;
  width: 100%;
}

.main-content {
  width: 90%;
  max-width: 90vw; /* Limits the width of the main content */
}

.reports-header {
  text-align: center;
}
    
.chart {
  margin-top: 1.5rem;
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  max-width: 100vw; /* Limits the width of each chart */
  width: 100%; /* Makes it responsive */
  margin-left: auto;
  margin-right: auto;
}

.download-button {
  text-align: center;
  margin-top: 2rem;
}

button {
  background-color: #00afba;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
}

#line-chart,
#bar-chart,
#pie-chart {
  width: 100%;
  height: auto;
}

text {
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  fill: #3d3951;
}

.axis path,
.axis line {
  stroke: #3d3951;
  shape-rendering: crispEdges;
}

.download-button {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.5rem;
  gap: 0.5rem;
  width: 20.5rem;
  height: 3rem;
  background-color: #00afba;
  color: white;
  border: none;
  border-radius: 0.625rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4;
}

button img {
  width: 1.5rem;
  height: 1.5rem;
}
</style>

