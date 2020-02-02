import React, { Component } from "react";
import { connect } from "react-redux";
import { removeCitySelection } from "../../redux/actions";

class DisplayCities extends Component {
  removeCity(i) {
    this.props.removeCitySelection(i);
  }

  render() {
    const displayItmes = ["Add City", "Add City", "Add City", "Add City"];
    this.props.cities.forEach((city, i) => {
      displayItmes[i] = city;
    });
    return displayItmes.map((item, i) => {
      return (
        <div key={i}>
          <p>
            Index:{i} {item}
          </p>
          <button onClick={e => this.removeCity(i)}>REMOVE</button>
        </div>
      );
    });
  }
}

const mapStateToProps = state => {
  const { selectedCities } = state;
  const cities = selectedCities;
  return { cities };
};

const mapDispatchToProps = {
  removeCitySelection
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCities);
