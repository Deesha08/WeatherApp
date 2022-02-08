import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/Home.css"
import Loader from "./Loader";
import WeatherForecast from "./WeatherForecast";
import CurrentWeather from "./CurrentWeather";
import ErrorComponent from "./ErrorComponent";

export default function Home() {
    const [data, setData] = useState({})
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(true)
    const [isError, setIsError]=useState(false)
    const serverURL= process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  

    const getClassNameByWeather = (weatherType) => {
      if(weatherType==="Clouds") return "cloudy"
      else if(weatherType==="Clear") return "clearSky"
      else if(weatherType==="Snow") return "snowy"
      else if(weatherType==="Rain" || weatherType==="Drizzle" ||weatherType==="Thunderstorm"  )  return "gloomy"
      else return "miscWeather"
    }
    const getWeatherByLocation = (params) => {
    setLoading(true);
    const { lat, lon } = params;
    const url = `${serverURL}/weather/detailsByLocation?units=imperial&lat=${lat}&lon=${lon}`;
    axios.get(url).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat=position.coords.latitude
        const lon =position.coords.longitude
        getWeatherByLocation({lat,lon})
      }, err => {
        alert("Website requires location access! Please allow insecure connections from the browser ")
        setLoading(false)
      })
      }, [])
  
      
  
    const getWeatherByCity = (event) => {
      if(event.key === 'Enter') {
      setLoading(true)
        const url=`${serverURL}/weather/detailsByCity?units=imperial&city=${city}`;
        axios.get(url).then((response) => {
          if (response.data.success===false){
            setIsError(true);
            setLoading(false);
          } else {
            setData(response.data);
            setIsError(false);
            setLoading(false);
            setCity("");
          }
          
        })
      }
     
    }
    return (
            <div className={getClassNameByWeather(data?.current?.weather[0].main)+" app"}>
                <div className="title">
                    <h2>Weather & Forecast</h2>
                 </div>
                <div className="search">
                    <input value={city} 
                    onChange={event => setCity(event.target.value)}
                    placeholder="Enter city"
                    onKeyPress={event => getWeatherByCity(event)}
                    type="text" />
                </div>
                <div className="container">

              
                {
                !loading &&  !isError &&
                <div >
                  {
                     data.daily &&  <div className="weatherBackground">
                     <CurrentWeather weatherInfo={data}/>
                  </div>
                  }
                  {
                    data.daily && <div className="weatherBackground">
                      <WeatherForecast weatherInfo={data} />
                      </div>
                        }
                    
                </div>
                }
                  </div>
                <div>
                {
                isError &&
                <ErrorComponent/>
               }
               </div>
                <div>
                    {
                    loading && <Loader/>
                    }
                </div>
            </div>
    );
}