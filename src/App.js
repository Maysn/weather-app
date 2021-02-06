import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState();

  useEffect(() => {
    // const myKey = 'df35fbdda85415498def473162c912f8b4edac30e599f6d0eb4e9025';
    // fetch(`https://api.ipdata.co?api-key=${myKey}`)
    // fetch("https://ip-api.com/json")
    fetch("https://freegeoip.app/json/")
      .then((y) => y.json())
      .then((data) => setLocation(data));
  }, []);

  useEffect(() => {
    async function getWeather(city) {
      if (location.city) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1c2d09630b095c17f9c51ac1302665f9`
        );
        const responseJson = await response.json();
        setWeather(responseJson);
      }
    }
    getWeather(location.city);
  }, [location]);
  console.log(weather);

  const weatherDesc = weather ? weather.weather[0].main.toLowerCase() : "";

  return (
    <div
      className={
        weatherDesc === "clear"
          ? "container clear"
          : weatherDesc === "clouds"
          ? "container cloudy"
          : weatherDesc === "rain"
          ? "container rainy"
          : weatherDesc === "snow"
          ? "container snow"
          : weatherDesc === "haze"
          ? "container haze"
          : weatherDesc === "mist"
          ? "container misty"
          : "container default"
      }
    >
      {weather ? (
        <div className="grid">
          <h1 className="forecast">{`${Math.round(
            weather.main.temp - 273.15
          )}°`}</h1>
          <h2 className="forecast">{weather.name}</h2>
          <h3 className="forecast">
            {weatherDesc === "clouds"
              ? "It's sooo cloudy.. STAY HOME !"
              : weatherDesc === "rain"
              ? "It's sooo rainy.. STAY HOME !"
              : weatherDesc === "snow"
              ? "It's sooo snowie.. STAY HOME !"
              : weatherDesc === "clear"
              ? "Sky is so clear.. STAY HOME !"
              : weatherDesc === "haze"
              ? "It's sooo hazy.. STAY HOME !"
              : weatherDesc === "mist"
              ? "It's sooo misty.. STAY HOME !"
              : "JUST STAY HOME !"}
          </h3>
        </div>
      ) : (
        <div className="no-container">
          <p className="loading">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default App;
