import React, { Component } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { getSelectedCityData } from "../../redux/selectors";
import "./WeatherChart.css";

class WeatherChart extends Component {
  updateChart = () => {
    const svg = d3.select("#weatherSvg svg");
    svg.selectAll("*").remove();

    const cities = this.props.cities;
    if (cities.length === 0) {
      this.showEmpty();
      return;
    }

    const margin = { top: 20, right: 80, bottom: 30, left: 50 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const line = d3
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    // calculate min and max values
    let maxTemp = cities[0].values[0].temperature;
    let minTemp = maxTemp;
    cities.forEach(city => {
      city.values.forEach(value => {
        if (value.temperature < minTemp) minTemp = value.temperature;
        if (value.temperature > maxTemp) maxTemp = value.temperature;
      });
    });

    x.domain([0, 11]).nice();
    y.domain([minTemp, maxTemp]).nice();

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
      .attr("class", (d, index) => `line line--${index}`)
      .attr("d", d => line(d.values))
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
  };

  showEmpty() {
    // render empty state
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
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

const mapStateToProps = state => {
  const { selectedCities, selectedDataset } = state;
  const cities = getSelectedCityData(state, selectedCities, selectedDataset);
  return { cities, selectedDataset };
};

export default connect(mapStateToProps)(WeatherChart);
