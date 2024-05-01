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
    // const weatherJSONData = await getCurrentWeather({lat: 39.9075, lon: 116.3972}); // Beijing


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
  
  // Function to check if day or not
  const isDay = ()=>(weatherJSON?.weather[0].icon.endsWith("d")?true:false)
  // setting styles based on day or night
  const backgroundColor = weatherJSON?isDay()?"#87CEEB":"#444458":"transparent"
  const textColor = weatherJSON?isDay()?"black":"white":"black"
  const sunMoon = weatherJSON?isDay()?"#FDC630":"#CECACB":"transparent"
  const sunMoonBlur = weatherJSON?isDay()?100:1:0
  const moonCurveBackgroundColor = weatherJSON?isDay()?"transparent":"#444458":"transparent"
  // applying day/night styles
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = textColor;
  // document.querySelector('.sunMoon')?.style.backgroundColor = 
  
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
              <div className='justForStyling sunMoon | absolute top-[40%] min-[900px]:top-0 left-0 w-full aspect-[1.05] rounded-[50%] -translate-y-1/2 -z-20' style={{backgroundColor: sunMoon, filter: `blur(${sunMoonBlur}px)`}}>
                <div className='justForStyling moon | absolute w-full h-full rounded-[inherit] bottom-[25%] right-[10%] blur-[20px]' style={{backgroundColor: moonCurveBackgroundColor}}></div>
              </div>

              <div className='weatherCurrent | p-4 rounded-2xl '>
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
