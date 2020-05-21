import React from "react";
import "./Header.css";

export default () => {
  return (
    <header>
      <span>
        Crayton<span className="emerson">Emerson</span>
      </span>
      <h1>US Weather Comparison</h1>
      <p>
        Explore a collection of U.S. cities to compare different types of
        weather conditions.
      </p>
      <span>
        Read more about the data{" "}
        <a href="https://www.ncdc.noaa.gov/ghcn/comparative-climatic-data">
          here
        </a>
        .
      </span>
    </header>
  );
};
