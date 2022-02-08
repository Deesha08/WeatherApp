import "../styles/CurrentWeather.css";

export default function CurrentWeather({weatherInfo}) {
    return(
        <div>
            <div className="top">
                <div className="location">
                  <p>{weatherInfo.city}</p>
                </div>
                <div className="temp">
                      <h1>{weatherInfo.current?.temp.toFixed()}°F</h1>
                      <div className="description">
                          <img
                              className="currentIcon"
                              src={
                                "https://openweathermap.org/img/wn/" +
                                weatherInfo?.current?.weather[0].icon +
                                ".png"
                              }
                              alt={weatherInfo?.current?.weather[0].main}
                          />
                          <div className="weatherDesc">
                           {weatherInfo.current?.weather? weatherInfo.current.weather[0].description: null}
                           </div>
                      </div>
                </div>
                
          </div>
        <div className="bottom">
            <div className="feels">
              <p className="bold"> {weatherInfo.current?.feels_like.toFixed()}</p>
              <p className="subDesciption">Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold"> {weatherInfo.current?.humidity}%</p>
              <p className="subDesciption">Humidity</p>
            </div>
            <div className="wind">
                <p className="bold"> {weatherInfo.current?.wind_speed} MPH</p>
                <p className="subDesciption">Wind Speed</p>
            </div>
        </div>
      </div>
    );
}
