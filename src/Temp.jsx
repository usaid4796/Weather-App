import React, { useState, useEffect } from "react";
import WeatherCard from "./weatherCard";
import "./App.css";

const Temp = () => {
  let [searchValue, setSearchValue] = useState("karachi");
  const [tempInfo, setTempInfo] = useState({});

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const getWeatherInfo = async () => {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=18755ce41c22a811e8082a43fe0f43bb`;
    const res = await fetch(url);
    const data = await res.json();

    // Check if city not found
    if (data.cod !== 200) {
      alert("Enter a valid city");
      return;
    }

    let { temp, humidity, pressure } = data.main;
    const { main: weatherMood, description, feels_like } = data.weather[0];
    const { name } = data;
    const { speed } = data.wind;
    const { country, sunset } = data.sys;

    const myNewWeatherInfo = {
      temp,
      humidity,
      pressure,
      weatherMood,
      name,
      speed,
      country,
      sunset,
      description,
      feels_like
    };

    setTempInfo(myNewWeatherInfo);
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
