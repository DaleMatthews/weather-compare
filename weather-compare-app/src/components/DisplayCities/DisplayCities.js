import React, { Component } from "react";
import { connect } from "react-redux";
import CitySelection from "../CitySelection/CitySelection";
import { removeCitySelection } from "../../redux/actions";
import "./DisplayCities.css";

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
      <div key={i} className={`selected-city selected-city--${i}`} onClick={() => this.props.removeCitySelection(city)}>
        <i className="far fa-minus-square"></i>
        <span>{city}</span>
      </div>
    ));

    const addButton =
      <div className="add-city" onClick={() => this.setState({ showDialog: !this.state.showDialog })}>
        <i className="far fa-plus-square"></i>
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
