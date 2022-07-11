import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";

function App() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState();
  const [citiesList, setCitiesList] = useState();

  useEffect(() => {
    const myKey = "df35fbdda85415498def473162c912f8b4edac30e599f6d0eb4e9025";
    fetch(`https://api.ipdata.co?api-key=${myKey}`)
      // fetch("https://ip-api.com/json")
      // fetch("https://freegeoip.app/json/")
      .then((y) => y.json())
      .then((data) => setLocation(data));

    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => response.json())
      .then((list) => setCitiesList(list.data))
      .catch((error) => console.log(error));
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
  console.log(citiesList);

  const weatherDesc = weather ? weather.weather[0].main.toLowerCase() : "";

  return (
    <div>
      <SearchBar citiesList={citiesList} />
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
