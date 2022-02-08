import React from "react";

import "../styles/Forecast.css";

export default function Forecast({ weatherInfo, date }) {
  return (
    <div className="forecastMain">
      <p className="forecastTitle">{[date[0], date[1], date[2]]}</p>
      <img
        className="forecastIcon"
        src={
          "https://openweathermap.org/img/wn/" +
          weatherInfo.weather[0].icon +
          ".png"
        }
        alt={weatherInfo.weather[0].main}
      />
      <div className="forecastTemp">
        <span className="tempMax">
          {Math.round(weatherInfo.temp.max)}
          <sup>°</sup>
        </span>
        <span className="tempMin">
          {Math.round(weatherInfo.temp.min)}
          <sup>°</sup>
        </span>
      </div>
    </div>
  );
}