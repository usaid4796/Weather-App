import React, { useEffect, useState } from "react";
import "./App.css";

const WeatherCard = ({ tempInfo }) => {
  const [weatherState, setWeatherState] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    temp,
    humidity,
    pressure,
    weatherMood,
    description,
    name,
    speed,
    country,
    sunset,
    feels_like,
  } = tempInfo;

  // Set weather icon based on mood
  useEffect(() => {
    if (weatherMood) {
      switch (weatherMood) {
        case "Clouds":
          setWeatherState("wi wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Mist":
          setWeatherState("wi-day-dust");
          break;
        default:
          setWeatherState("wi-day-sunny");
          break;
      }
      setLoading(false); // API data arrived
    }
  }, [weatherMood]);

  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <div
          style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 1s linear infinite",
            margin: "auto",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <article className="widget">
      <div className="weatherIcon">
        <i className={`wi ${weatherState}`}></i>
      </div>

      <div className="weatherInfo">
        <div className="temperature">
          <span>{temp}</span>
          <span>{feels_like} </span>
        </div>
        <div className="description">
          <span className="des">{description}</span>
          <div className="weatherCondition">{weatherMood}</div>
          <div className="place">
            {name}, {country}
          </div>
        </div>
      </div>

      <div className="date">{new Date().toLocaleString()}</div>

      <div className="extra-temp">
        <div className="temp-info-minmax">
          <div className="two-sided-section">
            <p>
              <i className="wi wi-sunset"></i>
            </p>
            <p className="extra-info-leftside">
              {timeStr}
              <br />
              Sunset
            </p>
          </div>

          <div className="two-sided-section">
            <p>
              <i className="wi wi-humidity"></i>
            </p>
            <p className="extra-info-leftside">
              {humidity} <br />
              Humidity
            </p>
          </div>
        </div>

        <div className="weather-extra-info">
          <div className="two-sided-section">
            <p>
              <i className="wi wi-rain"></i>
            </p>
            <p className="extra-info-leftside">
              {pressure} <br />
              Pressure
            </p>
          </div>

          <div className="two-sided-section">
            <p>
              <i className="wi wi-strong-wind"></i>
            </p>
            <p className="extra-info-leftside">
              {speed} <br />
              Speed
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
