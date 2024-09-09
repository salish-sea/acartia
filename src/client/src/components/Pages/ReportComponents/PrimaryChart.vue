<template>
  <div class="chart-container">
    <div id="primaryChart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'PrimaryChart',
  methods: {
    primaryChart() {
      // set the margins of the graph
      var margin = { top: 70, right: 30, bottom: 50, left: 50 };  // Increase the top margin to make space for the title

      // Select the div and set up the SVG with 100% width and height
      var svg = d3.select("#primaryChart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "400")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Calculate the width and height based on the parent container's dimensions
      var width = document.getElementById("primaryChart").clientWidth - margin.left - margin.right;
      var height = document.getElementById("primaryChart").clientHeight - margin.top - margin.bottom;

      // Add the title
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top + 20)  // Position the title in the top margin area
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Reports Per Month (Year Table)");

      // Dummy data
      var data = [
        { month: 'Jan', "2021": 300, "2022": 350, "2023": 400, "2024": 450 },
        { month: 'Feb', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Mar', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Apr', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'May', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Jun', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Jul', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Aug', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Sep', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Oct', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Nov', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
        { month: 'Dec', "2021": Math.random() * 300, "2022": Math.random() * 300, "2023": Math.random() * 300, "2024": Math.random() * 300 },
      ];

      // List of subgroups = year
      var subgroups = ["2021", "2022", "2023", "2024"];

      // List of groups = months
      var groups = data.map(d => d.month);

      // Add X axis
      var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 300])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y).tickValues([0, 50, 100, 150, 200, 250, 300]));

      // Another scale for subgroup position?
      var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05]);

      // color palette = one color per subgroup
      var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#BEBEFF', '#9D9DFE', '#7C7CFE  ', '#6363CB ']);

      // Tooltip
      var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // Show the bars
      svg.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(" + x(d.month) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
          return subgroups.map(function (key) {
            return { key: key, value: d[key] };
          });
        })
        .enter().append("rect")
        .attr("x", function (d) {
          return xSubgroup(d.key);
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function (d) {
          return height - y(d.value);
        })
        .attr("fill", function (d) {
          return color(d.key);
        })
        .on("mouseover", function (event, d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html("Year: " + d.key + "<br/>Value: " + Math.round(d.value))
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });

      // Legend - Centered
      var legendSpacing = 120; // Increase spacing between legend items
      var legendWidth = subgroups.length * legendSpacing; // Calculate total width needed for legend items
      var legend = svg.append("g")
        .attr("transform", `translate(${(width - legendWidth) / 2}, -40)`);  // Position the legend in the center and a bit higher

      var legendItems = legend.selectAll(".legend-item")
        .data(subgroups)
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", function (_, i) {
          return `translate(${i * legendSpacing}, 0)`;
        });
      legendItems.append("rect")
        .attr("x", 0)
        .attr("width", "3.86406rem")  // Maintain the original width
        .attr("height", "0.80294rem") // Maintain the original height
        .style("fill", color);

      legendItems.append("text")
        .attr("x", "4.5rem")  // Adjusted to place the text correctly
        .attr("y", "0.4rem")   // Centering the text vertically
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d) {
          return d;
        });

    },
  },
  mounted() {
    this.primaryChart()
  },
}

</script>


<style scoped>
#primaryChart {
  color: var(--Neutrals-Black, #0C0826);
  text-align: center;
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}

.chart-container {
  width: 100%;
  flex: 0 0 75%;
  border-radius: 15px;
  background-color: #FFF;
}
</style>
