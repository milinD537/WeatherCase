import { useState } from 'react'
import './App.css'
import { IoSunny } from "react-icons/io5";
import weatherJSON from './lib/apiDummy.json'
import weatherForecastJSON from './lib/apiForecastDummy.json'

function App() {
  const [count, setCount] = useState(0)
  const date = new Date(weatherJSON.dt * 1000);
  const date2 = new Date(1714143600 * 1000);
  const date3 = new Date(1714154400 * 1000);

  return (
    <>
      <header></header>
      <main>
        <div className="weatherGrid">
          <div className='weatherCurrent'>
            <p></p>
            <h2>{weatherJSON.name}, {weatherJSON.sys.country}</h2>
            <div className='temperature'>
              <img src={`https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`} alt={weatherJSON.weather[0].description} title={weatherJSON.weather[0].description}/>
              <h2>{weatherJSON.main.temp} <sup>o</sup>C</h2>
              <p>{weatherJSON.weather[0].main} | Feels like: {weatherJSON.main.feels_like} <sup>o</sup>C | <span title='Minimum'>{weatherJSON.main.temp_min} <sup>o</sup>C</span> - <span title='Maximum'>{weatherJSON.main.temp_max} <sup>o</sup>C</span></p>
              <hr />
              <div className='riseAndSet'></div>
              <hr />
              <div className='pHV'></div>
              <div className='wCR'></div>
            </div>
          </div>
          <div className='weatherMap'></div>
          <div className='weatherForecast'></div>
        </div>
      </main>
    </>
  )
}

export default App
