import React from "react";
import "./Footer.css";

export default () => {
  return (
    <footer>
      <div>
        <span>Copyright © { (new Date()).getFullYear() }</span>
        <div className="spacer"></div>
        <a href="https://github.com/dalematthews/weather-compare">
          <i className="fab fa-2x fa-github"></i>
        </a>
      </div>
    </footer>
  );
};
