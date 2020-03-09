import React from "react";
import "./Footer.css";

export default () => {
  return (
    <footer>
      <div>
        <span>Copyright © { (new Date()).getFullYear() }</span>
        <div class="spacer"></div>
        <a href="https://github.com/dalematthews/weather-compare">
          <img src="/GitHub-Mark-Light-64px.png"/>
        </a>
      </div>
    </footer>
  );
};
