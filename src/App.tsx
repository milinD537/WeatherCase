import { useEffect, useState } from 'react'
import './App.css'
import { IoMoon, IoSunny } from "react-icons/io5";
// import weatherJSON from './lib/apiDummy.json'
// import weatherJSONRain from './lib/apiDummyRain.json'
import weatherForecastJSON from './lib/apiForecastDummy.json'
import { FaLocationArrow } from 'react-icons/fa';
import { getCurrentWeather } from './lib/api';
import { WeatherData } from './lib/types';

function App() {
  const [count, setCount] = useState<number>(0)
  const [weatherJSON, setWeatherJSON] = useState<WeatherData | null>(null)
  // const [backgroundColor, setBackgroundColor] = useState<string>("transparent")

  async function getCurrentWeatherData() {
    const weatherJSONData = await getCurrentWeather({lat: 19.0785451, lon: 72.878176}); // Mumbai
    // const weatherJSONData = await getCurrentWeather({lat: 41.8755616, lon: -87.6244212}); // Chicago

    console.log('weatherJSON: ',weatherJSONData);
    
    if (!weatherJSONData) return;
    setWeatherJSON(weatherJSONData);
    // await weatherJSON?.weather[0].icon.endsWith('d')?setBackgroundColor("#87CEEB"):setBackgroundColor("#444458")
    // const backgroundColor = weatherJSON?(weatherJSON.weather[0].icon.endsWith('d')?"#87CEEB":"#444458"):"transparent"
    
  }
  useEffect(() => {
    getCurrentWeatherData();
  },[])
  
  
  const sunrise = weatherJSON? new Date(weatherJSON.sys.sunrise * 1000):new Date();
  const sunset = weatherJSON? new Date(weatherJSON.sys.sunset * 1000):new Date();
  const timeAtCurrentLocation = weatherJSON? new Date((weatherJSON.dt * 1000) + weatherJSON.timezone):new Date();
  
  const backgroundColor = weatherJSON?weatherJSON.weather[0].icon.endsWith("d")?"#87CEEB":"#444458":"transparent"
  console.log(backgroundColor);
  document.body.style.backgroundColor = backgroundColor;
  // const backgroundColor = weatherJSON?(weatherJSON.weather[0].icon.includes("d")?"#87CEEB":"#444458"):"#87CEEB"
  return (
    <>
      <header>
        <form action="search" className="search">
          <input type="text" placeholder="Search for a city..." />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <div className="weatherGrid">
          {!weatherJSON ? (<p>Getting Data...</p>):(
            <>
              <div className='weatherCurrent'>
                <p>{timeAtCurrentLocation.toString()}</p>
                <h2>{weatherJSON.name}, {weatherJSON.sys.country}</h2>
                <div className='temperature'>
                  <img src={`https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`} alt={weatherJSON.weather[0].description} title={weatherJSON.weather[0].description} />
                  <h2>{weatherJSON.main.temp} <sup>o</sup>C</h2>
                </div>
                <p>{weatherJSON.weather[0].main} | Feels like: {weatherJSON.main.feels_like} <sup>o</sup>C | <span title='Minimum'>{weatherJSON.main.temp_min} <sup>o</sup>C</span> - <span title='Maximum'>{weatherJSON.main.temp_max} <sup>o</sup>C</span></p>
                <hr />
                <div className='riseAndSet'>
                  <div className="sunrise">
                    <IoSunny />
                    <div>
                      <p>Sunrise</p>
                      <p>{sunrise.toTimeString().slice(0, 5)} AM</p>
                    </div>
                  </div>
                  <div className="sunset">
                    <IoMoon />
                    <div>
                      <p>Sunset</p>
                      <p>{sunset.getHours() % 12 < 10 ? (<span>0</span>) : "yo"}{`${sunset.getHours() % 12 || 12}:${sunset.getMinutes()}`} PM</p>
                      {/* <p>{sunset.toLocaleTimeString([], {hour12: true}).slice(0, 4)} PM</p> */}
                    </div>
                  </div>
                </div>
                <hr />
                <div className='pHV'>
                  <p><span>Pressure: </span>{weatherJSON.main.pressure}hPa</p>
                  <p><span>Humidity: </span>{weatherJSON.main.humidity}%</p>
                  <p><span>Visibility: </span>{weatherJSON.visibility}km</p>
                </div>
                <div className='wCR'>
                  <div className="wind">
                    <p>Wind</p>
                    <FaLocationArrow className='-rotate-45' style={{rotate: `${weatherJSON.wind.deg}deg`}}/>
                    <p>{weatherJSON.wind.speed}m/s</p>
                  </div>
                  <div className="clouds">
                    <p>Clouds</p>
                    <p>{weatherJSON.clouds.all}<span>%</span></p>
                  </div>
                  {weatherJSON.rain && (
                    <div className="rain">
                      <p>Rain</p>
                      <p>{weatherJSON.rain["1h"] || weatherJSON.rain["3h"]}mm</p>
                    </div>
                  )}
                </div>
              </div>

              <div className='weatherMap'></div>

              <div className='weatherForecast'></div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default App
