import React, { Component } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { getSelectedCityData } from "../../redux/selectors";
import "./WeatherChart.css";

class WeatherChart extends Component {
  updateChart = () => {
    const svg = d3.select("#weatherSvg svg");
    svg.selectAll("*").remove();

    const cities = this.props.cities.slice(0, 4);
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
      .defined(d => typeof d.temperature === 'number')
      .x(d => x(d.date))
      .y(d => y(d.temperature));

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
      return d3.axisLeft(y).ticks(6);
    }

    // create color mapper
    const color = d3.scaleOrdinal()
      .range(d3.schemeDark2)

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
      .call(d3.axisBottom(x).tickFormat(date => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date]));

    g.append("g")
      .attr("class", "axis axisY")
      .call(d3.axisLeft(y).ticks(6));
    var city = g
      .selectAll(".city")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", "line")
      .attr("d", d => line(d.values))
      .attr("stroke", (d, index) => color(index))

    // city
    //   .append("text")
    //   .datum(d => ({ id: d.id, value: d.values[d.values.length - 1] }))
    //   .attr("transform", d => `translate(${x(d.value.date)},${y(d.value.temperature)})`)
    //   .attr("x", 3)
    //   .attr("dy", "0.35em")
    //   .style("font", "8px sans-serif")
    //   .text(d => d.id);

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
        preserveAspectRatio="xMidYMid meet"
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
