import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function App() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState();

  useEffect(() => {
    const myKey = "df35fbdda85415498def473162c912f8b4edac30e599f6d0eb4e9025";
    fetch(`https://api.ipdata.co?api-key=${myKey}`)
      // fetch("https://ip-api.com/json")
      // fetch("https://freegeoip.app/json/")
      .then((y) => y.json())
      .then((data) => setLocation(data));
  }, []);

  useEffect(() => {
    async function getWeather(city) {
      if (location.city) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4a3c1a83213dc5022ec42fcfc14d53`
        );
        const responseJson = await response.json();
        setWeather(responseJson);
      }
    }
    getWeather(location.city);
  }, [location]);
  console.log(location);
  console.log(weather);

  const weatherDesc = weather ? weather.weather[0].main.toLowerCase() : "";

  return (
    <div>
      {weather ? (
        <div
          className={` container ${
            weatherDesc === "clear"
              ? "clear"
              : weatherDesc === "clouds"
              ? "cloudy"
              : weatherDesc === "rain"
              ? "rainy"
              : weatherDesc === "snow"
              ? "snow"
              : weatherDesc === "haze"
              ? "haze"
              : weatherDesc === "mist"
              ? "misty"
              : weatherDesc === "sand"
              ? "sand"
              : "default"
          }`}
        >
          <div className="grid">
            <SearchBar setWeather={setWeather} location={location} />
            <h1 className="forecast">{`${Math.round(
              weather.main.temp - 273.15
            )}°`}</h1>
            <h2 className="forecast">{`${weather.name}, ${weather.sys.country}`}</h2>
            <div className="flex forecast">
              <h2 style={{ marginRight: "2rem" }}>
                <FaArrowUp className="fa-arrows" />
                {`${Math.round(weather.main.temp_max - 273.15)}`} &deg;
              </h2>
              <h2 style={{ marginLeft: "2rem" }}>
                <FaArrowDown className="fa-arrows" />
                {`${Math.round(weather.main.temp_min - 273.15)}`} &deg;
              </h2>
            </div>
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
                ? "It's sooo haze.. STAY HOME !"
                : weatherDesc === "mist"
                ? "It's sooo misty.. STAY HOME !"
                : weatherDesc === "sand"
                ? "A SANDSTORM.. RUNNNN !"
                : "JUST STAY HOME !"}
            </h3>
          </div>
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
