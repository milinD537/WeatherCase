import { useEffect, useState } from 'react'
import './App.css'
import { IoMoon, IoSunny } from "react-icons/io5";
import { FaLocationArrow, FaSearch } from 'react-icons/fa';
import { getCurrentWeather } from './lib/api';
import { getForecastWeather } from './lib/api';
import { getCityName } from './lib/api';
import { Coords, CurrentWeatherData } from './lib/types';
import { ForecastWeatherData } from './lib/types';
import { SearchArrayData } from './lib/types';

import WeatherForecastCard from './components/WeatherForecastCard';
import WeatherForecastGraph from './components/WeatherForecastGraph';
import WeatherMap from './components/Map/WeatherMap';

function App() {
  const [currentWeatherJSON, setCurrentWeatherJSON] = useState<CurrentWeatherData | null>(null)
  const [forecastWeatherJSON, setForecastWeatherJSON] = useState<ForecastWeatherData | null>(null)
  const [searchArray, setSearchArray] = useState<SearchArrayData[] | []>([])
  const [searchCity, setSearchCity] = useState<string>('')
  const [coords, setCoords] = useState<Coords>([19.0785451, 72.878176])

  async function getWeatherData({lat= 19.0785451, lon=72.878176} : {lat: number, lon: number}) {
    const coords = {lat: lat, lon: lon}

    const currentWeatherJSONData = await getCurrentWeather(coords);
    const forecastWeatherJSONData = await getForecastWeather(coords);
    
    console.log('currentWeatherJSON: ',currentWeatherJSONData);
    console.log('forecastWeatherJSON: ',forecastWeatherJSONData);
    if (!currentWeatherJSONData || !forecastWeatherJSONData) return;
    setCurrentWeatherJSON(currentWeatherJSONData);
    setForecastWeatherJSON(forecastWeatherJSONData);
  }
  async function getCityWeather(place: string) {
    const searchArrayData = await getCityName({name: place});
    console.log('searchArray: ',searchArrayData);
    if (!searchArrayData) return;
    setSearchArray(searchArrayData);
  }
  useEffect(() => {
    getWeatherData({lat: 19.0785451, lon: 72.878176});
  },[])

  useEffect(()=>{
    if(searchCity.trim() === '') return;
    console.log('searchCity: ',searchCity);
    getCityWeather(searchCity);
  },[searchCity])

  if (currentWeatherJSON === null || forecastWeatherJSON === null) {
    return (
      <>
        <div className='loader | min-h-[inherit] grid place-items-center'>
          <div className="loaderWrapper">
            <div className="blue partOne">
              <div className="gray partOneChild">
                <div className="redFill partOneChildChild">
                  <div className="shine"></div>
                  <div className="measurements"></div>
                </div>
              </div>
            </div>
            <div className="blue partTwo">
              <div className="gray partTwoChild">
                <div className="redFill partTwoChildChild"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const sunrise = new Date((currentWeatherJSON.sys.sunrise + currentWeatherJSON.timezone) * 1000).toUTCString().slice(17, 22);
  const sunset = new Date((currentWeatherJSON.sys.sunset + currentWeatherJSON.timezone) * 1000).toUTCString().slice(17, 22);
  const timeAtCurrentLocation = new Date((currentWeatherJSON.dt + currentWeatherJSON.timezone) * 1000).toUTCString();
  
  // variable check if day or not
  const isDay = currentWeatherJSON.weather[0].icon.endsWith("d");
  // setting styles based on day or night
  const backgroundColor = isDay?"#87CEEB":"#444458"
  const textColor = isDay?"black":"white"
  const sunMoon = isDay?"#FDC630":"#CECACB"
  const sunMoonBlur = isDay?100:1
  const moonCurveBackgroundColor = isDay?"transparent":"#444458"
  const cardBackgroundColor = isDay?"hsl(0 0% 100% / 50%)":"hsl(0 0% 0% / 50%)"
  const innerCardBackgroundColor = isDay?"hsl(0 0% 85% / 10%)":"hsl(0 0% 15% / 10%)"
  const riseSetTextColor = isDay?"hsl(0 0% 25%)":"hsl(0 0% 75%)"
  const searchBarBackgroundColor = isDay?"bg-[hsl(197_71%_86%)] min-[900px]:bg-[hsl(44_98%_80%)]":"bg-[hsl(240_13%_15%)]"
  // applying day/night styles
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = textColor;

  return (
    <>
      <header className='py-4'>
        <div className={`searchBar | relative w-[min(300px,100%)] mx-auto rounded-full z-0 py-3 px-8 backdrop-blur-[50px] ${searchBarBackgroundColor}`}>
          <button type="submit" className='searchIcon | has-[+_:focus]:animate-[rotateAnimation_1.2s_linear_forwards] | absolute -z-10 left-[2%] has-[+_:focus]:left-[calc(98%_-_1.5rem)] transition-[left] duration-[0.6s] has-[+_:focus]:delay-[0.6s] ease-in-out' onMouseDown={(e)=> {e.preventDefault()}} onClick={()=> { getWeatherData({lat: searchArray[0].lat, lon: searchArray[0].lon}); setCoords([searchArray[0].lat, searchArray[0].lon]) }}><FaSearch size={"1.175rem"}/></button>
          <input list='searchArray' type="text" className='SearchInput | autofill:text-inherit autofill:bg-transparent text-inherit peer outline-none bg-inherit w-full' placeholder="Search for a City..." id='searchCity' onChange={(e)=> setSearchCity(e.target.value)}/>
          <datalist id='searchArray'>
            <option value={`${searchArray[0]?.name}, ${searchArray[0]?.country}`}></option>
            <option value={`${searchArray[1]?.name}, ${searchArray[1]?.country}`}></option>
            <option value={`${searchArray[2]?.name}, ${searchArray[2]?.country}`}></option>
            <option value={`${searchArray[3]?.name}, ${searchArray[3]?.country}`}></option>
            <option value={`${searchArray[4]?.name}, ${searchArray[4]?.country}`}></option>
          </datalist>
        </div>
      </header>

      <main className='mb-4'>
        <div className="weatherGrid | w-[min(1200px,100%_-_1.5rem)] mx-auto grid min-[900px]:grid-cols-[auto_1fr] gap-3">
          <div className='justForStyling sunMoon | absolute top-[40%] min-[900px]:top-0 left-0 w-full aspect-[1.05] rounded-[50%] -translate-y-1/2 -z-20' style={{ backgroundColor: sunMoon, filter: `blur(${sunMoonBlur}px)` }}>
            <div className='justForStyling moon | absolute w-full h-full rounded-[inherit] bottom-[25%] right-[10%] blur-[20px]' style={{ backgroundColor: moonCurveBackgroundColor }}></div>
          </div>

          <div className='weatherCurrent | p-4 rounded-2xl backdrop-blur-[50px] h-max' style={{ backgroundColor: cardBackgroundColor }}>
            <p className='mb-2'>{timeAtCurrentLocation.slice(0,-7)}</p>
            <h2 className='text-[2rem] font-medium'>{currentWeatherJSON.name}, {currentWeatherJSON.sys.country}</h2>
            <div className='temperature | flex items-center'>
              <img src={`https://openweathermap.org/img/wn/${currentWeatherJSON.weather[0].icon}@2x.png`} alt={currentWeatherJSON.weather[0].description} title={currentWeatherJSON.weather[0].description} />
              <h2 className='text-[2rem] font-bold'>{currentWeatherJSON.main.temp} <sup>o</sup>C</h2>
            </div>
            <p className='font-medium mb-4'>{currentWeatherJSON.weather[0].main} <span className='font-thin'>|</span> Feels like: {currentWeatherJSON.main.feels_like} <sup>o</sup>C <span className='font-thin'>|</span> <span title='Minimum'>{currentWeatherJSON.main.temp_min} <sup>o</sup>C</span> - <span title='Maximum'>{currentWeatherJSON.main.temp_max} <sup>o</sup>C</span></p>
            <hr className='border border-[#808080] rounded-full mb-4' />
            <div className='riseAndSet | flex gap-8 justify-evenly mb-4'>
              <div className="sunrise | flex items-center gap-3">
                <IoSunny size={"2rem"} />
                <div>
                  <p className='text-xs font-light' style={{ color: riseSetTextColor }}>Sunrise</p>
                  <p className='text-2xl font-medium'>{sunrise}</p>
                </div>
              </div>
              <div className="sunset | flex items-center gap-3">
                <IoMoon size={"2rem"} />
                <div>
                  <p className='text-xs font-light' style={{ color: riseSetTextColor }}>Sunset</p>
                  <p className='text-2xl font-medium'>{sunset}</p>
                </div>
              </div>
            </div>
            <hr className='border border-[#808080] rounded-full mb-4' />
            <div className='pHV | flex gap-3 mb-4 font-bold justify-center text-center'>
              <p><span className='text-xs font-medium'>Pressure: </span>{currentWeatherJSON.main.pressure}hPa</p>
              <p><span className='text-xs font-medium'>Humidity: </span>{currentWeatherJSON.main.humidity}%</p>
              <p><span className='text-xs font-medium'>Visibility: </span>{currentWeatherJSON.visibility}km</p>
            </div>
            <div className='wCR | text-center font-medium flex justify-evenly'>
              <div className="wind | rounded-lg px-6 py-3 backdrop-blur-[50px]" style={{ backgroundColor: innerCardBackgroundColor }}>
                <p className='mb-2'>Wind</p>
                <FaLocationArrow size={"2rem"} className='-rotate-45 mx-auto mb-2' style={{ rotate: `${currentWeatherJSON.wind.deg}deg` }} />
                <p>{currentWeatherJSON.wind.speed} m/s</p>
              </div>
              <div className="clouds | rounded-lg px-6 py-3 backdrop-blur-[50px]" style={{ backgroundColor: innerCardBackgroundColor }}>
                <p className='mb-2'>Clouds</p>
                <p><span className='text-2xl'>{currentWeatherJSON.clouds.all}</span>%</p>
              </div>
              {currentWeatherJSON.rain && (
                <div className="rain | rounded-lg px-6 py-3 backdrop-blur-[50px]" style={{ backgroundColor: innerCardBackgroundColor }}>
                  <p className='mb-2'>Rain</p>
                  <p>{currentWeatherJSON.rain["1h"] || currentWeatherJSON.rain["3h"]} mm</p>
                </div>
              )}
            </div>
          </div>

          <div className='weatherMap | relative'>
            <WeatherMap cardBackgroundColor={cardBackgroundColor} coords={coords}/>
          </div>

          <div className='weatherForecastGraph'>
            <WeatherForecastGraph list={forecastWeatherJSON.list.slice(0,8)} cardBackgroundColor={cardBackgroundColor} textColor={textColor}/>
          </div>
          <div className='weatherForecastFiveDays | grid gap-1'>
            {forecastWeatherJSON.list.filter((_data, index)=>((index+1) % 8 === 0)).map((forecastData, index)=><WeatherForecastCard key={index} item={forecastData} cardBackgroundColor={cardBackgroundColor}/>)}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
