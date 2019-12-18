import React, { Component } from "react";
import * as d3 from "d3";
import "./WeatherChart.css";

class WeatherChart extends Component {
  componentDidMount() {
    const testData = {
      "BIRMINGHAM, AL": {
        "Normal Precipitation": [
          4.84,
          4.53,
          5.23,
          4.38,
          4.99,
          4.38,
          4.8,
          3.93,
          3.9,
          3.44,
          4.85,
          4.45,
          53.72
        ],
        "Normal Snowfall": [0.6, 0.1, 0.6, 0.2, 0, 0, 0, 0, 0, 0, 0, 0.1, 1.6]
      },
      "HUNTSVILLE, AL": {
        "Normal Precipitation": [
          4.89,
          4.84,
          5.21,
          4.32,
          5.11,
          4.29,
          4.05,
          3.61,
          3.72,
          3.59,
          4.94,
          5.77,
          54.34
        ],
        "Normal Snowfall": [1.1, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 2.4]
      },
      "MOBILE, AL": {
        "Normal Precipitation": [
          5.65,
          5.12,
          6.14,
          4.79,
          5.14,
          6.11,
          7.25,
          6.96,
          5.11,
          3.69,
          5.13,
          5.06,
          66.15
        ],
        "Normal Snowfall": [0, 0.1, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2]
      }
    };

    const svg = d3.select("#weatherSvg svg"),
      margin = { top: 20, right: 80, bottom: 30, left: 50 },
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom,
      g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height, 0]);

    const line = d3
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    const cities = Object.keys(testData).map(function(id) {
      return {
        id: id,
        values: testData[id]["Normal Precipitation"]
          .slice(0, 12)
          .map((d, idx) => {
            return {
              date: idx,
              temperature: d
            };
          })
      };
    });

    x.domain([0, 11]).nice();
    y.domain([0, 8]).nice();

    function make_y_gridlines() {
      return d3.axisLeft(y).ticks(4);
    }

    svg
      .append("g")
      .attr("class", "grid gridY")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(
        make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      );

    g.append("g")
      .attr("class", "axis axisX")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(4));

    g.append("g")
      .attr("class", "axis axisY")
      .call(d3.axisLeft(y).ticks(4));
    var city = g
      .selectAll(".city")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", function(d) {
        return "line " + d.id;
      })
      .attr("d", function(d) {
        return line(d.values);
      })
      .attr("stroke-width", 2)
      .attr("stroke", "black");

    city
      .append("text")
      .datum(function(d) {
        return { id: d.id, value: d.values[d.values.length - 1] };
      })
      .attr("transform", function(d) {
        return (
          "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"
        );
      })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) {
        return d.id;
      });

    svg.selectAll(".domain").remove();
  }

  render() {
    return (
      <svg
        id="weatherSvg"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMinYMin slice"
        width="100%"
        height="100%"
      >
        <svg width="500" height="500"></svg>
      </svg>
    );
  }
}

export default WeatherChart;
