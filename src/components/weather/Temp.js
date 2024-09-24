import React, { useEffect, useState } from 'react'
import "./style.css"
import WeatherCard from './WeatherCard'

export default function Temp() {

    const [searchValue, setSearchValue] = useState("sialkot");
    const [tempInfo, setTempInfo] = useState({});
  
    const getWeatherInfo = async () => {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=bd7de24563c4a2de32dae3dbb596df60`;
  
        let res = await fetch(url);
        let data = await res.json();
  
        const { temp, humidity, pressure } = data.main;
        const { main: weathermood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;
  
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
        };
  
        setTempInfo(myNewWeatherInfo);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getWeatherInfo();
    }, []);
  
    return (
      <>
        <div className="wrap">
          <div className="search">
            <input
              type="search"
              placeholder="search..."
              autoFocus
              id="search"
              className="searchTerm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
  
            <button
              className="searchButton"
              type="button"
              onClick={getWeatherInfo}>
              Search
            </button>
          </div>
        </div>
  
        {/* our temp card  */}
        <WeatherCard  {...tempInfo} />
      </>
    );
  };
