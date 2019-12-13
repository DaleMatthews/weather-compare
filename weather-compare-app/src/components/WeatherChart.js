import React, { Component } from "react";
import * as input from "../data/weather-data.json";
import * as d3 from "d3";

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

    const dummyData = {};

    const addData = name => {
      dummyData[name] = { ...testData[name] };
    };
    addData("BIRMINGHAM, AL");
    console.log(dummyData["BIRMINGHAM, AL"]["Coldest"]);

    const _svg = d3.select("#weatherSvg svg"),
      _margin = { top: 20, right: 80, bottom: 30, left: 50 },
      _width = _svg.attr("width") - _margin.left - _margin.right,
      _height = _svg.attr("height") - _margin.top - _margin.bottom,
      _g = _svg
        .append("g")
        .attr(
          "transform",
          "translate(" + _margin.left + "," + _margin.top + ")"
        );

    const _x = d3.scaleLinear().range([0, _width]),
      _y = d3.scaleLinear().range([_height, 0]);

    const _line = d3
      .line()
      .x(function(d) {
        return _x(d.date);
      })
      .y(function(d) {
        return _y(d.temperature);
      });

    const _cities = Object.keys(dummyData).map(function(id) {
      return {
        id: id,
        values: dummyData[id]["Normal Precipitation"]
          .slice(0, 12)
          .map((d, idx) => {
            return {
              date: idx,
              temperature: d
            };
          })
      };
    });

    _x.domain([0, 11]).nice();
    _y.domain([0, 8]).nice();

    function new__make_x_gridlines() {
      return d3.axisBottom(_x).ticks(4);
    }

    function new_make_y_gridlines() {
      return d3.axisLeft(_y).ticks(4);
    }

    _svg
      .append("g")
      .attr("class", "grid gridY")
      .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")")
      .call(
        new_make_y_gridlines()
          .tickSize(-_width)
          .tickFormat("")
      );

    _svg
      .append("g")
      .attr("class", "grid gridX")
      .attr(
        "transform",
        "translate(" + _margin.left + "," + (_height + _margin.top) + ")"
      )
      .call(
        new__make_x_gridlines()
          .tickSize(-_height)
          .tickFormat("")
      );

    _g.append("g")
      .attr("class", "axis axisX")
      .attr("transform", "translate(0," + _height + ")")
      .call(d3.axisBottom(_x).ticks(4));

    _g.append("g")
      .attr("class", "axis axisY")
      .call(d3.axisLeft(_y).ticks(4))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000");

    var _city = _g
      .selectAll(".city")
      .data(_cities)
      .enter()
      .append("g")
      .attr("class", "city");

    _city
      .append("path")
      .attr("class", function(d) {
        return "line " + d.id;
      })
      .attr("d", function(d) {
        return _line(d.values);
      })
      .attr("stroke-width", 2)
      .attr("stroke", "black");

    _city
      .append("text")
      .datum(function(d) {
        return { id: d.id, value: d.values[d.values.length - 1] };
      })
      .attr("transform", function(d) {
        return (
          "translate(" + _x(d.value.date) + "," + _y(d.value.temperature) + ")"
        );
      })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) {
        return d.id;
      });
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
