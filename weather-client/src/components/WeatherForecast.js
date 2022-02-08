import React from "react";

import Forecast from "./Forecast";

import "../styles/WeatherForecast.css";

export default  function WeatherForecast({ weatherInfo }) {
  const date = dateBuilder(new Date());
  function dateBuilder(d) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const date = [];

    for (let count = 0; count < 5; count++) {
      if (d.getDay() + count < 7) date[count] = d.getDay() + count;
      else if (d.getDay() + count === 7) date[count] = 0;
      else if (d.getDay() + count === 8) date[count] = 1;
      else if (d.getDay() + count === 9) date[count] = 2;
      else if (d.getDay() + count === 10) date[count] = 3;
    }

    return [
      days[date[0]],
      days[date[1]],
      days[date[2]],
      days[date[3]],
      days[date[4]]
    ];
  }

  return (
    <div className="weatherForecast">
        {
            weatherInfo && 
            <div className="weatherForecastContainer">
               {
               [...Array(5)].map((e, i) => 
        <Forecast key={i} weatherInfo={weatherInfo?.daily[i]} date={date[i]}/>
               )}
            </div>
        }
    </div>
  );
}

