import React from "react";
import { connect } from "react-redux";
import WeatherData from "../../data/weather-data.json";
import { setCitySelection } from "../../redux/actions";

const CitySelection = ({ setCitySelection }) => {
  const cities = Object.keys(WeatherData);
  const cityOptions = cities.map(city => <option key={city}>{city}</option>);

  return (
    <div>
      <select
        multiple
        onChange={e =>
          setCitySelection(
            [...e.target.options].filter(o => o.selected).map(o => o.value)
          )
        }
      >
        {cityOptions}
      </select>
    </div>
  );
};

export default connect(null, { setCitySelection })(CitySelection);
