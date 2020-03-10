import React, { Component } from "react";
import { connect } from "react-redux";
import CitySelection from "../CitySelection/CitySelection";
import { removeCitySelection } from "../../redux/actions";

class DisplayCities extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
    this.hideDialog = this.hideDialog.bind(this);
  }

  removeCity(i) {
    this.props.removeCitySelection(i);
  }

  hideDialog() {
    this.setState({ showDialog: false });
  }

  render() {
    const selectedCities = this.props.selectedCities.map((city, i) => (
      <div className={`selected-city selected-city--${i}`}>
        <button onClick={() => this.props.removeCitySelection(city)}>-</button>
        <span>{city}</span>
      </div>
    ));

    const addButton =
      <div className="add-city">
        <button onClick={() => this.setState({ showDialog: !this.state.showDialog })}>+</button>
        <span>Add City</span>
      </div>;

    return (
      <div className="display-cities">
        {selectedCities}
        {this.props.selectedCities.length < 4 && addButton}
        {this.state.showDialog && <CitySelection hideDialog={this.hideDialog}/>}
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCities }) => ({ selectedCities });

const mapDispatchToProps = {
  removeCitySelection
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCities);
